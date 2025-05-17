const { v1: uuidv1 } = require("uuid");

class CreateFoodEntry {
  constructor(db) {
    this.DB = db;
  }

  async createFoodEntry(user, body) {
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

  async createEntry(email, foodEntry) {
    const foodEntryID = uuidv1();

    const data = {
      PK: `${email}-foodEntry`,
      SK: `${foodEntry.dateStamp}-${foodEntryID}`,
      name: foodEntry.name,
      meal: foodEntry.meal,
      foodItemID: foodEntry.foodItemID,
      calorieCount: foodEntry.calorieCount,
      fatCount: foodEntry.fatCount,
      proteinCount: foodEntry.proteinCount,
      carbCount: foodEntry.carbCount,
      quantity: foodEntry.quantity,
      measurement: foodEntry.measurement,
    };

    await this.DB.putItem(data);

    return { ID: data.SK };
  }
}
module.exports = CreateFoodEntry;
