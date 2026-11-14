const CreateExercise = require("../../tracker-fitness/exercises/createExercise");
const GetExercises = require("../../tracker-fitness/exercises/getExercises");
const UpdateExercise = require("../../tracker-fitness/exercises/updateExercise");
const CreateWorkoutPlan = require("../../tracker-fitness/workoutPlans/createWorkoutPlan");
const UpdateWorkoutPlan = require("../../tracker-fitness/workoutPlans/updateWorkoutPlan");
const DeleteWorkoutPlan = require("../../tracker-fitness/workoutPlans/deleteWorkoutPlan");
const CreateWorkoutEntry = require("../../tracker-fitness/workoutEntries/createWorkoutEntry");
const UpdateWorkoutEntry = require("../../tracker-fitness/workoutEntries/updateWorkoutEntry");
const GetWorkoutEntries = require("../../tracker-fitness/workoutEntries/getWorkoutEntries");
const DeleteWorkoutEntry = require("../../tracker-fitness/workoutEntries/deleteWorkoutEntry");
const CreateExerciseEntry = require("../../tracker-fitness/exerciseEntries/createExerciseEntry");
const GetExerciseEntries = require("../../tracker-fitness/exerciseEntries/getExerciseEntries");
const UpdateExerciseEntry = require("../../tracker-fitness/exerciseEntries/updateExerciseEntry");
const DeleteUser = require("../../userInfo/user/deleteUser");

const user = { email: "test@example.com" };

function mockDB({ items = {}, item } = {}) {
  return {
    putItem: jest.fn().mockResolvedValue({}),
    updateItem: jest.fn().mockResolvedValue(),
    deleteItem: jest.fn().mockResolvedValue({}),
    deleteItems: jest.fn().mockResolvedValue(),
    getItem: jest.fn().mockResolvedValue({ Item: item }),
    queryItem: jest.fn(async (expression, names, values) => ({
      Items: items[values[":pk"]] ?? [],
    })),
  };
}

describe("exercises (library)", () => {
  it("creates an exercise keyed by its own ID, not a plan", async () => {
    const db = mockDB();
    const response = await new CreateExercise(db).createExercise(user, {
      name: "Pull-ups",
      muscle: "back",
      workoutPlanID: "plan1",
      sets: 3,
    });

    expect(response.statusCode).toBe(200);
    const row = db.putItem.mock.calls[0][0];
    expect(row.PK).toBe("test@example.com-exercise");
    expect(row.SK).not.toContain("plan1");
    expect(row).toMatchObject({ name: "Pull-ups", muscle: "back", type: null });
    expect(row.sets).toBeUndefined();
    expect(row.workoutPlanID).toBeUndefined();
  });

  it("rejects an exercise without a name", async () => {
    const db = mockDB();
    const response = await new CreateExercise(db).createExercise(user, {
      muscle: "back",
    });
    expect(response.statusCode).toBe(400);
    expect(db.putItem).not.toHaveBeenCalled();
  });

  const library = {
    "test@example.com-exercise": [
      { SK: "ex1", name: "Pull-ups" },
      { SK: "ex2", name: "Rows" },
      { SK: "ex3", name: "Curls" },
    ],
  };

  it("returns the whole library without a parameter", async () => {
    const response = await new GetExercises(
      mockDB({ items: library }),
    ).getExercises(user, null);
    expect(JSON.parse(response.body).map((e) => e.SK)).toEqual([
      "ex1",
      "ex2",
      "ex3",
    ]);
  });

  it("returns a plan's exercises in plan order with setCount, skipping deleted ones", async () => {
    const db = mockDB({
      items: library,
      item: {
        exercisesAndSets: [
          { exerciseID: "ex3", setCount: 2 },
          { exerciseID: "gone", setCount: 5 },
          { exerciseID: "ex1", setCount: 4 },
        ],
      },
    });

    const response = await new GetExercises(db).getExercises(user, {
      workoutPlanID: "plan1",
    });

    expect(db.getItem).toHaveBeenCalledWith({
      PK: "test@example.com-workoutPlan",
      SK: "plan1",
    });
    expect(JSON.parse(response.body)).toEqual([
      { SK: "ex3", name: "Curls", setCount: 2 },
      { SK: "ex1", name: "Pull-ups", setCount: 4 },
    ]);
  });

  it("updates a subset of exercise fields", async () => {
    const db = mockDB();
    await new UpdateExercise(db).updateExercise(user, "ex1", {
      muscle: "lats",
      sets: 4,
    });

    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #muscle = :muscle",
      { PK: "test@example.com-exercise", SK: "ex1" },
      { "#muscle": "muscle" },
      { ":muscle": "lats" },
      "attribute_exists(PK)",
    );
  });
});

describe("workout plans", () => {
  const exercisesAndSets = [
    { exerciseID: "ex1", setCount: 3 },
    { exerciseID: "ex2", setCount: 4 },
  ];

  it("stores exercisesAndSets", async () => {
    const db = mockDB();
    await new CreateWorkoutPlan(db).createWorkoutPlan(user, {
      name: "Upper",
      exercisesAndSets,
    });
    expect(db.putItem.mock.calls[0][0]).toMatchObject({
      PK: "test@example.com-workoutPlan",
      name: "Upper",
      exercisesAndSets,
    });
  });

  it.each([
    ["missing name", { exercisesAndSets }],
    ["zero sets", { name: "Upper", exercisesAndSets: [{ exerciseID: "ex1", setCount: 0 }] }],
    ["missing exerciseID", { name: "Upper", exercisesAndSets: [{ setCount: 3 }] }],
    ["not a list", { name: "Upper", exercisesAndSets: "ex1" }],
  ])("rejects a plan with %s", async (label, body) => {
    const db = mockDB();
    const response = await new CreateWorkoutPlan(db).createWorkoutPlan(
      user,
      body,
    );
    expect(response.statusCode).toBe(400);
  });

  it("updates only the fields sent", async () => {
    const db = mockDB();
    await new UpdateWorkoutPlan(db).updateWorkoutPlan(user, "plan1", {
      exercisesAndSets,
    });
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #exercisesAndSets = :exercisesAndSets",
      { PK: "test@example.com-workoutPlan", SK: "plan1" },
      { "#exercisesAndSets": "exercisesAndSets" },
      { ":exercisesAndSets": exercisesAndSets },
      "attribute_exists(PK)",
    );
  });

  it("deletes only the plan, never library exercises", async () => {
    const db = mockDB();
    await new DeleteWorkoutPlan(db).deleteWorkoutPlan(user, "plan1");

    expect(db.deleteItem).toHaveBeenCalledTimes(1);
    expect(db.deleteItem).toHaveBeenCalledWith({
      PK: "test@example.com-workoutPlan",
      SK: "plan1",
    });
    expect(db.queryItem).not.toHaveBeenCalled();
  });
});

describe("workout entries", () => {
  const workout = {
    entryType: "workout",
    name: "Push day",
    season: "building",
    dateStamp: "20261113",
  };
  const movement = {
    entryType: "movement",
    activityType: "walk",
    durationMinutes: 20,
    season: "restoring",
    dateStamp: "20261113",
  };
  const entryKey = { PK: "test@example.com-workoutEntry", SK: "20261113-w1" };

  it("creates a workout with reflection fields empty until the end", async () => {
    const db = mockDB();
    const response = await new CreateWorkoutEntry(db).createWorkoutEntry(
      user,
      workout,
    );

    expect(response.statusCode).toBe(200);
    const row = db.putItem.mock.calls[0][0];
    expect(row).toMatchObject({
      SK: expect.stringMatching(/^20261113-/),
      entryType: "workout",
      name: "Push day",
      season: "building",
      time: null,
      workoutPlanID: null,
      effortDescriptor: null,
      bodyFeelDescriptor: null,
      note: null,
    });
    expect(row.createdAt).toEqual(expect.any(String));
    expect(row.exerciseIDs).toBeUndefined();
    expect(row.durationMinutes).toBeUndefined();
    expect(JSON.parse(response.body)).toEqual({ ID: row.SK });
  });

  it("creates a quick movement with feel questions skipped", async () => {
    const db = mockDB();
    await new CreateWorkoutEntry(db).createWorkoutEntry(user, movement);

    const row = db.putItem.mock.calls[0][0];
    expect(row).toMatchObject({
      entryType: "movement",
      activityType: "walk",
      activityLabel: null,
      durationMinutes: 20,
      effortDescriptor: null,
      bodyFeelDescriptor: null,
      note: null,
      season: "restoring",
    });
    expect(row.name).toBeUndefined();
    expect(row.workoutPlanID).toBeUndefined();
  });

  it("creates a movement with a reflection, keeping the label only for other", async () => {
    const db = mockDB();
    const create = new CreateWorkoutEntry(db);
    await create.createWorkoutEntry(user, {
      ...movement,
      activityType: "other",
      activityLabel: "Climbing",
      effortDescriptor: "pushed_it",
      bodyFeelDescriptor: "lighter",
      note: "New route.",
    });
    await create.createWorkoutEntry(user, {
      ...movement,
      activityLabel: "ignored",
    });

    expect(db.putItem.mock.calls[0][0]).toMatchObject({
      activityType: "other",
      activityLabel: "Climbing",
      effortDescriptor: "pushed_it",
      bodyFeelDescriptor: "lighter",
      note: "New route.",
    });
    expect(db.putItem.mock.calls[1][0].activityLabel).toBeNull();
  });

  it.each([
    ["missing entryType", { ...workout, entryType: undefined }],
    ["unknown entryType", { ...workout, entryType: "class" }],
    ["unknown season", { ...workout, season: "winter" }],
    ["bad dateStamp", { ...workout, dateStamp: "2026-11-13" }],
    ["unknown effort", { ...workout, effortDescriptor: "medium" }],
    ["unknown body feel", { ...workout, bodyFeelDescriptor: "happy" }],
    ["movement without activityType", { ...movement, activityType: undefined }],
    ["movement with unknown activity", { ...movement, activityType: "dance" }],
    ["movement other without label", { ...movement, activityType: "other" }],
    ["movement without duration", { ...movement, durationMinutes: undefined }],
    ["movement with zero duration", { ...movement, durationMinutes: 0 }],
    ["movement with string duration", { ...movement, durationMinutes: "20" }],
    ["null body", null],
  ])("rejects %s with 400", async (label, body) => {
    const db = mockDB();
    const response = await new CreateWorkoutEntry(db).createWorkoutEntry(
      user,
      body,
    );
    expect(response.statusCode).toBe(400);
    expect(db.putItem).not.toHaveBeenCalled();
  });

  it("saves the end-of-workout reflection", async () => {
    const db = mockDB({ item: { ...entryKey, entryType: "workout" } });
    const response = await new UpdateWorkoutEntry(db).updateWorkoutEntry(
      user,
      "20261113-w1",
      {
        effortDescriptor: "pushed_it",
        bodyFeelDescriptor: "strong",
        note: "PR.",
        season: "restoring",
        exerciseIDs: ["ignored"],
      },
    );

    expect(response.statusCode).toBe(200);
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #effortDescriptor = :effortDescriptor, #bodyFeelDescriptor = :bodyFeelDescriptor, #note = :note",
      entryKey,
      {
        "#effortDescriptor": "effortDescriptor",
        "#bodyFeelDescriptor": "bodyFeelDescriptor",
        "#note": "note",
      },
      { ":effortDescriptor": "pushed_it", ":bodyFeelDescriptor": "strong", ":note": "PR." },
      "attribute_exists(PK)",
    );
  });

  it("treats entries without entryType as workouts", async () => {
    const db = mockDB({ item: { ...entryKey } });
    await new UpdateWorkoutEntry(db).updateWorkoutEntry(user, "20261113-w1", {
      name: "Legs",
    });
    expect(db.updateItem.mock.calls[0][0]).toBe("SET #name = :name");
  });

  it("edits a movement and clears the label when leaving other", async () => {
    const db = mockDB({ item: { ...entryKey, entryType: "movement" } });
    await new UpdateWorkoutEntry(db).updateWorkoutEntry(user, "20261113-w1", {
      activityType: "run",
      durationMinutes: 30,
      effortDescriptor: null,
    });

    const [expression, , , values] = db.updateItem.mock.calls[0];
    expect(expression).toBe(
      "SET #effortDescriptor = :effortDescriptor, #activityType = :activityType, #durationMinutes = :durationMinutes, #activityLabel = :activityLabel",
    );
    expect(values).toEqual({
      ":effortDescriptor": null,
      ":activityType": "run",
      ":durationMinutes": 30,
      ":activityLabel": null,
    });
  });

  it.each([
    ["only fields of the other type", "workout", { durationMinutes: 30 }],
    ["only fields of the other type", "movement", { name: "Legs" }],
    ["switching to other without label", "movement", { activityType: "other" }],
    ["bad duration", "movement", { durationMinutes: -5 }],
    ["unknown effort", "workout", { effortDescriptor: "medium" }],
    ["empty body", "workout", {}],
  ])("rejects an update with %s (%s)", async (label, entryType, body) => {
    const db = mockDB({ item: { ...entryKey, entryType } });
    const response = await new UpdateWorkoutEntry(db).updateWorkoutEntry(
      user,
      "20261113-w1",
      body,
    );
    expect(response.statusCode).toBe(400);
    expect(db.updateItem).not.toHaveBeenCalled();
  });

  it("returns 400 when the entry doesn't exist", async () => {
    const db = mockDB();
    const response = await new UpdateWorkoutEntry(db).updateWorkoutEntry(
      user,
      "20261113-w1",
      { note: "x" },
    );
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toBe("Entry not found");
  });

  it("includes entries on endDate in a range", async () => {
    const db = mockDB();
    await new GetWorkoutEntries(db).getWorkoutEntries(user, {
      startDate: "20261101",
      endDate: "20261130",
    });
    const values = db.queryItem.mock.calls[0][2];
    expect("20261130-w1" <= values[":endDate"]).toBe(true);
    expect("20261201-w1" <= values[":endDate"]).toBe(false);
  });

  it("deletes the session and its exercise entries found by key prefix", async () => {
    const exerciseEntries = [
      { SK: "20261113-w1-ex1" },
      { SK: "20261113-w1-ex2" },
    ];
    const db = mockDB({
      items: { "test@example.com-exerciseEntry": exerciseEntries },
    });

    await new DeleteWorkoutEntry(db).deleteWorkoutEntry(user, "20261113-w1");

    expect(db.queryItem.mock.calls[0][2][":sk"]).toBe("20261113-w1-");
    expect(db.deleteItems).toHaveBeenCalledWith(
      "test@example.com-exerciseEntry",
      exerciseEntries,
    );
    expect(db.deleteItem).toHaveBeenCalledWith({
      PK: "test@example.com-workoutEntry",
      SK: "20261113-w1",
    });
  });
});

describe("exercise entries", () => {
  const setInfo = [{ weight: 30, reps: 8, time: null }];

  const run = { workoutEntryID: "20261113-w1", exerciseID: "run", name: "Run" };

  it("stores each entry under its own ID with exerciseID, position and setInfo", async () => {
    const db = mockDB();
    const response = await new CreateExerciseEntry(db).createExerciseEntry(
      user,
      { ...run, position: 0, setInfo },
    );

    const row = db.putItem.mock.calls[0][0];
    expect(row).toEqual({
      PK: "test@example.com-exerciseEntry",
      SK: expect.stringMatching(/^20261113-w1-/),
      workoutEntryID: "20261113-w1",
      exerciseID: "run",
      name: "Run",
      position: 0,
      setInfo,
    });
    expect(JSON.parse(response.body)).toEqual({ ID: row.SK });
  });

  it("allows the same exercise twice in one workout without colliding", async () => {
    const db = mockDB();
    const create = new CreateExerciseEntry(db);
    await create.createExerciseEntry(user, { ...run, position: 0 });
    await create.createExerciseEntry(user, { ...run, position: 2 });

    const [first, second] = db.putItem.mock.calls.map(([row]) => row);
    expect(first.SK).not.toBe(second.SK);
    expect(first.exerciseID).toBe(second.exerciseID);
  });

  it.each([
    ["missing position", { ...run }],
    ["negative position", { ...run, position: -1 }],
    ["missing exerciseID", { ...run, exerciseID: undefined, position: 0 }],
    ["missing name", { ...run, name: "", position: 0 }],
    ["workoutEntryID without dateStamp", { ...run, workoutEntryID: "w1", position: 0 }],
    ["setInfo not a list", { ...run, position: 0, setInfo: {} }],
  ])("rejects %s", async (label, body) => {
    const db = mockDB();
    const response = await new CreateExerciseEntry(db).createExerciseEntry(
      user,
      body,
    );
    expect(response.statusCode).toBe(400);
    expect(db.putItem).not.toHaveBeenCalled();
  });

  it("returns a workout's entries in position order", async () => {
    const db = mockDB({
      items: {
        "test@example.com-exerciseEntry": [
          { SK: "20261113-w1-c", workoutEntryID: "20261113-w1", name: "Run", position: 2 },
          { SK: "20261113-w1-a", workoutEntryID: "20261113-w1", name: "Run", position: 0 },
          { SK: "20261113-w1-b", workoutEntryID: "20261113-w1", name: "Bench", position: 1 },
        ],
      },
    });

    const response = await new GetExerciseEntries(db).getExerciseEntries(user, {
      workoutEntryID: "20261113-w1",
    });

    expect(db.queryItem.mock.calls[0][2][":sk"]).toBe("20261113-w1-");
    expect(JSON.parse(response.body).map((e) => e.name)).toEqual([
      "Run",
      "Bench",
      "Run",
    ]);
  });

  it("groups a date range by workout, then position, including endDate", async () => {
    const db = mockDB({
      items: {
        "test@example.com-exerciseEntry": [
          { SK: "20261114-w2-x", workoutEntryID: "20261114-w2", position: 0 },
          { SK: "20261113-w1-y", workoutEntryID: "20261113-w1", position: 1 },
          { SK: "20261113-w1-z", workoutEntryID: "20261113-w1", position: 0 },
        ],
      },
    });

    const response = await new GetExerciseEntries(db).getExerciseEntries(user, {
      startDate: "20261101",
      endDate: "20261130",
    });

    const values = db.queryItem.mock.calls[0][2];
    expect("20261130-w-e" <= values[":endDate"]).toBe(true);
    expect(JSON.parse(response.body).map((e) => e.SK)).toEqual([
      "20261113-w1-z",
      "20261113-w1-y",
      "20261114-w2-x",
    ]);
  });

  it("queries one day by dateStamp prefix", async () => {
    const db = mockDB();
    await new GetExerciseEntries(db).getExerciseEntries(user, {
      dateStamp: "20261113",
    });
    expect(db.queryItem.mock.calls[0][2][":sk"]).toBe("20261113-");
  });

  it("updates setInfo and position in the exerciseEntry partition", async () => {
    const db = mockDB();
    await new UpdateExerciseEntry(db).updateExerciseEntry(
      user,
      "20261113-w1-a",
      { setInfo, position: 3, exerciseID: "ignored" },
    );
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #setInfo = :setInfo, #position = :position",
      { PK: "test@example.com-exerciseEntry", SK: "20261113-w1-a" },
      { "#setInfo": "setInfo", "#position": "position" },
      { ":setInfo": setInfo, ":position": 3 },
      "attribute_exists(PK)",
    );
  });

  it("rejects an update with nothing editable", async () => {
    const db = mockDB();
    const response = await new UpdateExerciseEntry(db).updateExerciseEntry(
      user,
      "20261113-w1-a",
      { sets: setInfo },
    );
    expect(response.statusCode).toBe(400);
  });
});

describe("deleteUser", () => {
  it("deletes workout entries from the workoutEntry partition", async () => {
    const workoutEntries = [{ SK: "20261113-w1" }];
    const db = mockDB({
      items: { "test@example.com-workoutEntry": workoutEntries },
    });

    await new DeleteUser(db).deleteUserAndData("test@example.com");

    expect(db.deleteItems).toHaveBeenCalledWith(
      "test@example.com-workoutEntry",
      workoutEntries,
    );
  });
});
