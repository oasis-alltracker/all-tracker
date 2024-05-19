class UpdateExerciseEntry {
  constructor(db) {
    this.DB = db;
  }

  async updateExerciseEntry(user, foodItemID, body) {
    try {
      await this.updateEntry(user.email, foodItemID, body);

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

  async updateEntry(email, exerciseEntryID, exerciseEntry) {
    const key = { PK: `${email}-exercise`, SK: exerciseEntryID };
    const expression = "SET #sets = :sets";
    const names = {
      "#sets": "sets",
    };
    const values = {
      ":sets": exerciseEntry.sets,
    };
    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateExerciseEntry;
