class UpdateJournalEntry {
  constructor(db) {
    this.DB = db;
  }

  async updateJournalEntry(user, journalEntryID, body) {
    if (typeof body?.bodyText !== "string" || body.bodyText.trim() === "") {
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
      await this.updateEntry(user.email, journalEntryID, body);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      if (e?.name === "ConditionalCheckFailedException") {
        return {
          statusCode: 400,
          body: JSON.stringify("Entry not found or not editable"),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      }
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

  // Only open-writing entries are editable, and only their text; type, season and
  // prompt describe the moment it was written. Question sets (with responses) are fixed.
  async updateEntry(email, journalEntryID, journalEntry) {
    const key = { PK: `${email}-journalEntry`, SK: journalEntryID };
    const expression = "SET #bodyText = :bodyText";
    const names = {
      "#bodyText": "bodyText",
      "#responses": "responses",
    };
    const values = {
      ":bodyText": journalEntry.bodyText,
    };
    const condition = "attribute_exists(PK) AND attribute_not_exists(#responses)";
    await this.DB.updateItem(expression, key, names, values, condition);
  }
}
module.exports = UpdateJournalEntry;
