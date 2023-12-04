class DeleteWorkoutPlan {
  constructor(db) {
    this.DB = db;
  }

  async deleteWorkoutPlan(user, workoutPlanID) {
    try {
      await this.deletePlan(user.email, workoutPlanID);

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

  async deletePlan(email, workoutPlanID) {
    var key;
    const workoutPlan = await this.getPlan(email);
    for (const exerciseID of workoutPlan.exerciseIDs) {
      key = { PK: `${email}-exercise`, SK: `${workoutPlanID}-${exerciseID}` };

      await this.DB.deleteItem(key);
    }

    key = { PK: `${email}-workoutPlan`, SK: workoutPlanID };
    await this.DB.deleteItem(key);
  }

  async getPlan(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-workoutPlan`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items[0];
  }
}
module.exports = DeleteWorkoutPlan;
