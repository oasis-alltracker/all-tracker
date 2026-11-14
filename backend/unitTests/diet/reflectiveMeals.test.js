const CreateReflectiveMeal = require("../../tracker-diet/reflectiveMeals/createReflectiveMeal");
const GetReflectiveMeals = require("../../tracker-diet/reflectiveMeals/getReflectiveMeals");
const UpdateReflectiveMeal = require("../../tracker-diet/reflectiveMeals/updateReflectiveMeal");
const DeleteReflectiveMeal = require("../../tracker-diet/reflectiveMeals/deleteReflectiveMeal");
const DeleteUser = require("../../userInfo/user/deleteUser");

function mockDB() {
  return {
    putItem: jest.fn().mockResolvedValue({}),
    updateItem: jest.fn().mockResolvedValue(),
    deleteItem: jest.fn().mockResolvedValue({}),
    deleteItems: jest.fn().mockResolvedValue(),
    queryItem: jest.fn().mockResolvedValue({ Items: [] }),
  };
}

const user = { email: "test@example.com" };
const key = { PK: "test@example.com-reflectiveMeal", SK: "20261113-abc" };
const quickMeal = {
  mealDescription: "Toast and eggs",
  season: "restoring",
  dateStamp: "20261113",
};

describe("createReflectiveMeal", () => {
  it("logs a meal with only a description", async () => {
    const db = mockDB();
    const response = await new CreateReflectiveMeal(db).createReflectiveMeal(
      user,
      quickMeal,
    );

    expect(response.statusCode).toBe(200);
    const row = db.putItem.mock.calls[0][0];
    expect(row.PK).toBe("test@example.com-reflectiveMeal");
    expect(row.SK).toMatch(/^20261113-/);
    expect(row).toMatchObject({
      mealDescription: "Toast and eggs",
      feelingDescriptors: [],
      bodyFeelingDescriptors: [],
      seasonalQuestion: null,
      note: null,
      season: "restoring",
      time: null,
    });
    expect(row.createdAt).toEqual(expect.any(String));
    expect(row.meal).toBeUndefined();
    expect(JSON.parse(response.body)).toEqual({ ID: row.SK });
  });

  it("logs a full meal with several pills of each kind", async () => {
    const db = mockDB();
    await new CreateReflectiveMeal(db).createReflectiveMeal(user, {
      ...quickMeal,
      feelingDescriptors: ["nourishing", "guilt_free"],
      bodyFeelingDescriptors: ["clear", "steady"],
      seasonalQuestion: "Did this meal fuel what you're building today?",
      note: "Yes.",
      time: "12:45",
    });

    expect(db.putItem.mock.calls[0][0]).toMatchObject({
      feelingDescriptors: ["nourishing", "guilt_free"],
      bodyFeelingDescriptors: ["clear", "steady"],
      seasonalQuestion: "Did this meal fuel what you're building today?",
      note: "Yes.",
      time: "12:45",
    });
  });

  it.each([
    ["missing description", { ...quickMeal, mealDescription: undefined }],
    ["blank description", { ...quickMeal, mealDescription: "  " }],
    ["unknown feeling", { ...quickMeal, feelingDescriptors: ["tasty"] }],
    ["feeling not a list", { ...quickMeal, feelingDescriptors: "light" }],
    ["repeated feeling", { ...quickMeal, feelingDescriptors: ["light", "light"] }],
    ["fitness body-feel pill", { ...quickMeal, bodyFeelingDescriptors: ["sore"] }],
    ["unknown season", { ...quickMeal, season: "winter" }],
    ["bad dateStamp", { ...quickMeal, dateStamp: "2026-11-13" }],
    ["seasonalQuestion not text", { ...quickMeal, seasonalQuestion: 3 }],
    ["null body", null],
  ])("rejects %s with 400 and writes nothing", async (label, body) => {
    const db = mockDB();
    const response = await new CreateReflectiveMeal(db).createReflectiveMeal(
      user,
      body,
    );
    expect(response.statusCode).toBe(400);
    expect(db.putItem).not.toHaveBeenCalled();
  });
});

describe("getReflectiveMeals", () => {
  it("queries one day by dateStamp prefix", async () => {
    const db = mockDB();
    await new GetReflectiveMeals(db).getReflectiveMeals(user, {
      dateStamp: "20261113",
    });

    const [expression, , values] = db.queryItem.mock.calls[0];
    expect(expression).toBe("#pk = :pk AND begins_with(#sk, :sk)");
    expect(values).toEqual({
      ":pk": "test@example.com-reflectiveMeal",
      ":sk": "20261113-",
    });
  });

  it("includes meals logged on endDate in a range", async () => {
    const db = mockDB();
    await new GetReflectiveMeals(db).getReflectiveMeals(user, {
      startDate: "20261101",
      endDate: "20261130",
    });

    const [, , values] = db.queryItem.mock.calls[0];
    expect("20261130-abc" <= values[":endDate"]).toBe(true);
    expect("20261201-abc" <= values[":endDate"]).toBe(false);
  });

  it("returns 500 without query parameters", async () => {
    const response = await new GetReflectiveMeals(
      mockDB(),
    ).getReflectiveMeals(user, null);
    expect(response.statusCode).toBe(500);
  });
});

describe("updateReflectiveMeal", () => {
  it("updates a subset and can clear the note", async () => {
    const db = mockDB();
    const response = await new UpdateReflectiveMeal(db).updateReflectiveMeal(
      user,
      "20261113-abc",
      {
        bodyFeelingDescriptors: ["clear"],
        note: null,
        season: "building",
        seasonalQuestion: "ignored",
      },
    );

    expect(response.statusCode).toBe(200);
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #bodyFeelingDescriptors = :bodyFeelingDescriptors, #note = :note",
      key,
      { "#bodyFeelingDescriptors": "bodyFeelingDescriptors", "#note": "note" },
      { ":bodyFeelingDescriptors": ["clear"], ":note": null },
      "attribute_exists(PK)",
    );
  });

  it.each([
    ["empty body", {}],
    ["only non-editable fields", { season: "building" }],
    ["blank description", { mealDescription: "" }],
    ["unknown feeling", { feelingDescriptors: ["tasty"] }],
  ])("rejects %s with 400", async (label, body) => {
    const db = mockDB();
    const response = await new UpdateReflectiveMeal(db).updateReflectiveMeal(
      user,
      "20261113-abc",
      body,
    );
    expect(response.statusCode).toBe(400);
    expect(db.updateItem).not.toHaveBeenCalled();
  });

  it("returns 400 for a missing meal", async () => {
    const db = mockDB();
    const error = new Error("The conditional request failed");
    error.name = "ConditionalCheckFailedException";
    db.updateItem.mockRejectedValue(error);

    const response = await new UpdateReflectiveMeal(db).updateReflectiveMeal(
      user,
      "20261113-abc",
      { note: "x" },
    );
    expect(response.statusCode).toBe(400);
  });
});

describe("deleteReflectiveMeal", () => {
  it("deletes by key", async () => {
    const db = mockDB();
    const response = await new DeleteReflectiveMeal(db).deleteReflectiveMeal(
      user,
      "20261113-abc",
    );
    expect(response.statusCode).toBe(200);
    expect(db.deleteItem).toHaveBeenCalledWith(key);
  });
});

describe("deleteUser", () => {
  it("deletes the user's reflective meals", async () => {
    const meals = [{ SK: "20261113-abc" }];
    const db = mockDB();
    db.queryItem.mockImplementation(async (expression, names, values) => ({
      Items: values[":pk"] === "test@example.com-reflectiveMeal" ? meals : [],
    }));

    await new DeleteUser(db).deleteUserAndData("test@example.com");

    expect(db.deleteItems).toHaveBeenCalledWith(
      "test@example.com-reflectiveMeal",
      meals,
    );
  });
});
