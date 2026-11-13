class GetSeasons {
  constructor(db) {
    this.DB = db;
  }

  async getSeasons(user, queryStringParameters) {
    try {
      var seasons;
      if (queryStringParameters?.startDate && queryStringParameters?.endDate) {
        seasons = await this.getSeasonsForMultipleDays(
          user.email,
          queryStringParameters.startDate,
          queryStringParameters.endDate,
        );
      } else {
        seasons = await this.getAllSeasons(user.email);
      }

      return {
        statusCode: 200,
        body: JSON.stringify(seasons),
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

  async getSeasonsForMultipleDays(user, startDate, endDate) {
    // SK is `${dateStamp}-${seasonID}`, so the end bound needs a suffix to
    // include seasons started on endDate itself.
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-season`,
      ":startDate": `${startDate}`,
      ":endDate": `${endDate}-~`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getAllSeasons(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-season`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetSeasons;
