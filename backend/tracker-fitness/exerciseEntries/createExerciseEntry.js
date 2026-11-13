const { v1: uuidv1 } = require("uuid");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function isValidPosition(position) {
  return Number.isInteger(position) && position >= 0;
}

class CreateExerciseEntry {
  constructor(db) {
    this.DB = db;
  }

  async createExerciseEntry(user, body) {
    if (
      !/^\d{8}-/.test(body?.workoutEntryID) ||
      !isNonEmptyString(body.exerciseID) ||
      !isNonEmptyString(body.name) ||
      !isValidPosition(body.position) ||
      (body.setInfo !== undefined && !Array.isArray(body.setInfo))
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

  // Each entry has its own ID, so the same exercise can appear more than once
  // in a session (e.g. a run to start and a run to finish). position keeps the
  // order they were done in.
  async createEntry(email, exerciseEntry) {
    const exerciseEntryID = uuidv1();

    const data = {
      PK: `${email}-exerciseEntry`,
      SK: `${exerciseEntry.workoutEntryID}-${exerciseEntryID}`,
      workoutEntryID: exerciseEntry.workoutEntryID,
      exerciseID: exerciseEntry.exerciseID,
      name: exerciseEntry.name,
      position: exerciseEntry.position,
      setInfo: exerciseEntry.setInfo ?? [],
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateExerciseEntry;
module.exports.isValidPosition = isValidPosition;
