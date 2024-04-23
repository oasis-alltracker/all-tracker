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
      ":completionList": task.completionList,
      ":nextDueDate": task.nextDueDate,
    };
    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateTask;
