const UpdateUser = require("../../userInfo/user/updateUser");

function mockDB() {
  return { updateItem: jest.fn().mockResolvedValue() };
}

const user = { email: "test@example.com" };
const key = { PK: "test@example.com", SK: "test@example.com" };

describe("updateUser", () => {
  // Body sent by the legacy app's UserAPI.updateUser.
  it("keeps the legacy isSetupComplete + trackingPreferences write", async () => {
    const db = mockDB();
    const trackingPreferences = { dietSelected: true, habits: false };
    const response = await new UpdateUser(db).updateUser(user, {
      isSetupComplete: true,
      trackingPreferences,
    });

    expect(response.statusCode).toBe(200);
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #isSetupComplete = :isSetupComplete, #trackingPreferences = :trackingPreferences",
      key,
      {
        "#isSetupComplete": "isSetupComplete",
        "#trackingPreferences": "trackingPreferences",
      },
      {
        ":isSetupComplete": true,
        ":trackingPreferences": trackingPreferences,
      },
    );
  });

  // Body sent by the legacy app's UserAPI.updateTaskPreference.
  it("keeps the legacy taskPreference write", async () => {
    const db = mockDB();
    const response = await new UpdateUser(db).updateUser(user, {
      taskPreference: "list",
    });

    expect(response.statusCode).toBe(200);
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #taskPreference = :taskPreference",
      key,
      { "#taskPreference": "taskPreference" },
      { ":taskPreference": "list" },
    );
  });

  it("updates nutritionPath on its own", async () => {
    const db = mockDB();
    await new UpdateUser(db).updateUser(user, { nutritionPath: "reflective" });

    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #nutritionPath = :nutritionPath",
      key,
      { "#nutritionPath": "nutritionPath" },
      { ":nutritionPath": "reflective" },
    );
  });

  it("ignores fields outside the allowlist", async () => {
    const db = mockDB();
    await new UpdateUser(db).updateUser(user, {
      nutritionPath: "tracking",
      hashedPassword: "x",
      failedAttempts: 0,
      season: "building",
    });

    const [expression, , names] = db.updateItem.mock.calls[0];
    expect(expression).toBe("SET #nutritionPath = :nutritionPath");
    expect(names).toEqual({ "#nutritionPath": "nutritionPath" });
  });

  it("returns 400 and writes nothing when no allowed field is sent", async () => {
    const db = mockDB();
    const response = await new UpdateUser(db).updateUser(user, {
      hashedPassword: "x",
    });

    expect(response.statusCode).toBe(400);
    expect(db.updateItem).not.toHaveBeenCalled();
  });
});
