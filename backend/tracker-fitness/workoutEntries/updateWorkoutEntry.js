class UpdateWorkoutEntry {
    constructor(db) {
      this.DB = db;
    }

    async updateWorkoutEntry(user, workoutEntryID, body) {
        try {
            await this.updateEntry(user.email, workoutEntryID, body);

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

    async updateEntry(email, workoutEntryID, workoutEntry) {
        const key = {PK: `${email}-workoutEntry`, SK: workoutEntryID};
        const expression =  'SET #exerciseEntryIDs = :exerciseEntryIDs';
        const names = {
            '#exerciseEntryIDs': 'exerciseEntryIDs',
        };
        const values = {
            ':exerciseEntryIDs': workoutEntry.exerciseEntryIDs,
        };
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateWorkoutEntry;