class DeleteFoodItem {
  constructor(db) {
    this.DB = db;
  }

  async deleteFoodItem(user, foodItemID) {
    try {
      await this.deleteItem(user.email, foodItemID);

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

  async deleteItem(email, foodItemID) {
    const key = { PK: `${email}-foodItem`, SK: foodItemID };
    await this.DB.deleteItem(key);
  }
}
module.exports = DeleteFoodItem;
