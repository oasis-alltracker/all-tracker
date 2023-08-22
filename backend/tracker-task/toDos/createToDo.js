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
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
              }
          };
      }
      
      catch (e) {
          console.log(e);
          return {
              statusCode: 500,
              body: JSON.stringify("Request failed"),
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
              }
          }
      }
  }

  async create(email, taskStatus) {
      const data = {
        PK: `${email}-taskStatus`, 
        SK: `${taskStatus.dateStamp}-${taskStatus.taskID}`,
        isComplete: taskStatus.count,
        name: taskStatus.name,
        taskID: taskStatus.taskID
      };

      await this.DB.putItem(data);
      return {ID: data.SK};
  }
};
module.exports = CreateToDo;   
