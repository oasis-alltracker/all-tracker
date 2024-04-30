class GetToDos {
  constructor(db) {
    this.DB = db;
  }

  async getToDos(user, queryStringParameters) {
    try {
      var toDos;

      if (queryStringParameters.dateStamp) {
        toDos = await this.getDueAndOverdueToDos(
          user.email,
          queryStringParameters.dateStamp
        );
        var toDosNoDueDate = await this.getNoDueDateToDos(user.email);
        toDos.push.apply(toDos, toDosNoDueDate);
      } else if (queryStringParameters.isComplete == "true") {
        toDos = await this.getAllToDos(user.email, true);
      } else if (queryStringParameters.isComplete == "false") {
        toDos = await this.getAllToDos(user.email, false);
      } else {
        throw new Error("Missing queryStringParameters");
      }

      return {
        statusCode: 200,
        body: JSON.stringify(toDos),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: "Request Failed",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }
  }

  async getDueAndOverdueToDos(user, dateStamp) {
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-toDo`,
      ":startDate": `${false}-$19`,
      ":endDate": `${false}-${dateStamp}.`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getNoDueDateToDos(user) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-toDo`,
      ":sk": `${false}-noDueDate`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getAllToDos(user, isComplete) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-toDo`,
      ":sk": `${isComplete}`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetToDos;
