const { v1: uuidv1 } = require('uuid');

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

    async create(email, task) {
      const taskID = uuidv1();

      const data = {
        PK: `${email}-task`, 
        SK: `${taskID}`,
        name: task.name,
        schedule: task.schedule,
        isRecurring: task.isRecurring,
      };

      await this.DB.putItem(data);
      return {ID: data.SK};
    }
};
module.exports = CreateTask;   
