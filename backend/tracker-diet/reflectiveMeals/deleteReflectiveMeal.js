class DeleteReflectiveMeal {
  constructor(db) {
    this.DB = db;
  }

  async deleteReflectiveMeal(user, reflectiveMealID) {
    try {
      await this.deleteEntry(user.email, reflectiveMealID);

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

  async deleteEntry(email, reflectiveMealID) {
    const key = { PK: `${email}-reflectiveMeal`, SK: reflectiveMealID };
    await this.DB.deleteItem(key);
  }
}
module.exports = DeleteReflectiveMeal;
