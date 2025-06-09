class GetRecentEntries {
  constructor(db) {
    this.DB = db;
  }

  async getRecentEntries(user) {
    try {
      const response = await this.getFoodEntries(user.email);
      //const foodItems = findUniqueEntries(response);
      const foodItems = GetRecentEntries.findUniqueEntries(response);

      return {
        statusCode: 200,
        body: JSON.stringify(foodItems),
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

  static findUniqueEntries(entries) {
    var resultNames = {};
    var result = [];
    var count = 0;
    var i;
    for (i = 0; i < entries.length && count < 10; i++) {
      const key = entries[i].name;
      if (!resultNames[key]) {
        resultNames[key] = 1;
        result.push(entries[i]);
        count++;
      }
    }
    return result;
  }

  async getFoodEntries(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
    };

    const response = await this.DB.queryItem(
      expression,
      names,
      values,
      30,
      false
    );
    return response.Items;
  }
}
module.exports = {
  GetRecentEntries: GetRecentEntries,
  findUniqueEntries: GetRecentEntries.findUniqueEntries,
};
