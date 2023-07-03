class DeleteToDo {
    constructor(db) {
      this.DB = db;
    }

    async deleteToDo(user, toDoID) {
        try {
            await this.delete(user.email, toDoID);

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

    async delete(email, toDoID) {
        const key = {PK: `${email}-taskStatus`, SK: toDoID};
        await this.DB.deleteItem(key);
    }
};
module.exports = DeleteToDo;   