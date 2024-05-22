class GetTaskStats {
  constructor(db) {
    this.DB = db;
  }

  async getTaskStats(user, day) {
    var response = [];
    try {
      for (var i = 0; i < 7; i++) {
        const completeToDos = await this.getTodosForDay(
          user.email,
          (day + i).toString(),
          true
        );
        const incompleteToDos = await this.getTodosForDay(
          user.email,
          (day + i).toString(),
          false
        );

        var completionCount = completeToDos.length;
        var taskCount = completeToDos.length + incompleteToDos.length;

        response.push({
          completionCount: completionCount,
          taskCount: taskCount,
        });
      }

      var tasks = await this.getTasks(user.email);
      for (var task of tasks) {
        for (var completionDate of task.completionList) {
          if (completionDate >= day && completionDate < day + 7) {
            response[completionDate - day].completionCount += 1;
            response[completionDate - day].taskCount += 1;
          }
        }
        if (task.nextDueDate >= day && task.nextDueDate < day + 7) {
          response[task.nextDueDate - day].taskCount += 1;
        }
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

  async getTasks(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-task`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
  async getTodosForDay(user, dateStamp, isComplete) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk) ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-toDo`,
      ":sk": `${isComplete}-${dateStamp}`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
}
module.exports = GetTaskStats;
