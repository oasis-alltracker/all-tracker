class CreateHabitStatus {
  constructor(db) {
    this.DB = db;
  }

  async createHabitStatus(user, body) {
    try {
      const response = await this.createStatus(user.email, body);

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

  async createStatus(email, habitStatus) {
    const data = {
      PK: `${email}-habitStatus`,
      SK: `${habitStatus.dateStamp}-${habitStatus.habitID}`,
      count: habitStatus.count,
      habitID: habitStatus.habitID,
      name: habitStatus.name,
      isPositive: habitStatus.isPositive,
      threshold: habitStatus.threshold,
      pngURL: habitStatus.pngURL,
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateHabitStatus;
