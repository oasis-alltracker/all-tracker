class UpdateHabit {
  constructor(db) {
    this.DB = db;
  }

  async updateHabit(user, habitID, body) {
    try {
      await this.update(user.email, habitID, body);

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

  async update(email, habitID, habit) {
    const key = { PK: `${email}-habit`, SK: habitID };
    const expression =
      "SET #name = :name, #isPositive = :isPositive, #threshold = :threshold, #pngURL = :pngURL, #time = :time";
    const names = {
      "#name": "name",
      "#isPositive": "isPositive",
      "#threshold": "threshold",
      "#pngURL": "pngURL",
    };
    const values = {
      ":name": habit.name,
      ":isPositive": habit.isPositive,
      ":threshold": habit.threshold,
      ":pngURL": habit.pngURL,
    };

    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateHabit;
