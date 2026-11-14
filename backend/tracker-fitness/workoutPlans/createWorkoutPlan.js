const { v1: uuidv1 } = require("uuid");

// [{ exerciseID, setCount }]: exercises come from the user's library.
function isValidExercisesAndSets(exercisesAndSets) {
  return (
    Array.isArray(exercisesAndSets) &&
    exercisesAndSets.every(
      (planExercise) =>
        typeof planExercise?.exerciseID === "string" &&
        planExercise.exerciseID !== "" &&
        Number.isInteger(planExercise.setCount) &&
        planExercise.setCount > 0,
    )
  );
}

function isValidName(name) {
  return typeof name === "string" && name.trim() !== "";
}

class CreateWorkoutPlan {
  constructor(db) {
    this.DB = db;
  }

  async createWorkoutPlan(user, body) {
    if (
      !isValidName(body?.name) ||
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
      const response = await this.createPlan(user.email, body);

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

  async createPlan(email, workoutPlan) {
    const workoutPlanID = uuidv1();

    const data = {
      PK: `${email}-workoutPlan`,
      SK: `${workoutPlanID}`,
      name: workoutPlan.name,
      exercisesAndSets: (workoutPlan.exercisesAndSets ?? []).map(
        (planExercise) => ({
          exerciseID: planExercise.exerciseID,
          setCount: planExercise.setCount,
        }),
      ),
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateWorkoutPlan;
module.exports.isValidExercisesAndSets = isValidExercisesAndSets;
module.exports.isValidName = isValidName;
