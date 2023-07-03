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
        const key = {PK: `${email}-taskStatus`, SK: toDoID};
        const expression =  'SET #isComplete = :isComplete, #name = :name, #priorityTag = :priorityTag, #isRecurring = :isRecurring';
        const names = {
            '#isComplete': 'isComplete',
            '#name': 'name',
            '#priorityTag': 'priorityTag',
            '#isRecurring': 'isRecurring',
        };
        const values = {
            ':isComplete': toDo.isComplete,
            ':name': toDo.name,
            ':priorityTag': toDo.priorityTag,   
            ':isRecurring': toDo.isRecurring,
        };
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateToDo;