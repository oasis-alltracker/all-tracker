class DeleteTask {
    constructor(db) {
      this.DB = db;
    }

    async deleteTask(user, taskID) {
        
        try {
            await this.remove(user.email, taskID);

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

    async remove(email, taskID) {
        const key = {PK: `${email}-task`, SK: taskID};
        await this.DB.deleteItem(key);
    }
};
module.exports = DeleteTask;   