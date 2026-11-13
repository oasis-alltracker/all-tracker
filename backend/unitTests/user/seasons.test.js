const CreateSeason = require("../../userInfo/seasons/createSeason");
const GetSeasons = require("../../userInfo/seasons/getSeasons");

function mockDB() {
  return {
    putItem: jest.fn().mockResolvedValue({}),
    updateItem: jest.fn().mockResolvedValue(),
    queryItem: jest.fn().mockResolvedValue({ Items: [] }),
  };
}

const user = { email: "test@example.com" };

describe("createSeason", () => {
  it("writes a history row and copies the season onto the user", async () => {
    const db = mockDB();
    const response = await new CreateSeason(db).createSeason(user, {
      season: "leveling_up",
      dateStamp: "20261112",
    });

    expect(response.statusCode).toBe(200);

    const row = db.putItem.mock.calls[0][0];
    expect(row.PK).toBe("test@example.com-season");
    expect(row.SK).toMatch(/^20261112-/);
    expect(row.season).toBe("leveling_up");
    expect(row.createdAt).toEqual(expect.any(String));

    const [expression, key, names, values, condition] =
      db.updateItem.mock.calls[0];
    expect(key).toEqual({ PK: "test@example.com", SK: "test@example.com" });
    expect(expression).toBe(
      "SET #season = :season, #seasonStartedAt = :seasonStartedAt",
    );
    expect(names).toEqual({
      "#season": "season",
      "#seasonStartedAt": "seasonStartedAt",
    });
    expect(values).toEqual({
      ":season": "leveling_up",
      ":seasonStartedAt": "20261112",
    });
    expect(condition).toBe("attribute_exists(PK)");

    expect(JSON.parse(response.body)).toEqual({
      ID: row.SK,
      season: "leveling_up",
      seasonStartedAt: "20261112",
    });
  });

  it.each([
    [{ season: "winter", dateStamp: "20261112" }],
    [{ season: "building" }],
    [{ season: "building", dateStamp: "2026-11-12" }],
    [null],
  ])("rejects invalid body %j with 400 and writes nothing", async (body) => {
    const db = mockDB();
    const response = await new CreateSeason(db).createSeason(user, body);

    expect(response.statusCode).toBe(400);
    expect(db.putItem).not.toHaveBeenCalled();
    expect(db.updateItem).not.toHaveBeenCalled();
  });

  it("returns 500 when the user row does not exist", async () => {
    const db = mockDB();
    db.updateItem.mockRejectedValue(new Error("ConditionalCheckFailed"));
    const response = await new CreateSeason(db).createSeason(user, {
      season: "building",
      dateStamp: "20261112",
    });

    expect(response.statusCode).toBe(500);
  });
});

describe("getSeasons", () => {
  it("returns all seasons when no range is given", async () => {
    const db = mockDB();
    const response = await new GetSeasons(db).getSeasons(user, null);

    expect(response.statusCode).toBe(200);
    const [expression, , values] = db.queryItem.mock.calls[0];
    expect(expression).toBe("#pk = :pk");
    expect(values).toEqual({ ":pk": "test@example.com-season" });
  });

  it("includes seasons started on endDate when a range is given", async () => {
    const db = mockDB();
    await new GetSeasons(db).getSeasons(user, {
      startDate: "20261101",
      endDate: "20261130",
    });

    const [, , values] = db.queryItem.mock.calls[0];
    expect(values[":startDate"]).toBe("20261101");
    expect("20261130-abc" <= values[":endDate"]).toBe(true);
  });
});
