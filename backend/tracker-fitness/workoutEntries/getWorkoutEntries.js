class GetWorkoutEntries {
  constructor(db) {
    this.DB = db;
  }

  async getWorkoutEntries(user, queryStringParameters) {
    try {
      var workoutEntries;
      if (queryStringParameters.dateStamp) {
        workoutEntries = await this.getEntriesForOneDay(
          user.email,
          queryStringParameters.dateStamp,
        );
      } else if (
        queryStringParameters.startDate &&
        queryStringParameters.endDate
      ) {
        workoutEntries = await this.getEntriesForMulitpleDays(
          user.email,
          queryStringParameters.startDate,
          queryStringParameters.endDate,
        );
      } else {
        throw new Error("Missing queryStringParameters");
      }

      return {
        statusCode: 200,
        body: JSON.stringify(workoutEntries),
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
      ":pk": `${user}-workoutEntry`,
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
      ":pk": `${user}-workoutEntry`,
      ":startDate": `${startDate}`,
      ":endDate": `${endDate}`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getAllWorkoutEntries(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-workoutEntry`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetWorkoutEntries;
