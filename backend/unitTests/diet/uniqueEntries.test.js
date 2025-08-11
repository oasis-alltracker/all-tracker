const {
  findUniqueEntries,
} = require("../../tracker-diet/recentEntries/getRecentEntries");

describe("findUniqueEntries", () => {
  it("returns up to 10 unique entries by id", () => {
    const entries = [
      { name: "apple", foodItemID: 1 },
      { name: "banana", foodItemID: 2 },
      { name: "apple", foodItemID: 1 }, // duplicate
      { name: "orange", foodItemID: 4 },
      { name: "banana", foodItemID: 2 }, // duplicate
      { name: "grape", foodItemID: 6 },
      { name: "pear", foodItemID: 7 },
      { name: "mango", foodItemID: 8 },
      { name: "kiwi", foodItemID: 9 },
      { name: "peach", foodItemID: 10 },
      { name: "plum", foodItemID: 11 },
      { name: "melon", foodItemID: 12 }, // this would be 11th unique, so skipped
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
      { name: "a", foodItemID: 1 },
      { name: "b", foodItemID: 2 },
      { name: "c", foodItemID: 3 },
      { name: "a", foodItemID: 1 },
      { name: "b", foodItemID: 2 },
      { name: "d", foodItemID: 5 },
    ];

    const result = findUniqueEntries(entries);

    expect(result.length).toBe(4);
    expect(result.map((e) => e.name).sort()).toEqual(["a", "b", "c", "d"]);
  });

  it("returns empty array for empty input", () => {
    expect(findUniqueEntries([])).toEqual([]);
  });
});
