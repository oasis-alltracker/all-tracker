const { v1: uuidv1 } = require("uuid");

const SEASONS = [
  "building",
  "leveling_up",
  "flowing",
  "understanding",
  "restoring",
];

class CreateSeason {
  constructor(db) {
    this.DB = db;
  }

  async createSeason(user, body) {
    if (!SEASONS.includes(body?.season) || !/^\d{8}$/.test(body?.dateStamp)) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid season or dateStamp"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      const response = await this.createEntry(user.email, body);
      await this.updateCurrentSeason(user.email, body);

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

  // Append-only history row. A season ends when the next one starts.
  async createEntry(email, season) {
    const seasonID = uuidv1();

    const data = {
      PK: `${email}-season`,
      SK: `${season.dateStamp}-${seasonID}`,
      season: season.season,
      createdAt: new Date().toISOString(),
    };

    await this.DB.putItem(data);
    return {
      ID: data.SK,
      season: data.season,
      seasonStartedAt: season.dateStamp,
    };
  }

  // Current season is copied onto the user row so GET v1/user has it at app load.
  async updateCurrentSeason(email, season) {
    const key = { PK: `${email}`, SK: `${email}` };
    const expression =
      "SET #season = :season, #seasonStartedAt = :seasonStartedAt";
    const names = {
      "#season": "season",
      "#seasonStartedAt": "seasonStartedAt",
    };
    const values = {
      ":season": season.season,
      ":seasonStartedAt": season.dateStamp,
    };
    const condition = "attribute_exists(PK)";
    await this.DB.updateItem(expression, key, names, values, condition);
  }
}
module.exports = CreateSeason;
module.exports.SEASONS = SEASONS;
