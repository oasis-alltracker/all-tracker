class GetSleepStats {
  constructor(db) {
    this.DB = db;
  }

  async getSleepStats(user, day) {
    var response = [];
    try {
      for (var i = 0; i < 7; i++) {
        const sleepReportsForDay = await this.getSleepReportsForDay(
          user.email,
          (day + i).toString()
        );

        var total = 0;
        for (var report of sleepReportsForDay) {
          total += report.rating;
        }

        var rating = 0;
        if (sleepReportsForDay.length > 0) {
          rating = (total * 1.0) / sleepReportsForDay.length;
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

  async getSleepReportsForDay(user, dateStamp) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk) ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-sleepReport`,
      ":sk": dateStamp,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetSleepStats;
