class GetNotifications {
  constructor(db) {
    this.DB = db;
  }

  async getNotifications(user) {
    try {
      const notifications = await this.getAll(user.email);

      return {
        statusCode: 200,
        body: JSON.stringify(notifications),
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

  async getAll(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-notification`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetNotifications;
