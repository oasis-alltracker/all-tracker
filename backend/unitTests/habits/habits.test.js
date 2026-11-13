const CreateHabit = require("../../tracker-habit/habits/createHabit");
const GetHabits = require("../../tracker-habit/habits/getHabits");
const UpdateHabit = require("../../tracker-habit/habits/updateHabit");
const GetHabitStatusList = require("../../tracker-habit/habitStatusList/getHabitStatusList");

const user = { email: "test@example.com" };
const key = { PK: "test@example.com-habit", SK: "habit1" };

function mockDB({ habit, items = {} } = {}) {
  return {
    putItem: jest.fn().mockResolvedValue({}),
    updateItem: jest.fn().mockResolvedValue(),
    getItem: jest.fn().mockResolvedValue({ Item: habit }),
    queryItem: jest.fn(async (expression, names, values) => ({
      Items: items[values[":pk"]] ?? [],
    })),
    queryAllItems: jest.fn(
      async (expression, names, values) => items[values[":pk"]] ?? [],
    ),
  };
}

describe("createHabit", () => {
  it("keeps the legacy body working: active, empty history", async () => {
    const db = mockDB();
    await new CreateHabit(db).createHabit(user, {
      name: "Read",
      isPositive: true,
      threshold: 1,
      pngURL: "url",
      time: "13:00",
    });

    const row = db.putItem.mock.calls[0][0];
    expect(row).toMatchObject({
      name: "Read",
      isPositive: true,
      threshold: 1,
      pngURL: "url",
      status: "active",
      history: [],
    });
  });

  it("records the starting season and day when sent", async () => {
    const db = mockDB();
    await new CreateHabit(db).createHabit(user, {
      name: "Read",
      isPositive: true,
      threshold: 1,
      pngURL: "url",
      season: "building",
      dateStamp: "20261113",
    });

    expect(db.putItem.mock.calls[0][0].history).toEqual([
      { status: "active", season: "building", dateStamp: "20261113" },
    ]);
  });
});

describe("getHabits", () => {
  const items = {
    "test@example.com-habit": [
      { SK: "a" }, // legacy, no status
      { SK: "b", status: "active" },
      { SK: "c", status: "closed" },
    ],
  };

  it("returns every habit without a status parameter", async () => {
    const response = await new GetHabits(mockDB({ items })).getHabits(
      user,
      null,
    );
    expect(JSON.parse(response.body).map((h) => h.SK)).toEqual(["a", "b", "c"]);
  });

  it("filters by status, treating missing status as active", async () => {
    const db = mockDB({ items });
    const active = await new GetHabits(db).getHabits(user, { status: "active" });
    const closed = await new GetHabits(db).getHabits(user, { status: "closed" });

    expect(JSON.parse(active.body).map((h) => h.SK)).toEqual(["a", "b"]);
    expect(JSON.parse(closed.body).map((h) => h.SK)).toEqual(["c"]);
  });
});

describe("updateHabit edits", () => {
  // Body sent by the legacy app's UpdateHabitModal.
  it("keeps the legacy full-edit write identical", async () => {
    const db = mockDB();
    const response = await new UpdateHabit(db).updateHabit(user, "habit1", {
      name: "Read",
      threshold: 2,
      pngURL: "url",
      isPositive: false,
    });

    expect(response.statusCode).toBe(200);
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #name = :name, #isPositive = :isPositive, #threshold = :threshold, #pngURL = :pngURL",
      key,
      {
        "#name": "name",
        "#isPositive": "isPositive",
        "#threshold": "threshold",
        "#pngURL": "pngURL",
      },
      { ":name": "Read", ":isPositive": false, ":threshold": 2, ":pngURL": "url" },
    );
  });

  it("allows partial edits and ignores unknown fields", async () => {
    const db = mockDB();
    await new UpdateHabit(db).updateHabit(user, "habit1", {
      threshold: 3,
      history: [],
    });

    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #threshold = :threshold",
      key,
      { "#threshold": "threshold" },
      { ":threshold": 3 },
    );
  });

  it.each([
    ["empty body", {}],
    ["bad status", { status: "archived", season: "building", dateStamp: "20261113" }],
    ["status without season", { status: "closed", dateStamp: "20261113" }],
    ["status with bad dateStamp", { status: "closed", season: "building", dateStamp: "2026-11-13" }],
    ["status mixed with edits", { status: "closed", season: "building", dateStamp: "20261113", name: "x" }],
  ])("rejects %s with 400", async (label, body) => {
    const db = mockDB();
    const response = await new UpdateHabit(db).updateHabit(user, "habit1", body);

    expect(response.statusCode).toBe(400);
    expect(db.updateItem).not.toHaveBeenCalled();
  });
});

describe("updateHabit close and reopen", () => {
  const close = { status: "closed", season: "restoring", dateStamp: "20261104" };

  it("closes with a completion snapshot for the current chapter", async () => {
    const habit = {
      ...key,
      isPositive: true,
      threshold: 1,
      status: "active",
      history: [{ status: "active", season: "building", dateStamp: "20261101" }],
    };
    const db = mockDB({
      habit,
      items: {
        "test@example.com-habitStatus": [
          { SK: "20261101-habit1", count: 1, threshold: 1 },
          { SK: "20261103-habit1", count: 1, threshold: 1 },
        ],
        "test@example.com-season": [
          { SK: "20261101-s1", season: "building" },
          { SK: "20261103-s2", season: "restoring" },
        ],
      },
    });

    const response = await new UpdateHabit(db).updateHabit(user, "habit1", close);
    expect(response.statusCode).toBe(200);

    const [, statusNames, statusValues, statusFilter] =
      db.queryAllItems.mock.calls[0];
    expect(statusValues).toMatchObject({
      ":pk": "test@example.com-habitStatus",
      ":startDate": "20261101",
      ":habitID": "habit1",
    });
    expect("20261104-habit1" <= statusValues[":endDate"]).toBe(true);
    expect(statusFilter).toBe("#habitID = :habitID");
    expect(statusNames["#habitID"]).toBe("habitID");

    const [expression, updateKey, names, values, condition] =
      db.updateItem.mock.calls[0];
    expect(updateKey).toEqual(key);
    expect(expression).toBe(
      "SET #status = :status, #history = list_append(if_not_exists(#history, :emptyList), :event)",
    );
    expect(names).toEqual({ "#status": "status", "#history": "history" });
    expect(values[":status"]).toBe("closed");
    expect(values[":event"]).toEqual([
      {
        status: "closed",
        season: "restoring",
        dateStamp: "20261104",
        completions: 2,
        completionsBySeason: [
          { season: "building", completions: 1 },
          { season: "restoring", completions: 1 },
        ],
      },
    ]);
    expect(condition).toBe(
      "attribute_exists(PK) AND (attribute_not_exists(#status) OR #status = :active)",
    );
  });

  it("closes a legacy habit counting from its first completion", async () => {
    const db = mockDB({
      habit: { ...key, isPositive: true, threshold: 1 },
    });

    await new UpdateHabit(db).updateHabit(user, "habit1", close);

    const [, , statusValues] = db.queryAllItems.mock.calls[0];
    expect(statusValues[":startDate"]).toBe("0");
    expect(db.updateItem.mock.calls[0][3][":event"][0].completions).toBe(0);
  });

  it.each([
    ["missing", undefined],
    ["already closed", { ...key, status: "closed" }],
  ])("returns 400 when the habit is %s", async (label, habit) => {
    const db = mockDB({ habit });
    const response = await new UpdateHabit(db).updateHabit(user, "habit1", close);

    expect(response.statusCode).toBe(400);
    expect(db.updateItem).not.toHaveBeenCalled();
  });

  it("reopens only a closed habit, without a snapshot", async () => {
    const db = mockDB();
    const response = await new UpdateHabit(db).updateHabit(user, "habit1", {
      status: "active",
      season: "restoring",
      dateStamp: "20261113",
    });

    expect(response.statusCode).toBe(200);
    expect(db.getItem).not.toHaveBeenCalled();
    const [, , , values, condition] = db.updateItem.mock.calls[0];
    expect(values[":event"]).toEqual([
      { status: "active", season: "restoring", dateStamp: "20261113" },
    ]);
    expect(condition).toBe("attribute_exists(PK) AND #status = :closed");
  });
});

describe("getHabitStatusList", () => {
  it("leaves out habits closed on that day but keeps their logged status", async () => {
    const db = mockDB({
      items: {
        "test@example.com-habit": [
          { SK: "open", name: "Open" },
          {
            SK: "closed",
            name: "Closed",
            status: "closed",
            history: [{ status: "closed", dateStamp: "20261110" }],
          },
          {
            SK: "laterClosed",
            name: "Later",
            status: "closed",
            history: [{ status: "closed", dateStamp: "20261120" }],
          },
        ],
        "test@example.com-habitStatus": [
          { SK: "20261113-closed", habitID: "closed", count: 1 },
        ],
      },
    });

    const response = await new GetHabitStatusList(db).getHabitStatusList(
      user,
      "20261113",
    );
    const list = JSON.parse(response.body);

    expect(list.map((entry) => entry.SK)).toEqual([
      "open",
      "laterClosed",
      "20261113-closed",
    ]);
  });
});
