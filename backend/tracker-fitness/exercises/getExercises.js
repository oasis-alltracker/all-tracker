class GetExercises {
  constructor(db) {
    this.DB = db;
  }

  // No parameter: the user's whole exercise library.
  // ?workoutPlanID=: that plan's exercises, in plan order, each with its setCount.
  async getExercises(user, queryStringParameters) {
    try {
      var exercises = await this.getAll(user.email);
      if (queryStringParameters?.workoutPlanID) {
        const workoutPlan = await this.getPlan(
          user.email,
          queryStringParameters.workoutPlanID,
        );
        exercises = this.forPlan(workoutPlan, exercises);
      }

      return {
        statusCode: 200,
        body: JSON.stringify(exercises),
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

  // Exercises deleted from the library since the plan was made are skipped.
  forPlan(workoutPlan, exercises) {
    const exercisesByID = new Map(
      exercises.map((exercise) => [exercise.SK, exercise]),
    );
    return (workoutPlan?.exercisesAndSets ?? [])
      .filter((planExercise) => exercisesByID.has(planExercise.exerciseID))
      .map((planExercise) => ({
        ...exercisesByID.get(planExercise.exerciseID),
        setCount: planExercise.setCount,
      }));
  }

  async getAll(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-exercise`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items ?? [];
  }

  async getPlan(user, workoutPlanID) {
    const response = await this.DB.getItem({
      PK: `${user}-workoutPlan`,
      SK: workoutPlanID,
    });
    return response?.Item;
  }
}
module.exports = GetExercises;
