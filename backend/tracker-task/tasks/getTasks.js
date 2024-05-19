class GetTasks {
  constructor(db) {
    this.DB = db;
  }

  async getTasks(user) {
    try {
      const tasks = await this.get(user.email);

      return {
        statusCode: 200,
        body: JSON.stringify(tasks),
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

  async get(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-task`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetTasks;
