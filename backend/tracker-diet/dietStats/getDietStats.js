const moment = require("moment");

class GetDietStats {
  constructor(db) {
    this.DB = db;
  }

  static calcMacrosByDate(entries) {
    var result = {};

    entries.forEach((item) => {
      const key = item.SK.substring(0, 8);
      if (!result[key]) {
        result[key] = {
          calorieCount: 0,
          fatCount: 0,
          proteinCount: 0,
          carbCount: 0,
        };
      }

      result[key]["calorieCount"] += item.calorieCount * 100; //multiplying by 100 so it can add as an integer
      result[key]["fatCount"] += item.fatCount * 100;
      result[key]["carbCount"] += item.carbCount * 100;
      result[key]["proteinCount"] += item.proteinCount * 100;
    });

    for (const key in result) {
      result[key]["calorieCount"] = result[key]["calorieCount"] / 100;
      result[key]["fatCount"] = result[key]["fatCount"] / 100;
      result[key]["carbCount"] = result[key]["carbCount"] / 100;
      result[key]["proteinCount"] = result[key]["proteinCount"] / 100;
    }

    return result;
  }

  static generateMacroArrays(sunday, entries) {
    var result = {
      calorieCount: [],
      carbCount: [],
      proteinCount: [],
      fatCount: [],
    };
    for (var i = 0; i < 7; i++) {
      var day = moment(sunday);
      day = day.add(i, "days").format("YYYYMMDD");
      if (!entries[day]) {
        for (const key in result) {
          result[key].push({ value: 0, date: day });
        }
      } else {
        for (const key in result) {
          result[key].push({ value: entries[day][key], date: day });
        }
      }
    }

    return result;
  }

  async getDietStats(user, day) {
    try {
      if (day) {
        var sunday = moment(day, "YYYYMMDD");
        var saturday = moment(day, "YYYYMMDD").add(7, "days");
        var entries = await this.getEntriesForOneWeek(
          user.email,
          sunday.format("YYYYMMDD"),
          saturday.format("YYYYMMDD")
        );

        const macros = GetDietStats.calcMacrosByDate(entries);
        const macroArrays = GetDietStats.generateMacroArrays(sunday, macros);

        return {
          statusCode: 200,
          body: JSON.stringify(macroArrays),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      } else {
        throw new Error("Missing sunday parameter");
      }
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

  async getEntriesForOneWeek(user, start_date, end_date) {
    const expression = "#pk = :pk AND #sk BETWEEN :sk_start AND :sk_end";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
      ":sk_start": start_date,
      ":sk_end": end_date,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = {
  GetDietStats: GetDietStats,
  calcMacrosByDate: GetDietStats.calcMacrosByDate,
};
