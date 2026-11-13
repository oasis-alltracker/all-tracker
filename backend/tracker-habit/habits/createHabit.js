const { v1: uuidv1 } = require("uuid");
const { SEASONS } = require("../../userInfo/seasons/createSeason");

class CreateHabit {
  constructor(db) {
    this.DB = db;
  }

  async createHabit(user, body) {
    try {
      const response = await this.create(user.email, body);

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

  async create(email, habit) {
    const habitID = uuidv1();

    const data = {
      PK: `${email}-habit`,
      SK: `${habitID}`,
      name: habit.name,
      isPositive: habit.isPositive,
      threshold: habit.threshold,
      pngURL: habit.pngURL,
      status: "active",
      history: [],
    };

    // The relaunch app sends the season and day the habit starts in; the legacy
    // app doesn't, and its habits start with an empty history.
    if (SEASONS.includes(habit.season) && /^\d{8}$/.test(habit.dateStamp)) {
      data.history.push({
        status: "active",
        season: habit.season,
        dateStamp: habit.dateStamp,
      });
    }

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateHabit;
