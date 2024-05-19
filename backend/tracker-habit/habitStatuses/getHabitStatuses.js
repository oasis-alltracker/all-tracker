class GetHabitStatuses {
  constructor(db) {
    this.DB = db;
  }

  async getHabitStatuses(user, queryStringParameters) {
    try {
      var habitStatuses;
      if (queryStringParameters.dateStamp) {
        habitStatuses = await this.getStatusesForOneDay(
          user.email,
          queryStringParameters.dateStamp,
        );
      } else if (
        queryStringParameters.startDate &&
        queryStringParameters.endDate
      ) {
        habitStatuses = await this.getStatusesForMulitpleDays(
          user.email,
          queryStringParameters.startDate,
          queryStringParameters.endDate,
        );
      } else {
        throw new Error("Missing queryStringParameters");
      }
      return {
        statusCode: 200,
        body: JSON.stringify(habitStatuses),
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

  async getStatusesForOneDay(user, dateStamp) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk) ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-habitStatus`,
      ":sk": dateStamp,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getStatusesForMulitpleDays(user, startDate, endDate) {
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-habitStatus`,
      ":startDate": `${startDate}`,
      ":endDate": `${endDate}`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetHabitStatuses;
