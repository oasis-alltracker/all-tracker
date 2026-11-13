const { isValidPosition } = require("./createExerciseEntry");

// Fields an edit can set. Anything else in the body is ignored.
const ALLOWED_FIELDS = ["setInfo", "position"];

class UpdateExerciseEntry {
  constructor(db) {
    this.DB = db;
  }

  async updateExerciseEntry(user, exerciseEntryID, body) {
    const fields = ALLOWED_FIELDS.filter((field) => body?.[field] !== undefined);
    if (
      fields.length === 0 ||
      (body.setInfo !== undefined && !Array.isArray(body.setInfo)) ||
      (body.position !== undefined && !isValidPosition(body.position))
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid exercise entry"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      await this.updateEntry(user.email, exerciseEntryID, body, fields);

      return {
        statusCode: 200,
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

  async updateEntry(email, exerciseEntryID, exerciseEntry, fields) {
    const key = { PK: `${email}-exerciseEntry`, SK: exerciseEntryID };
    const expression =
      "SET " + fields.map((field) => `#${field} = :${field}`).join(", ");
    const names = {};
    const values = {};
    fields.forEach((field) => {
      names[`#${field}`] = field;
      values[`:${field}`] = exerciseEntry[field];
    });
    const condition = "attribute_exists(PK)";
    await this.DB.updateItem(expression, key, names, values, condition);
  }
}
module.exports = UpdateExerciseEntry;
