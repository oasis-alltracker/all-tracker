const { v1: uuidv1 } = require("uuid");
const { SEASONS } = require("../../userInfo/seasons/createSeason");

// Open writing: one prompt (optional) and free text in bodyText. Editable.
const OPEN_ENTRY_TYPES = ["guided_prompt", "dream", "free_write"];
// Question sets: 2-3 { question, answer } pairs in responses. Not editable.
const QUESTION_ENTRY_TYPES = ["morning_checkin", "evening_reflection"];
const ENTRY_TYPES = [...OPEN_ENTRY_TYPES, ...QUESTION_ENTRY_TYPES];

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function isValidResponses(responses) {
  return (
    Array.isArray(responses) &&
    responses.length >= 2 &&
    responses.length <= 3 &&
    responses.every(
      (response) =>
        isNonEmptyString(response?.question) &&
        typeof response?.answer === "string",
    ) &&
    responses.some((response) => isNonEmptyString(response.answer))
  );
}

function isValidJournalEntry(body) {
  if (!SEASONS.includes(body?.season) || !/^\d{8}$/.test(body?.dateStamp)) {
    return false;
  }
  if (OPEN_ENTRY_TYPES.includes(body.entryType)) {
    return isNonEmptyString(body.bodyText) && body.responses === undefined;
  }
  if (QUESTION_ENTRY_TYPES.includes(body.entryType)) {
    return isValidResponses(body.responses) && body.bodyText === undefined;
  }
  return false;
}

class CreateJournalEntry {
  constructor(db) {
    this.DB = db;
  }

  async createJournalEntry(user, body) {
    if (!isValidJournalEntry(body)) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid journal entry"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      const response = await this.createEntry(user.email, body);

      return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify("Request failed"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }
  }

  async createEntry(email, journalEntry) {
    const journalEntryID = uuidv1();

    const data = {
      PK: `${email}-journalEntry`,
      SK: `${journalEntry.dateStamp}-${journalEntryID}`,
      entryType: journalEntry.entryType,
      season: journalEntry.season,
      time: journalEntry.time ?? null,
      createdAt: new Date().toISOString(),
    };

    if (QUESTION_ENTRY_TYPES.includes(journalEntry.entryType)) {
      data.responses = journalEntry.responses.map((response) => ({
        question: response.question,
        answer: response.answer,
      }));
    } else {
      data.promptText = journalEntry.promptText ?? null;
      data.bodyText = journalEntry.bodyText;
    }

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateJournalEntry;
module.exports.ENTRY_TYPES = ENTRY_TYPES;
module.exports.OPEN_ENTRY_TYPES = OPEN_ENTRY_TYPES;
module.exports.QUESTION_ENTRY_TYPES = QUESTION_ENTRY_TYPES;
