const {
  statusOn,
  isClosedOn,
  currentStatus,
  currentChapterStart,
} = require("../../utils/habitHistory");
const {
  countCompletions,
  daysBetween,
} = require("../../utils/habitCompletions");

const history = [
  { status: "active", season: "building", dateStamp: "20260301" },
  { status: "closed", season: "building", dateStamp: "20260610" },
  { status: "active", season: "restoring", dateStamp: "20261113" },
];

describe("habitHistory", () => {
  it("treats habits with no history as active on every day", () => {
    expect(statusOn({}, "20200101")).toBe("active");
    expect(isClosedOn({ history: [] }, 20261113)).toBe(false);
    expect(currentStatus({})).toBe("active");
    expect(currentChapterStart({})).toBeUndefined();
  });

  it("uses the last event on or before the day", () => {
    const habit = { status: "active", history };
    expect(statusOn(habit, "20260101")).toBe("active");
    expect(statusOn(habit, "20260609")).toBe("active");
    expect(statusOn(habit, "20260610")).toBe("closed");
    expect(isClosedOn(habit, 20260801)).toBe(true);
    expect(statusOn(habit, "20261113")).toBe("active");
  });

  it("finds the start of the current chapter", () => {
    expect(currentChapterStart({ history })).toBe("20261113");
    expect(currentChapterStart({ history: history.slice(0, 2) })).toBe(
      "20260301",
    );
  });
});

const status = (dateStamp, count, threshold = 1) => ({
  SK: `${dateStamp}-habit1`,
  count,
  threshold,
});
const seasons = [
  { SK: "20261103-s2", season: "restoring" },
  { SK: "20261101-s1", season: "building" },
];

describe("countCompletions", () => {
  it("counts positive days that reached their own threshold, by season", () => {
    const habit = { isPositive: true, threshold: 2 };
    const statuses = [
      status("20261031", 1, 1), // before first season
      status("20261101", 2, 2),
      status("20261102", 1, 2), // under threshold
      status("20261103", 3, 2),
      status("20261104", 2, 2),
    ];

    expect(
      countCompletions(habit, statuses, seasons, undefined, "20261104"),
    ).toEqual({
      completions: 4,
      completionsBySeason: [
        { season: null, completions: 1 },
        { season: "building", completions: 1 },
        { season: "restoring", completions: 2 },
      ],
    });
  });

  it("only counts days inside the chapter", () => {
    const habit = { isPositive: true, threshold: 1 };
    const statuses = [status("20261101", 1), status("20261103", 1)];

    expect(
      countCompletions(habit, statuses, seasons, "20261102", "20261104")
        .completions,
    ).toBe(1);
  });

  it("counts negative days with nothing logged or under threshold", () => {
    const habit = { isPositive: false, threshold: 1 };
    const statuses = [
      status("20261102", 1, 1), // hit the limit: not complete
      status("20261103", 0, 1),
    ];

    // 1st..4th: 1st (none), 2nd (no), 3rd (yes), 4th (none) = 3
    expect(
      countCompletions(habit, statuses, seasons, "20261101", "20261104"),
    ).toEqual({
      completions: 3,
      completionsBySeason: [
        { season: "building", completions: 1 },
        { season: "restoring", completions: 2 },
      ],
    });
  });

  it("starts negative habits with no history at their first logged day", () => {
    const habit = { isPositive: false, threshold: 1 };
    const statuses = [status("20261103", 0)];

    expect(
      countCompletions(habit, statuses, [], undefined, "20261104").completions,
    ).toBe(2);
  });

  it("walks days across month boundaries", () => {
    expect(daysBetween("20261130", "20261202")).toEqual([
      "20261130",
      "20261201",
      "20261202",
    ]);
  });
});
