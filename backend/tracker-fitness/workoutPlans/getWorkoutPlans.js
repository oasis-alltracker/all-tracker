class GetWorkoutPlans {
  constructor(db) {
    this.DB = db;
  }

  async getWorkoutPlans(user) {
    try {
      const workoutPlans = await this.getPlans(user.email);

      return {
        statusCode: 200,
        body: JSON.stringify(workoutPlans),
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

  async getPlans(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-workoutPlan`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetWorkoutPlans;
