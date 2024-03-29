class UpdateToDo {
    constructor(db) {
      this.DB = db;
    }

    async updateToDo(user, toDoID, body) {
        try {
            await this.updateStatus(user.email, toDoID, body);

            return {
                statusCode: 200,
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
            };
        }
    }

    async updateStatus(email, toDoID, toDo) {
        const deleteKey = {PK: `${email}-toDo`, SK: `${toDo.prevSK}`};
        await this.DB.deleteItem(deleteKey);

        const data = {
            PK: `${email}-toDo`, 
            SK: `${toDo.isComplete}-${toDo.dateStamp}-${toDo.taskID}`,
            description: toDo.description,
            name: toDo.name,
            taskID: toDo.taskID,
            notifcations: toDo.notifcations
          };
    
        await this.DB.putItem(data);
    }
};
module.exports = UpdateToDo;