const GetHabitProgress = require("../../tracker-habit/habitProgress/getHabitProgress");
const { addDays } = require("../../utils/habitCompletions");

const user = { email: "test@example.com" };
const today = "20261113";

function mockDB({ habit, statuses = [], seasons = [] }) {
  return {
    getItem: jest.fn().mockResolvedValue({ Item: habit }),
    queryAllItems: jest.fn(async (expression, names, values) =>
      values[":pk"] === "test@example.com-habitStatus" ? statuses : seasons,
    ),
  };
}

// Completed status rows for a positive habit on the given days.
const done = (...days) =>
  days.map((day) => ({ SK: `${day}-habit1`, habitID: "habit1", count: 1, threshold: 1 }));

async function progressFor(db) {
  const response = await new GetHabitProgress(db).getHabitProgress(user, {
    habitID: "habit1",
    dateStamp: today,
  });
  expect(response.statusCode).toBe(200);
  return JSON.parse(response.body);
}

const positiveHabit = {
  SK: "habit1",
  name: "Read",
  pngURL: "url",
  isPositive: true,
  threshold: 1,
  status: "active",
  history: [{ status: "active", season: "building", dateStamp: "20261101" }],
};

describe("getHabitProgress", () => {
  it("builds the story: start, season, totals and streaks", async () => {
    const db = mockDB({
      habit: positiveHabit,
      // 3-day run, gap, 4-day run ending yesterday (today not done yet)
      statuses: done(
        "20261101", "20261102", "20261103",
        "20261109", "20261110", "20261111", "20261112",
      ),
      seasons: [
        { SK: "20261101-s1", season: "building" },
        { SK: "20261110-s2", season: "restoring" },
      ],
    });

    const progress = await progressFor(db);

    expect(progress).toMatchObject({
      habitID: "habit1",
      name: "Read",
      pngURL: "url",
      status: "active",
      startDate: "20261101",
      seasonStarted: "building",
      totalCompletions: 7,
      daysSinceStart: 13,
      currentStreak: 4,
      longestStreak: 4,
      completionsBySeason: [
        { season: "building", completions: 4 },
        { season: "restoring", completions: 3 },
      ],
    });

    const [, , values] = db.queryAllItems.mock.calls[0];
    expect(values[":startDate"]).toBe("20261101");
    expect(values[":habitID"]).toBe("habit1");
  });

  it("counts today in the current streak once it's done", async () => {
    const progress = await progressFor(
      mockDB({ habit: positiveHabit, statuses: done("20261112", today) }),
    );
    expect(progress.currentStreak).toBe(2);
  });

  it("resets the current streak after a missed day", async () => {
    const progress = await progressFor(
      mockDB({ habit: positiveHabit, statuses: done("20261110", "20261111") }),
    );
    expect(progress.currentStreak).toBe(0);
    expect(progress.longestStreak).toBe(2);
  });

  it("returns a 44-day timeline, oldest first, with inactive days before the start", async () => {
    const progress = await progressFor(
      mockDB({ habit: positiveHabit, statuses: done("20261101", "20261103") }),
    );

    expect(progress.timeline).toHaveLength(44);
    expect(progress.timeline[0].dateStamp).toBe(addDays(today, -43));
    expect(progress.timeline[43]).toEqual({ dateStamp: today, state: "missed" });

    const stateOn = (day) =>
      progress.timeline.find((entry) => entry.dateStamp === day).state;
    expect(stateOn("20261031")).toBe("inactive");
    expect(stateOn("20261101")).toBe("complete");
    expect(stateOn("20261102")).toBe("missed");
  });

  it("falls back to the first completion for habits with no history", async () => {
    const db = mockDB({
      habit: { ...positiveHabit, history: undefined, status: undefined },
      statuses: done("20261105", "20261106"),
    });

    const progress = await progressFor(db);

    expect(progress.startDate).toBe("20261105");
    expect(progress.seasonStarted).toBeNull();
    expect(progress.status).toBe("active");
    expect(db.queryAllItems.mock.calls[0][2][":startDate"]).toBe("0");
  });

  it("doesn't count closed days, even for a negative habit", async () => {
    const habit = {
      SK: "habit1",
      name: "No sugar",
      isPositive: false,
      threshold: 1,
      status: "active",
      history: [
        { status: "active", season: "building", dateStamp: "20261101" },
        { status: "closed", season: "building", dateStamp: "20261104" },
        { status: "active", season: "restoring", dateStamp: "20261110" },
      ],
    };
    // Nothing logged: every active day is a completion for a negative habit.
    const progress = await progressFor(mockDB({ habit }));

    // Active 1st-3rd (3 days) and 10th-13th (4 days); 4th-9th were closed.
    expect(progress.totalCompletions).toBe(7);
    expect(progress.longestStreak).toBe(4);
    expect(progress.currentStreak).toBe(4);

    const stateOn = (day) =>
      progress.timeline.find((entry) => entry.dateStamp === day).state;
    expect(stateOn("20261105")).toBe("inactive");
  });

  it("counts the current season from its start, not every stretch with that name", async () => {
    const progress = await progressFor(
      mockDB({
        habit: positiveHabit,
        statuses: done("20261102", "20261105", "20261111", "20261112"),
        seasons: [
          { SK: "20261101-s1", season: "building" },
          { SK: "20261104-s2", season: "restoring" },
          { SK: "20261110-s3", season: "building" },
        ],
      }),
    );

    expect(progress.currentSeason).toEqual({
      season: "building",
      startDate: "20261110",
      completions: 2,
    });
    // By name, both Building stretches are grouped together.
    expect(progress.completionsBySeason).toEqual([
      { season: "building", completions: 3 },
      { season: "restoring", completions: 1 },
    ]);
  });

  it("returns null currentSeason when the user has never set one", async () => {
    const progress = await progressFor(
      mockDB({ habit: positiveHabit, statuses: done("20261102") }),
    );
    expect(progress.currentSeason).toBeNull();
  });

  it("lists chapters: saved counts for closed ones, live count for the open one", async () => {
    const habit = {
      ...positiveHabit,
      history: [
        { status: "active", season: "building", dateStamp: "20261101" },
        {
          status: "closed",
          season: "building",
          dateStamp: "20261104",
          completions: 2,
          completionsBySeason: [{ season: "building", completions: 2 }],
        },
        { status: "active", season: "restoring", dateStamp: "20261110" },
      ],
    };
    const progress = await progressFor(
      mockDB({
        habit,
        statuses: done("20261101", "20261102", "20261110", "20261112"),
        seasons: [
          { SK: "20261101-s1", season: "building" },
          { SK: "20261110-s2", season: "restoring" },
        ],
      }),
    );

    expect(progress.chapters).toEqual([
      {
        startDate: "20261101",
        startSeason: "building",
        endDate: "20261104",
        endSeason: "building",
        completions: 2,
        completionsBySeason: [{ season: "building", completions: 2 }],
      },
      {
        startDate: "20261110",
        startSeason: "restoring",
        endDate: null,
        endSeason: null,
        completions: 2,
        completionsBySeason: [{ season: "restoring", completions: 2 }],
      },
    ]);
    expect(progress.currentChapter).toEqual(progress.chapters[1]);
    expect(progress.totalCompletions).toBe(4);
  });

  it("has no current chapter while the habit is closed", async () => {
    const habit = {
      ...positiveHabit,
      status: "closed",
      history: [
        { status: "active", season: "building", dateStamp: "20261101" },
        { status: "closed", season: "building", dateStamp: "20261104", completions: 1 },
      ],
    };
    const progress = await progressFor(
      mockDB({ habit, statuses: done("20261101") }),
    );

    expect(progress.status).toBe("closed");
    expect(progress.currentChapter).toBeNull();
    expect(progress.chapters).toHaveLength(1);
    expect(progress.chapters[0].endDate).toBe("20261104");
  });

  it("starts an older habit's first chapter at its first completion", async () => {
    // Created before history existed, then closed and reopened.
    const habit = {
      ...positiveHabit,
      history: [
        { status: "closed", season: "building", dateStamp: "20261104", completions: 2 },
        { status: "active", season: "flowing", dateStamp: "20261110" },
      ],
    };
    const db = mockDB({
      habit,
      statuses: done("20261102", "20261103", "20261111"),
    });
    const progress = await progressFor(db);

    // The reopen isn't the habit's start; its first completion is.
    expect(db.queryAllItems.mock.calls[0][2][":startDate"]).toBe("0");
    expect(progress.startDate).toBe("20261102");
    expect(progress.seasonStarted).toBeNull();
    expect(progress.totalCompletions).toBe(3);
    expect(progress.chapters[0]).toMatchObject({
      startDate: "20261102",
      startSeason: null,
      endDate: "20261104",
      completions: 2,
    });
    expect(progress.currentChapter).toMatchObject({
      startDate: "20261110",
      startSeason: "flowing",
      completions: 1,
    });
  });

  it("gives a habit with no history one open chapter from its first completion", async () => {
    const progress = await progressFor(
      mockDB({
        habit: { ...positiveHabit, history: undefined, status: undefined },
        statuses: done("20261105", "20261106"),
      }),
    );

    expect(progress.chapters).toEqual([
      {
        startDate: "20261105",
        startSeason: null,
        endDate: null,
        endSeason: null,
        completions: 2,
        completionsBySeason: [{ season: null, completions: 2 }],
      },
    ]);
  });

  it.each([
    ["missing habitID", { dateStamp: today }],
    ["missing dateStamp", { habitID: "habit1" }],
    ["bad dateStamp", { habitID: "habit1", dateStamp: "2026-11-13" }],
    ["no parameters", null],
  ])("returns 400 for %s", async (label, parameters) => {
    const db = mockDB({ habit: positiveHabit });
    const response = await new GetHabitProgress(db).getHabitProgress(
      user,
      parameters,
    );
    expect(response.statusCode).toBe(400);
    expect(db.getItem).not.toHaveBeenCalled();
  });

  it("returns 400 when the habit doesn't exist", async () => {
    const response = await new GetHabitProgress(
      mockDB({ habit: undefined }),
    ).getHabitProgress(user, { habitID: "habit1", dateStamp: today });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toBe("Habit not found");
  });
});
