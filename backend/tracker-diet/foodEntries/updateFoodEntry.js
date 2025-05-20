class UpdateFoodEntry {
  constructor(db) {
    this.DB = db;
  }

  async updateFoodEntry(user, foodEntryID, body) {
    try {
      await this.updateEntry(user.email, foodEntryID, body);

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

  async updateEntry(email, foodEntryID, foodEntry) {
    const key = { PK: `${email}-foodEntry`, SK: foodEntryID };
    const expression =
      "SET #name = :name, #calorieCount = :calorieCount, #proteinCount = :proteinCount, #fatCount = :fatCount, #carbCount = :carbCount, #quantity = :quantity, #measurement = :measurement, #foodItemID = :foodItemID";
    const names = {
      "#name": "name",
      "#calorieCount": "calorieCount",
      "#fatCount": "fatCount",
      "#proteinCount": "proteinCount",
      "#carbCount": "carbCount",
      "#quantity": "quantity",
      "#measurement": "measurement",
      "#foodItemID": "foodItemID",
    };
    const values = {
      ":name": foodEntry.name,
      ":calorieCount": foodEntry.calorieCount,
      ":fatCount": foodEntry.fatCount,
      ":proteinCount": foodEntry.proteinCount,
      ":carbCount":foodEntry.carbCount,
      ":quantity": foodEntry.quantity,
      ":measurement": foodEntry.measurement,
      ":foodItemID": foodEntry.foodItemID,
    };

    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateFoodEntry;
