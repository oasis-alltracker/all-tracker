class DeleteFoodEntry {
  constructor(db) {
    this.DB = db;
  }

  async deleteFoodEntry(user, foodEntryID) {
    try {
      await this.deleteEntry(user.email, foodEntryID);

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

  async deleteEntry(email, SK) {
    const key = { PK: `${email}-foodEntry`, SK: SK };
    await this.DB.deleteItem(key);
  }
}
module.exports = DeleteFoodEntry;
