class UpdateTask {
  constructor(db) {
    this.DB = db;
  }

  async updateTask(user, taskID, body) {
    try {
      await this.update(user.email, taskID, body);

      return {
        statusCode: 200,
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

  async update(email, taskID, task) {
    var nextDueDate = task.nextDueDate;
    var completionList = task.completionList;
    if (task.dateStamp) {
      var year = task.dateStamp.substring(0, 4);
      var month = task.dateStamp.substring(4, 6);
      var day = task.dateStamp.substring(6, 8);

      var lastCompletionDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      );
      var dayOfWeek = lastCompletionDate.getDay();
      var nextDayOfWeek = 0;
      for (var recurringDay of task.schedule) {
        if (recurringDay >= dayOfWeek) {
          nextDayOfWeek = recurringDay;
          break;
        }
      }
      if (nextDayOfWeek == 0) {
        nextDayOfWeek = task.schedule[0];
      }

      var dateChange = 0;

      //use brain cells please
      if (nextDayOfWeek > dayOfWeek) {
        dateChange = nextDayOfWeek - dayOfWeek;
      } else if (nextDayOfWeek != dayOfWeek) {
        dateChange = 7 - dayOfWeek + nextDayOfWeek;
      }
      lastCompletionDate.setDate(lastCompletionDate.getDate() + dateChange);

      var nextDueDateYear = lastCompletionDate.getFullYear().toString();
      var nextDueDateMonth = (lastCompletionDate.getMonth() + 1).toString();
      var nextDueDateDay = lastCompletionDate.getDate().toString();

      if (nextDueDateMonth.length == 1) {
        nextDueDateMonth = "0" + nextDueDateMonth;
      }
      if (nextDueDateDay.length == 1) {
        nextDueDateDay = "0" + nextDueDateDay;
      }

      nextDueDate = `${nextDueDateYear}${nextDueDateMonth}${nextDueDateDay}`;
      completionList = [];
    }

    const key = { PK: `${email}-task`, SK: taskID };
    const expression =
      "SET #name = :name, #schedule = :schedule, #description = :description, #completionList = :completionList, #nextDueDate = :nextDueDate";
    const names = {
      "#name": "name",
      "#schedule": "schedule",
      "#description": "description",
      "#completionList": "completionList",
      "#nextDueDate": "nextDueDate",
    };
    const values = {
      ":name": task.name,
      ":schedule": task.schedule,
      ":description": task.description,
      ":completionList": completionList,
      ":nextDueDate": nextDueDate,
    };
    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateTask;
