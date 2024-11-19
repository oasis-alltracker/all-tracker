const { v1: uuidv1 } = require("uuid");

class CreateTask {
  constructor(db) {
    this.DB = db;
  }

  async createTask(user, body) {
    try {
      const response = await this.create(user.email, body);

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

  async create(email, task) {
    const taskID = uuidv1();

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

    const nextDueDate = `${nextDueDateYear}${nextDueDateMonth}${nextDueDateDay}`;

    const data = {
      PK: `${email}-task`,
      SK: `${taskID}`,
      name: task.name,
      schedule: task.schedule,
      description: task.description,
      completionList: [],
      nextDueDate: nextDueDate,
    };

    await this.DB.putItem(data);
    return { ID: taskID };
  }
}
module.exports = CreateTask;
