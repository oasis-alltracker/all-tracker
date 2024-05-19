class DeleteWorkoutEntry {
  constructor(db) {
    this.DB = db;
  }

  async deleteWorkoutEntry(user, workoutEntryID) {
    try {
      await this.deleteEntry(user.email, workoutEntryID);

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

  async deleteEntry(email, workoutEntryID) {
    var key;
    const workoutEntry = await this.getEntry(email, workoutEntryID);

    for (const exerciseID of workoutEntry.exerciseIDs) {
      key = {
        PK: `${email}-exerciseEntry`,
        SK: `${workoutEntryID}-${exerciseID}`,
      };
      await this.DB.deleteItem(key);
    }
    key = { PK: `${email}-workoutEntry`, SK: workoutEntryID };
    await this.DB.deleteItem(key);
  }

  async getEntry(user, workoutEntryID) {
    const expression = "#pk = :pk AND #sk = :sk ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-workoutEntry`,
      ":sk": workoutEntryID,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items[0];
  }
}
module.exports = DeleteWorkoutEntry;
