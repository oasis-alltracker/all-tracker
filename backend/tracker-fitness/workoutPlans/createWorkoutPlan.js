const { v1: uuidv1 } = require("uuid");

class CreateWorkoutPlan {
  constructor(db) {
    this.DB = db;
  }

  async createWorkoutPlan(user, body) {
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
      exerciseIDs: workoutPlan.exerciseIDs,
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateWorkoutPlan;
