class GetNotification {
  constructor(db) {
    this.DB = db;
  }

  async getNotification(user, notificationID) {
    try {
      const notification = await this.getItem(user.email, notificationID);

      return {
        statusCode: 200,
        body: JSON.stringify(notification),
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

  async getItem(user, notificationID) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-notification`,
      ":sk": notificationID,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetNotification;
