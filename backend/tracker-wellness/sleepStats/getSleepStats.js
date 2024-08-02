class GetSleepStats {
  constructor(db) {
    this.DB = db;
  }

  async getSleepStats(user, day) {
    var response = [];
    var sunday = day.toString();
    var year = sunday.substring(0, 4);
    var month = sunday.substring(4, 6);
    var day = sunday.substring(6, 8);
    var daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    try {
      for (var i = 0; i < 7; i++) {
        var currentDay = parseInt(day) + i;
        var currentMonth = parseInt(month);
        var currentYear = parseInt(year);
        if (currentDay > daysInMonth) {
          currentDay = currentDay - daysInMonth;
          if (parseInt(month) + 1 > 12) {
            currentMonth = 1;
            currentYear = parseInt(year) + 1;
          } else {
            currentMonth = parseInt(month) + 1;
          }
        }
        if (currentDay <= 9) {
          currentDay = "0" + currentDay;
        }
        if (currentMonth <= 9) {
          currentMonth = "0" + currentMonth;
        }
        var dateSK = parseInt(`${currentYear}${currentMonth}${currentDay}`);
        const sleepReportsForDay = await this.getSleepReportsForDay(
          user.email,
          dateSK.toString()
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
