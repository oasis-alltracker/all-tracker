class GetRecentEntries {
  constructor(db) {
    this.DB = db;
  }

  async getRecentEntries(user) {
    try {
      const foodEntries = await this.get(user.email);

      return {
        statusCode: 200,
        body: JSON.stringify(foodEntries),
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

  findUniqueEntries(entries) {
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

  async get(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
    };

    const response = await this.DB.queryItem(expression, names, values, 30);
    var foodItems = this.findUniqueEntries(response?.Items);
    return foodItems;
  }
}
module.exports = GetRecentEntries;
