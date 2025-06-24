class GetMealMacros {
  constructor(db) {
    this.DB = db;
  }

  calcSums(response) {
    var result = {};

    response.forEach((item) => {
      const key = item.meal;

      if (!result[key]) {
        result[key] = {
          calorieCount: 0,
          fatCount: 0,
          proteinCount: 0,
          carbCount: 0,
          entries: [],
        };
      }

      //adding it as an integer (as it will have 2 decimal points at most)
      result[key]["calorieCount"] += item.calorieCount * 100;
      result[key]["fatCount"] += item.fatCount * 100;
      result[key]["carbCount"] += item.carbCount * 100;
      result[key]["proteinCount"] += item.proteinCount * 100;
      result[key]["entries"].push(item);
    });

    //converting final result back to decimal format
    for (const key in result) {
      result[key]["calorieCount"] = result[key]["calorieCount"] / 100;
      result[key]["fatCount"] = result[key]["fatCount"] / 100;
      result[key]["carbCount"] = result[key]["carbCount"] / 100;
      result[key]["proteinCount"] = result[key]["proteinCount"] / 100;
    }

    return result;
  }

  async getMealMacros(user, queryStringParameters) {
    try {
      var sums;
      if (queryStringParameters.dateStamp && queryStringParameters.meal) {
        sums = await this.getSumsForOneMeal(
          user.email,
          queryStringParameters.dateStamp,
          queryStringParameters.meal
        );
      } else if (queryStringParameters.dateStamp) {
        sums = await this.getSumsForOneDay(
          user.email,
          queryStringParameters.dateStamp
        );
      } else {
        throw new Error("Missing queryStringParameters");
      }

      return {
        statusCode: 200,
        body: JSON.stringify(sums),
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

  async getSumsForOneDay(user, dateStamp) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk) ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
      ":sk": dateStamp,
    };

    const response = await this.DB.queryItem(expression, names, values);
    var sums = this.calcSums(response?.Items);

    return sums;
  }

  async getSumsForOneMeal(user, dateStamp, meal) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-foodEntry`,
      ":sk": `${dateStamp}-${meal}`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    const sums = this.calcSums(response?.Items);

    return sums;
  }
}
module.exports = GetMealMacros;
