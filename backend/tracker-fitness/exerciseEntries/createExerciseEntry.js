class CreateExerciseEntry {
  constructor(db) {
    this.DB = db;
  }

  async createExerciseEntry(user, body) {
    try {
      const response = await this.createEntry(user.email, body);

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

  async createEntry(email, exerciseEntry) {
    const data = {
      PK: `${email}-exerciseEntry`,
      SK: `${exerciseEntry.workoutEntryID}-${exerciseEntry.exerciseID}`,
      name: exerciseEntry.name,
      sets: exerciseEntry.sets,
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateExerciseEntry;
