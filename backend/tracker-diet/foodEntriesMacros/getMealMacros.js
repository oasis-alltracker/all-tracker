class GetMealMacros {
    constructor(db) {
      this.DB = db;
    }

    calcSums(response)
    {
      var result = {};

      response.forEach(item => {
          const key = item.meal;
          
          if(!result[key]){
            result[key] = {
              calorieCount: 0,
              fatCount: 0,
              proteinCount: 0,
              carbCount: 0,
            }
          }
          result[key]["calorieCount"] += item.calorieCount;
          result[key]["fatCount"] += item.fatCount;
          result[key]["carbCount"] += item.carbCount;
          result[key]["proteinCount"] += item.proteinCount;
      });

      return result;
    }
  
    async getMealMacros(user, queryStringParameters) {
      try {
        var sums;
        if (queryStringParameters.dateStamp && queryStringParameters.meal) {
          sums = await this.getSumsForOneMeal(
            user.email,
            queryStringParameters.dateStamp,
            queryStringParameters.meal,
          );
        } else if (
            queryStringParameters.dateStamp 
        ) {
          sums = await this.getSumsForOneDay(
            user.email,
            queryStringParameters.dateStamp,
          );
        } else{
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

      return [sums, response?.Items];
    }
  
    async getSumsForOneMeal(user, dateStamp, meal) {
      const expression = "#pk = :pk AND begins_with(#sk, :sk)";
      const filters = "#meal = :meal"
      const names = {
        "#pk": "PK",
        "#sk": "SK",
        "#meal": "meal"
      };
      const values = {
        ":pk": `${user}-foodEntry`,
        ":sk": dateStamp,
        ":meal": meal,
      };
      
      const response = await this.DB.queryItem(expression, names, values, filters);
      const sums = this.calcSums(response?.Items);

      return [sums, response?.Items];
    }
  }
  module.exports = GetMealMacros;
  