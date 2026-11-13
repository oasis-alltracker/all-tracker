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

  // Deletes the session and every exercise entry logged under it, found by key
  // prefix.
  async deleteEntry(email, workoutEntryID) {
    const exerciseEntries = await this.getExerciseEntries(
      email,
      workoutEntryID,
    );
    await this.DB.deleteItems(`${email}-exerciseEntry`, exerciseEntries);

    const key = { PK: `${email}-workoutEntry`, SK: workoutEntryID };
    await this.DB.deleteItem(key);
  }

  async getExerciseEntries(user, workoutEntryID) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-exerciseEntry`,
      ":sk": `${workoutEntryID}-`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items ?? [];
  }
}
module.exports = DeleteWorkoutEntry;
