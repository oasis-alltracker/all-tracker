const { currentStatus } = require("../../utils/habitHistory");

class GetHabits {
  constructor(db) {
    this.DB = db;
  }

  // ?status=active or ?status=closed filters; no parameter returns every habit.
  async getHabits(user, queryStringParameters) {
    try {
      var habits = await this.get(user.email);
      if (queryStringParameters?.status) {
        habits = habits.filter(
          (habit) => currentStatus(habit) === queryStringParameters.status,
        );
      }

      return {
        statusCode: 200,
        body: JSON.stringify(habits),
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

  async get(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-habit`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetHabits;
