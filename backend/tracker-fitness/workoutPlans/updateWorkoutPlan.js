const {
  isValidExercisesAndSets,
  isValidName,
} = require("./createWorkoutPlan");

// Fields an edit can set. Anything else in the body is ignored.
const ALLOWED_FIELDS = ["name", "exercisesAndSets"];

class UpdateWorkoutPlan {
  constructor(db) {
    this.DB = db;
  }

  async updateWorkoutPlan(user, workoutPlanID, body) {
    const fields = ALLOWED_FIELDS.filter((field) => body?.[field] !== undefined);
    if (
      fields.length === 0 ||
      (body.name !== undefined && !isValidName(body.name)) ||
      (body.exercisesAndSets !== undefined &&
        !isValidExercisesAndSets(body.exercisesAndSets))
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid workout plan"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      await this.updatePlan(user.email, workoutPlanID, body, fields);

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

  async updatePlan(email, workoutPlanID, workoutPlan, fields) {
    const key = { PK: `${email}-workoutPlan`, SK: workoutPlanID };
    const expression =
      "SET " + fields.map((field) => `#${field} = :${field}`).join(", ");
    const names = {};
    const values = {};
    fields.forEach((field) => {
      names[`#${field}`] = field;
      values[`:${field}`] = workoutPlan[field];
    });
    const condition = "attribute_exists(PK)";
    await this.DB.updateItem(expression, key, names, values, condition);
  }
}
module.exports = UpdateWorkoutPlan;
