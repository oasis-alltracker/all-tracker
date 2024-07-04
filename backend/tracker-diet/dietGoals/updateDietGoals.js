class UpdateDietGoals {
  constructor(db) {
    this.DB = db;
  }

  async updateDietGoals(user, body) {
    try {
      await this.updateInfo(user.email, body);

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

  async updateInfo(email, healthInfo) {
    const key = { PK: `${email}-dietGoals`, SK: `dietGoals` };
    const expression =
      "SET #carbGoal = :carbGoal, #calorieGoal = :calorieGoal, #proteinGoal = :proteinGoal, #fatGoal = :fatGoal";
    const names = {
      "#carbGoal": "carbGoal",
      "#calorieGoal": "calorieGoal",
      "#proteinGoal": "proteinGoal",
      "#fatGoal": "fatGoal",
    };
    const values = {
      ":carbGoal": healthInfo.carbGoal,
      ":calorieGoal": healthInfo.calorieGoal,
      ":proteinGoal": healthInfo.proteinGoal,
      ":fatGoal": healthInfo.fatGoal,
    };
    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateDietGoals;
