const {
  findUniqueEntries,
} = require("../../tracker-diet/recentEntries/getRecentEntries");

describe("findUniqueEntries", () => {
  it("returns up to 10 unique entries by name", () => {
    const entries = [
      { name: "apple", value: 1 },
      { name: "banana", value: 2 },
      { name: "apple", value: 3 }, // duplicate
      { name: "orange", value: 4 },
      { name: "banana", value: 5 }, // duplicate
      { name: "grape", value: 6 },
      { name: "pear", value: 7 },
      { name: "mango", value: 8 },
      { name: "kiwi", value: 9 },
      { name: "peach", value: 10 },
      { name: "plum", value: 11 },
      { name: "melon", value: 12 }, // this would be 11th unique, so skipped
    ];

    const result = findUniqueEntries(entries);

    expect(result.length).toBeLessThanOrEqual(10);
    expect(result.map((e) => e.name)).toEqual(
      [
        "apple",
        "banana",
        "orange",
        "grape",
        "pear",
        "mango",
        "kiwi",
        "peach",
        "plum",
        "melon", // stops after 10 unique
      ].slice(0, 10)
    );
  });

  it("returns all unique entries if fewer than 10", () => {
    const entries = [
      { name: "a" },
      { name: "b" },
      { name: "c" },
      { name: "a" },
      { name: "b" },
      { name: "d" },
    ];

    const result = findUniqueEntries(entries);

    expect(result.length).toBe(4);
    expect(result.map((e) => e.name).sort()).toEqual(["a", "b", "c", "d"]);
  });

  it("returns empty array for empty input", () => {
    expect(findUniqueEntries([])).toEqual([]);
  });
});
