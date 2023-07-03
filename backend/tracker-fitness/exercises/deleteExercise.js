class DeleteExercise {
    constructor(db) {
      this.DB = db;
    }

    async deleteExercise(user, exerciseID) {
        
        try {
            await this.delete(user.email, exerciseID);

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

    async delete(email, exerciseID) {
        const key = {PK: `${email}-exercise`, SK: exerciseID};
        await this.DB.deleteItem(key);
    }
};
module.exports = DeleteExercise;   