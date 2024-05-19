class DeleteHabitStatus {
  constructor(db) {
    this.DB = db;
  }

  async deleteHabitStatus(user, habitStatusID) {
    try {
      await this.deleteStatus(user.email, habitStatusID);

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

  async deleteStatus(email, habitStatusID) {
    const key = { PK: `${email}-habitStatus`, SK: habitStatusID };
    await this.DB.deleteItem(key);
  }
}
module.exports = DeleteHabitStatus;
