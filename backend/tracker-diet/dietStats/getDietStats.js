const moment = require("moment");

class GetDietStats {
  constructor(db) {
    this.DB = db;
  }

  calcMacrosByDate(entries) {
    var result = {};

    entries.forEach((item) => {
      console.log(item);
      const key = item.SK.substring(0, 8); //or .split('-')[0]
      console.log(key);
      if (!result[key]) {
        result[key] = {
          calorieCount: 0,
          fatCount: 0,
          proteinCount: 0,
          carbCount: 0,
        };
      }

      //adding it as an integer (as it will have 2 decimal points at most)
      result[key]["calorieCount"] += item.calorieCount * 100;
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

  generateMacroArrays(sunday, entries) {
    var result = {
      calorieCount: [],
      carbCount: [],
      proteinCount: [],
      fatCount: [],
    };
    for (var i = 0; i < 7; i++) {
      var day = sunday.add(i, "days");
      day = day.format("YYYYMMDD");
      console.log(day);
      if (!entries[day]) {
        for (const key in result) {
          result[key].push({ value: 0 });
        }
      } else {
        for (const key in result) {
          result[key].push({ value: entries[day][key] });
        }
      }
    }

    return result;
  }

  async getDietStats(user, day) {
    try {
      if (day) {
        //idea: we pass in the sunday, get the entries between sunday and the
        //upcoming saturday, then create an array of entries for each day
        //then for each day, calculate the macro totals
        //return the array of macro totals
        var sunday = moment(day, "YYYYMMDD");
        var saturday = moment(day, "YYYYMMDD").add(7, "days");
        var entries = await this.getEntriesForOneWeek(
          user.email,
          sunday.format("YYYYMMDD"),
          saturday.format("YYYYMMDD")
        );

        console.log(entries); //works

        entries = this.calcMacrosByDate(entries);
        console.log(entries);
        const macroArrays = this.generateMacroArrays(sunday, entries);

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
    console.log("expression \n" + expression);
    console.log("names \n" + JSON.stringify(names));
    console.log("values \n" + JSON.stringify(values));

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetDietStats;
