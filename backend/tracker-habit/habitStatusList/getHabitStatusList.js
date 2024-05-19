class GetHabitStatusList {
  constructor(db) {
    this.DB = db;
  }

  async getHabitStatusList(user, dateStamp) {
    try {
      const habits = await this.getHabits(user.email);
      const habitStatuses = await this.getHabitStatusListForDay(
        user.email,
        dateStamp,
      );

      for (var habitEntry of habits) {
        const statusSK = `${dateStamp}-${habitEntry.SK}`;
        var habitStatus = habitStatuses.find(
          (status) => status.SK === statusSK,
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

      return {
        statusCode: 200,
        body: JSON.stringify(habits),
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
module.exports = GetHabitStatusList;
