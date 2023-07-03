class DeleteExerciseEntry {
    constructor(db) {
      this.DB = db;
    }

    async deleteExerciseEntry(user, exerciseEntryID) {
        
        try {
            await this.delete(user.email, exerciseEntryID);

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

    async delete(email, exerciseEntryID) {
        const key = {PK: `${email}-exerciseEntry`, SK: exerciseEntryID};
        await this.DB.deleteItem(key);
    }
};
module.exports = DeleteExerciseEntry;   