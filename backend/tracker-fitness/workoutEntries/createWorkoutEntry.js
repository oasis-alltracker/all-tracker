const { v1: uuidv1 } = require("uuid");
const { SEASONS } = require("../../userInfo/seasons/createSeason");
const { ENTRY_TYPES } = require("../../utils/fitnessDescriptors");
const {
  fieldsFor,
  presentFields,
  fieldsAreValid,
  otherHasLabel,
} = require("./validateWorkoutEntry");

// A fitness entry is a movement (quick log: activity + duration) or a workout
// (a session whose exercises are exercise entries). Both carry the optional
// reflection: effort, body feel and note.
function isValidWorkoutEntry(body) {
  if (
    !ENTRY_TYPES.includes(body?.entryType) ||
    !SEASONS.includes(body.season) ||
    !/^\d{8}$/.test(body.dateStamp)
  ) {
    return false;
  }
  const fields = presentFields(body, fieldsFor(body.entryType));
  if (!fieldsAreValid(body, fields)) {
    return false;
  }
  if (body.entryType === "movement") {
    return (
      body.activityType !== undefined &&
      body.durationMinutes !== undefined &&
      otherHasLabel(body)
    );
  }
  return true;
}

class CreateWorkoutEntry {
  constructor(db) {
    this.DB = db;
  }

  async createWorkoutEntry(user, body) {
    if (!isValidWorkoutEntry(body)) {
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

  async createEntry(email, workoutEntry) {
    const workoutEntryID = uuidv1();

    const data = {
      PK: `${email}-workoutEntry`,
      SK: `${workoutEntry.dateStamp}-${workoutEntryID}`,
      entryType: workoutEntry.entryType,
      season: workoutEntry.season,
      time: workoutEntry.time ?? null,
      effortDescriptor: workoutEntry.effortDescriptor ?? null,
      bodyFeelDescriptor: workoutEntry.bodyFeelDescriptor ?? null,
      note: workoutEntry.note ?? null,
      createdAt: new Date().toISOString(),
    };

    if (workoutEntry.entryType === "movement") {
      data.activityType = workoutEntry.activityType;
      data.activityLabel =
        workoutEntry.activityType === "other"
          ? workoutEntry.activityLabel
          : null;
      data.durationMinutes = workoutEntry.durationMinutes;
    } else {
      data.name = workoutEntry.name ?? null;
      data.workoutPlanID = workoutEntry.workoutPlanID ?? null;
    }

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateWorkoutEntry;
