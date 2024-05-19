class DeleteHabit {
  constructor(db) {
    this.DB = db;
  }

  async deleteHabit(user, habitID) {
    try {
      await this.remove(user.email, habitID);

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

  async remove(email, habitID) {
    const key = { PK: `${email}-habit`, SK: habitID };
    await this.DB.deleteItem(key);
  }
}
module.exports = DeleteHabit;
