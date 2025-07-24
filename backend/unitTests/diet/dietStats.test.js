const {
  calcMacrosByDate,
} = require("../../tracker-diet/dietStats/getDietStats");

describe("calcMacrosByDate", () => {
  it("groups and sums macros correctly for each date", () => {
    const entries = [
      {
        SK: "20250721-abc",
        calorieCount: 100.11,
        fatCount: 10.54,
        carbCount: 20.22,
        proteinCount: 5,
      },
      {
        SK: "20250724-abc",
        calorieCount: 100.11,
        fatCount: 10.54,
        carbCount: 20.22,
        proteinCount: 5,
      },
      {
        SK: "20250724-abc",
        calorieCount: 100.11,
        fatCount: 10.54,
        carbCount: 20.22,
        proteinCount: 5,
      },
      {
        SK: "20250725-abc",
        calorieCount: 100.11,
        fatCount: 10.54,
        carbCount: 20.22,
        proteinCount: 5,
      },
      {
        SK: "20250721-1abc",
        calorieCount: 200,
        fatCount: 11.63,
        carbCount: 20.22,
        proteinCount: 5,
      },
    ];

    const result = calcMacrosByDate(entries);

    expect(result).toEqual({
      20250721: {
        calorieCount: 300.11, // 100.11 + 200
        fatCount: 22.17, // 10.54 + 11.63
        carbCount: 40.44, // 20.22 + 20.22
        proteinCount: 10, // 5 + 5
      },
      20250724: {
        calorieCount: 200.22, // 100.11 * 2
        fatCount: 21.08, // 10.54 * 2
        carbCount: 40.44, // 20.22 * 2
        proteinCount: 10, // 5 * 2
      },
      20250725: {
        calorieCount: 100.11,
        fatCount: 10.54,
        carbCount: 20.22,
        proteinCount: 5,
      },
    });
  });

  it("returns empty object for empty input", () => {
    expect(calcMacrosByDate([])).toEqual({});
  });
});
