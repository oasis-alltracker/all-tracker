class GetReflectiveMeals {
  constructor(db) {
    this.DB = db;
  }

  async getReflectiveMeals(user, queryStringParameters) {
    try {
      var reflectiveMeals;
      if (queryStringParameters?.dateStamp) {
        reflectiveMeals = await this.getEntriesForOneDay(
          user.email,
          queryStringParameters.dateStamp,
        );
      } else if (
        queryStringParameters?.startDate &&
        queryStringParameters?.endDate
      ) {
        reflectiveMeals = await this.getEntriesForMultipleDays(
          user.email,
          queryStringParameters.startDate,
          queryStringParameters.endDate,
        );
      } else {
        throw new Error("Missing queryStringParameters");
      }

      return {
        statusCode: 200,
        body: JSON.stringify(reflectiveMeals),
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
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-reflectiveMeal`,
      ":sk": `${dateStamp}-`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getEntriesForMultipleDays(user, startDate, endDate) {
    // SK is `${dateStamp}-${reflectiveMealID}`, so the end bound needs a suffix
    // to include meals logged on endDate itself.
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-reflectiveMeal`,
      ":startDate": `${startDate}`,
      ":endDate": `${endDate}-~`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetReflectiveMeals;
