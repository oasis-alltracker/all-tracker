class GetWellnessStats {
  constructor(db) {
    this.DB = db;
  }

  async getWellnessStats(user, day) {
    var response = [];
    try {
      for (var i = 0; i < 7; i++) {
        const wellnessReportsForDay = await this.getWellnessReportsForDay(
          user.email,
          (day + i).toString()
        );

        var total = 0;
        for (var report of wellnessReportsForDay) {
          total += report.feeling;
        }

        var rating = 0;
        if (wellnessReportsForDay.length > 0) {
          rating = (total * 1.0) / wellnessReportsForDay.length;
        }
        response.push({
          rating: rating,
        });
      }
      return {
        statusCode: 200,
        body: JSON.stringify(response),
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

  async getWellnessReportsForDay(user, dateStamp) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk) ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-wellnessReport`,
      ":sk": dateStamp,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetWellnessStats;
