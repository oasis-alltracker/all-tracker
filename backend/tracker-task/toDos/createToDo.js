class CreateToDo {
  constructor(db) {
    this.DB = db;
  }

  async createToDo(user, body) {
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

  async create(email, toDo) {
    const data = {
      PK: `${email}-toDo`,
      SK: `${false}-${toDo.dateStamp}-${toDo.taskID}`,
      description: toDo.description,
      name: toDo.name,
      toDoID: toDo.toDoID,
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateToDo;
