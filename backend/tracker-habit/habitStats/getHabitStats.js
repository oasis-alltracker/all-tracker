class GetHabitStats {
  constructor(db) {
    this.DB = db;
  }

  async getHabitStats(user, day) {
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
        const habits = await this.getHabits(user.email);
        const habitStatuses = await this.getHabitStatusListForDay(
          user.email,
          dateSK.toString()
        );

        for (var habitEntry of habits) {
          const statusSK = `${dateSK}-${habitEntry.SK}`;
          var habitStatus = habitStatuses.find(
            (status) => status.SK === statusSK
          );

          if (habitStatus !== undefined) {
            habitEntry.count = habitStatus.count;
            habitEntry.SK = statusSK;
            var removeIndex = habitStatuses
              .map((status) => status.SK)
              .indexOf(statusSK);
            ~removeIndex && habitStatuses.splice(removeIndex, 1);
          }
        }
        habits.push.apply(habits, habitStatuses);

        var completionCount = 0;
        for (var habitStatus of habits) {
          if (habitStatus.isPositive) {
            if (habitStatus.count >= habitStatus.threshold) {
              completionCount++;
            }
          } else {
            if (
              habitStatus.count === undefined ||
              habitStatus.count < habitStatus.threshold
            ) {
              completionCount++;
            }
          }
        }
        response.push({
          completions: completionCount,
          habitCount: habits.length,
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

  async getHabits(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-habit`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
  async getHabitStatusListForDay(user, dateStamp) {
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
}
module.exports = GetHabitStats;
