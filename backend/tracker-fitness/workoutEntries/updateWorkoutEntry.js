// Fields an edit can set. Anything else in the body is ignored. A session's
// exercises are its exercise entries (found by workoutEntryID), not a list here.
const ALLOWED_FIELDS = ["name", "time"];

class UpdateWorkoutEntry {
  constructor(db) {
    this.DB = db;
  }

  async updateWorkoutEntry(user, workoutEntryID, body) {
    const fields = ALLOWED_FIELDS.filter((field) => body?.[field] !== undefined);
    if (fields.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid workout entry"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      await this.updateEntry(user.email, workoutEntryID, body, fields);

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

  async updateEntry(email, workoutEntryID, workoutEntry, fields) {
    const key = { PK: `${email}-workoutEntry`, SK: workoutEntryID };
    const expression =
      "SET " + fields.map((field) => `#${field} = :${field}`).join(", ");
    const names = {};
    const values = {};
    fields.forEach((field) => {
      names[`#${field}`] = field;
      values[`:${field}`] = workoutEntry[field];
    });
    const condition = "attribute_exists(PK)";
    await this.DB.updateItem(expression, key, names, values, condition);
  }
}
module.exports = UpdateWorkoutEntry;
