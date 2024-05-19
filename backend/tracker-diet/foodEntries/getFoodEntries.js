class GetFoodEntries {
  constructor(db) {
    this.DB = db;
  }

  async getFoodEntries(user, queryStringParameters) {
    try {
      var foodEntries;
      if (queryStringParameters.dateStamp) {
        foodEntries = await this.getEntriesForOneDay(
          user.email,
          queryStringParameters.dateStamp,
        );
      } else if (
        queryStringParameters.startDate &&
        queryStringParameters.endDate
      ) {
        foodEntries = await this.getEntriesForMulitpleDays(
          user.email,
          queryStringParameters.startDate,
          queryStringParameters.endDate,
        );
      } else {
        throw new Error("Missing queryStringParameters");
      }
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

  async getEntriesForOneDay(user, dateStamp) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk) ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
      ":sk": dateStamp,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getEntriesForMulitpleDays(user, startDate, endDate) {
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
      ":startDate": `${startDate}`,
      ":endDate": `${endDate}`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getAllFoodEntries(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetFoodEntries;
