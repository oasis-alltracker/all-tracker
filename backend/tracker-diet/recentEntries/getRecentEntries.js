class GetRecentEntries {
  constructor(db) {
    this.DB = db;
  }

  async getRecentEntries(user) {
    try {
      await this.get(user);
      foodEntries = "hi";

      return {
        statusCode: 200,
        body: JSON.stringify(sums),
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

  findUniqueEntries(entries){
    var result = {}
    var count =0;
    entries.forEach(item => {
      const key = item.name;
      if(!result[key] && count<10)
      {
        result[key] = item;
        count ++;
      }
    });

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

    return sums;
  }
}
module.exports = GetRecentEntries;
