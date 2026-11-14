const CreateJournalEntry = require("../../tracker-wellness/journalEntries/createJournalEntry");
const GetJournalEntries = require("../../tracker-wellness/journalEntries/getJournalEntries");
const UpdateJournalEntry = require("../../tracker-wellness/journalEntries/updateJournalEntry");
const DeleteJournalEntry = require("../../tracker-wellness/journalEntries/deleteJournalEntry");

function mockDB() {
  return {
    putItem: jest.fn().mockResolvedValue({}),
    updateItem: jest.fn().mockResolvedValue(),
    deleteItem: jest.fn().mockResolvedValue({}),
    queryItem: jest.fn().mockResolvedValue({ Items: [] }),
  };
}

// Returns the given items for whichever partition is queried.
function mockDBWithPartitions(partitions) {
  const db = mockDB();
  db.queryItem.mockImplementation(async (expression, names, values) => ({
    Items: partitions[values[":pk"]] ?? [],
  }));
  return db;
}

const user = { email: "test@example.com" };
const openEntry = {
  entryType: "guided_prompt",
  season: "building",
  promptText: "Who are you building toward?",
  bodyText: "Someone steady.",
  time: "21:30",
  dateStamp: "20261113",
};
const questionEntry = {
  entryType: "morning_checkin",
  season: "building",
  responses: [
    { question: "Question one?", answer: "Answer one." },
    { question: "Question two?", answer: "" },
  ],
  time: "07:15",
  dateStamp: "20261113",
};

describe("createJournalEntry", () => {
  it("writes an open-writing entry keyed by dateStamp", async () => {
    const db = mockDB();
    const response = await new CreateJournalEntry(db).createJournalEntry(
      user,
      openEntry,
    );

    expect(response.statusCode).toBe(200);
    const row = db.putItem.mock.calls[0][0];
    expect(row.PK).toBe("test@example.com-journalEntry");
    expect(row.SK).toMatch(/^20261113-/);
    expect(row).toMatchObject({
      entryType: "guided_prompt",
      season: "building",
      promptText: "Who are you building toward?",
      bodyText: "Someone steady.",
      time: "21:30",
    });
    expect(row.responses).toBeUndefined();
    expect(row.createdAt).toEqual(expect.any(String));
    expect(JSON.parse(response.body)).toEqual({ ID: row.SK });
  });

  it("stores null for missing optional promptText and time", async () => {
    const db = mockDB();
    const { promptText, time, ...freeWrite } = openEntry;
    await new CreateJournalEntry(db).createJournalEntry(user, {
      ...freeWrite,
      entryType: "free_write",
    });

    const row = db.putItem.mock.calls[0][0];
    expect(row.promptText).toBeNull();
    expect(row.time).toBeNull();
  });

  it("writes a question-set entry with responses and no bodyText", async () => {
    const db = mockDB();
    const response = await new CreateJournalEntry(db).createJournalEntry(
      user,
      {
        ...questionEntry,
        responses: [
          ...questionEntry.responses,
          { question: "Question three?", answer: "Three.", extra: "dropped" },
        ],
      },
    );

    expect(response.statusCode).toBe(200);
    const row = db.putItem.mock.calls[0][0];
    expect(row.entryType).toBe("morning_checkin");
    expect(row.responses).toEqual([
      { question: "Question one?", answer: "Answer one." },
      { question: "Question two?", answer: "" },
      { question: "Question three?", answer: "Three." },
    ]);
    expect(row.bodyText).toBeUndefined();
    expect(row.promptText).toBeUndefined();
  });

  it.each([
    ["unknown entryType", { ...openEntry, entryType: "mood" }],
    ["unknown season", { ...openEntry, season: "winter" }],
    ["bad dateStamp", { ...openEntry, dateStamp: "2026-11-13" }],
    ["blank bodyText", { ...openEntry, bodyText: "   " }],
    ["missing bodyText", { ...openEntry, bodyText: undefined }],
    ["open entry with responses", { ...openEntry, responses: questionEntry.responses }],
    ["question entry with bodyText", { ...questionEntry, bodyText: "x" }],
    ["one question", { ...questionEntry, responses: questionEntry.responses.slice(0, 1) }],
    [
      "four questions",
      { ...questionEntry, responses: [...questionEntry.responses, ...questionEntry.responses] },
    ],
    [
      "all answers blank",
      {
        ...questionEntry,
        responses: [
          { question: "A?", answer: "" },
          { question: "B?", answer: " " },
        ],
      },
    ],
    [
      "blank question",
      {
        ...questionEntry,
        responses: [
          { question: "", answer: "x" },
          { question: "B?", answer: "y" },
        ],
      },
    ],
    ["null body", null],
  ])("rejects %s with 400 and writes nothing", async (label, body) => {
    const db = mockDB();
    const response = await new CreateJournalEntry(db).createJournalEntry(
      user,
      body,
    );

    expect(response.statusCode).toBe(400);
    expect(db.putItem).not.toHaveBeenCalled();
  });
});

describe("getJournalEntries", () => {
  it("queries one day across journal and legacy partitions", async () => {
    const db = mockDB();
    await new GetJournalEntries(db).getJournalEntries(user, {
      dateStamp: "20261113",
    });

    const pks = db.queryItem.mock.calls.map(([, , values]) => values[":pk"]);
    expect(pks).toEqual([
      "test@example.com-journalEntry",
      "test@example.com-wellnessReport",
      "test@example.com-sleepReport",
    ]);
    db.queryItem.mock.calls.forEach(([expression, , values]) => {
      expect(expression).toBe("#pk = :pk AND begins_with(#sk, :sk)");
      expect(values[":sk"]).toBe("20261113-");
    });
  });

  it("includes entries written on endDate in a range", async () => {
    const db = mockDB();
    await new GetJournalEntries(db).getJournalEntries(user, {
      startDate: "20261101",
      endDate: "20261130",
    });

    const [, , values] = db.queryItem.mock.calls[0];
    expect(values[":startDate"]).toBe("20261101");
    expect("20261130-abc" <= values[":endDate"]).toBe(true);
    expect("20261201-abc" <= values[":endDate"]).toBe(false);
  });

  it("merges legacy diary text read-only, skips reports without it, and sorts by SK", async () => {
    const db = mockDBWithPartitions({
      "test@example.com-journalEntry": [
        { SK: "20261110-j1", entryType: "free_write", bodyText: "New." },
      ],
      "test@example.com-wellnessReport": [
        {
          PK: "test@example.com-wellnessReport",
          SK: "20261105-w1",
          mood: "neutral",
          title: "Tuesday",
          journal: "Old diary.",
        },
        { SK: "20261106-w2", mood: "neutral", journal: "  " },
        { SK: "20261107-w3", mood: "neutral" },
      ],
      "test@example.com-sleepReport": [
        {
          PK: "test@example.com-sleepReport",
          SK: "20261112-s1",
          rating: 7,
          journal: "Slept badly.",
        },
      ],
    });

    const response = await new GetJournalEntries(db).getJournalEntries(user, {
      startDate: "20261101",
      endDate: "20261130",
    });

    expect(JSON.parse(response.body)).toEqual([
      {
        PK: "test@example.com-wellnessReport",
        SK: "20261105-w1",
        entryType: "wellness_report",
        title: "Tuesday",
        bodyText: "Old diary.",
        isLegacy: true,
      },
      { SK: "20261110-j1", entryType: "free_write", bodyText: "New." },
      {
        PK: "test@example.com-sleepReport",
        SK: "20261112-s1",
        entryType: "sleep_report",
        title: null,
        bodyText: "Slept badly.",
        isLegacy: true,
      },
    ]);
  });

  it("returns 500 without query parameters", async () => {
    const db = mockDB();
    const response = await new GetJournalEntries(db).getJournalEntries(
      user,
      null,
    );

    expect(response.statusCode).toBe(500);
  });
});

describe("updateJournalEntry", () => {
  it("updates only bodyText on an existing open-writing entry", async () => {
    const db = mockDB();
    const response = await new UpdateJournalEntry(db).updateJournalEntry(
      user,
      "20261113-abc",
      { bodyText: "Edited.", season: "restoring" },
    );

    expect(response.statusCode).toBe(200);
    expect(db.updateItem).toHaveBeenCalledWith(
      "SET #bodyText = :bodyText",
      { PK: "test@example.com-journalEntry", SK: "20261113-abc" },
      { "#bodyText": "bodyText", "#responses": "responses" },
      { ":bodyText": "Edited." },
      "attribute_exists(PK) AND attribute_not_exists(#responses)",
    );
  });

  it("returns 400 when the entry is missing or is a question set", async () => {
    const db = mockDB();
    const error = new Error("The conditional request failed");
    error.name = "ConditionalCheckFailedException";
    db.updateItem.mockRejectedValue(error);

    const response = await new UpdateJournalEntry(db).updateJournalEntry(
      user,
      "20261113-abc",
      { bodyText: "Edited." },
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toBe("Entry not found or not editable");
  });

  it("rejects empty bodyText with 400", async () => {
    const db = mockDB();
    const response = await new UpdateJournalEntry(db).updateJournalEntry(
      user,
      "20261113-abc",
      { bodyText: "" },
    );

    expect(response.statusCode).toBe(400);
    expect(db.updateItem).not.toHaveBeenCalled();
  });
});

describe("deleteJournalEntry", () => {
  it("deletes by key", async () => {
    const db = mockDB();
    const response = await new DeleteJournalEntry(db).deleteJournalEntry(
      user,
      "20261113-abc",
    );

    expect(response.statusCode).toBe(200);
    expect(db.deleteItem).toHaveBeenCalledWith({
      PK: "test@example.com-journalEntry",
      SK: "20261113-abc",
    });
  });
});
