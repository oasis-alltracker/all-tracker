const GetFitnessStats = require("../../tracker-fitness/fitnessStats/getFitnessStats");

const user = { email: "test@example.com" };
const today = "20261113";

function mockDB({ userInfo, entries = [] }) {
  return {
    getItem: jest.fn().mockResolvedValue({ Item: userInfo }),
    queryAllItems: jest.fn().mockResolvedValue(entries),
  };
}

const movement = (dateStamp, activityType = "walk") => ({
  SK: `${dateStamp}-${Math.random()}`,
  entryType: "movement",
  activityType,
});
const workout = (dateStamp) => ({
  SK: `${dateStamp}-${Math.random()}`,
  entryType: "workout",
});

async function statsFor(db) {
  const response = await new GetFitnessStats(db).getFitnessStats(user, {
    dateStamp: today,
  });
  expect(response.statusCode).toBe(200);
  return JSON.parse(response.body);
}

const building = { season: "building", seasonStartedAt: "20261105" };

describe("getFitnessStats", () => {
  it("counts this season's sessions, workouts and movement mix", async () => {
    const db = mockDB({
      userInfo: building,
      entries: [
        movement("20261101", "run"), // before this season
        movement("20261105", "walk"),
        movement("20261106", "yoga"),
        movement("20261108", "walk"),
        workout("20261110"),
        { SK: "20261111-old" }, // no entryType: a workout
      ],
    });

    const stats = await statsFor(db);

    expect(stats).toMatchObject({
      season: "building",
      seasonStartedAt: "20261105",
      sessionsThisSeason: 5,
      workoutsThisSeason: 2,
      movementsThisSeason: 3,
      movementMix: [
        { activityType: "walk", count: 2 },
        { activityType: "yoga", count: 1 },
      ],
    });
    expect(db.getItem).toHaveBeenCalledWith({
      PK: "test@example.com",
      SK: "test@example.com",
    });
    const [expression, , values] = db.queryAllItems.mock.calls[0];
    expect(expression).toBe("#pk = :pk AND #sk <= :endDate");
    expect(values[":pk"]).toBe("test@example.com-workoutEntry");
    expect(`${today}-abc` <= values[":endDate"]).toBe(true);
  });

  it("counts everything as this season when no season is set", async () => {
    const stats = await statsFor(
      mockDB({ userInfo: {}, entries: [movement("20260101"), workout(today)] }),
    );
    expect(stats.season).toBeNull();
    expect(stats.seasonStartedAt).toBeNull();
    expect(stats.sessionsThisSeason).toBe(2);
  });

  it("counts several sessions on one day as one streak day", async () => {
    const stats = await statsFor(
      mockDB({
        userInfo: building,
        entries: [
          movement("20261111"),
          workout("20261112"),
          movement("20261112"),
          workout(today),
        ],
      }),
    );
    expect(stats.currentStreak).toBe(3);
    expect(stats.longestStreak).toBe(3);
    expect(stats.sessionsThisSeason).toBe(4);
  });

  it("keeps the streak through today until today is over", async () => {
    const stats = await statsFor(
      mockDB({ userInfo: building, entries: [movement("20261111"), movement("20261112")] }),
    );
    expect(stats.currentStreak).toBe(2);
  });

  it("resets the streak after one full day without logging", async () => {
    const stats = await statsFor(
      mockDB({
        userInfo: building,
        entries: [movement("20261108"), movement("20261109"), movement("20261110"), movement("20261111")],
      }),
    );
    expect(stats.currentStreak).toBe(0);
    expect(stats.longestStreak).toBe(4);
  });

  it.each([
    ["today", today, 0, true],
    ["yesterday", "20261112", 0, true],
    ["2 days ago (1 day without)", "20261111", 1, true],
    ["3 days ago (2 days without)", "20261110", 2, true],
    ["4 days ago (3 days without)", "20261109", 3, false],
  ])("rhythm when last logged %s", async (label, lastLogged, without, inRhythm) => {
    const stats = await statsFor(
      mockDB({ userInfo: building, entries: [movement("20261101"), movement(lastLogged)] }),
    );
    expect(stats.lastLoggedDate).toBe(lastLogged);
    expect(stats.daysWithoutLogging).toBe(without);
    expect(stats.inRhythm).toBe(inRhythm);
  });

  it("handles a user who has never logged", async () => {
    const stats = await statsFor(mockDB({ userInfo: building }));
    expect(stats).toMatchObject({
      sessionsThisSeason: 0,
      workoutsThisSeason: 0,
      movementsThisSeason: 0,
      movementMix: [],
      currentStreak: 0,
      longestStreak: 0,
      lastLoggedDate: null,
      daysWithoutLogging: null,
      inRhythm: false,
    });
  });

  it.each([
    ["missing dateStamp", {}],
    ["bad dateStamp", { dateStamp: "2026-11-13" }],
    ["no parameters", null],
  ])("returns 400 for %s", async (label, parameters) => {
    const db = mockDB({ userInfo: building });
    const response = await new GetFitnessStats(db).getFitnessStats(
      user,
      parameters,
    );
    expect(response.statusCode).toBe(400);
    expect(db.queryAllItems).not.toHaveBeenCalled();
  });
});
