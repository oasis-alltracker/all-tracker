class UpdateToDo {
  constructor(db) {
    this.DB = db;
  }

  async updateToDo(user, toDoID, body) {
    try {
      var completionDate = "20240304";
      if (body.completionDate) {
        completionDate = body.completionDate;
      }
      await this.updateStatus(user.email, toDoID, body, completionDate);

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

  async updateStatus(email, toDoID, toDo, completionDate) {
    const deleteKey = { PK: `${email}-toDo`, SK: `${toDoID}` };
    await this.DB.deleteItem(deleteKey);

    const data = {
      PK: `${email}-toDo`,
      SK: `${toDo.isComplete}-${toDo.dateStamp}-${toDo.toDoID}`,
      description: toDo.description,
      name: toDo.name,
      toDoID: toDo.toDoID,
      dateStamp: toDo.dateStamp,
      isComplete: toDo.isComplete,
      completionDate: completionDate,
    };

    await this.DB.putItem(data);
  }
}
module.exports = UpdateToDo;
