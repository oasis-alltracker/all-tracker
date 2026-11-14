const {
  fieldsFor,
  presentFields,
  fieldsAreValid,
  otherHasLabel,
} = require("./validateWorkoutEntry");

class UpdateWorkoutEntry {
  constructor(db) {
    this.DB = db;
  }

  // Partial edit of the fields this entry's type carries: e.g. the
  // end-of-workout reflection, or fixing a movement's duration. Entry type,
  // season and date describe when it happened and aren't editable. A session's
  // exercises are its exercise entries, not fields here.
  async updateWorkoutEntry(user, workoutEntryID, body) {
    try {
      const workoutEntry = await this.getEntry(user.email, workoutEntryID);
      if (!workoutEntry) {
        return this.badRequest("Entry not found");
      }

      var fields = presentFields(body, fieldsFor(workoutEntry.entryType));
      if (
        fields.length === 0 ||
        !fieldsAreValid(body, fields) ||
        (body.activityType !== undefined && !otherHasLabel(body))
      ) {
        return this.badRequest("Invalid workout entry");
      }

      // Switching a movement away from "other" clears the free-text label.
      if (
        body.activityType !== undefined &&
        body.activityType !== "other" &&
        !fields.includes("activityLabel")
      ) {
        fields = [...fields, "activityLabel"];
        body = { ...body, activityLabel: null };
      }

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

  badRequest(message) {
    return {
      statusCode: 400,
      body: JSON.stringify(message),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }

  async getEntry(email, workoutEntryID) {
    const response = await this.DB.getItem({
      PK: `${email}-workoutEntry`,
      SK: workoutEntryID,
    });
    return response?.Item;
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
