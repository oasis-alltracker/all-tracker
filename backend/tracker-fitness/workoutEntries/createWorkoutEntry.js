const { v1: uuidv1 } = require('uuid');

class CreateWorkoutEntry {
    constructor(db) {
        this.DB = db;
    }

    async createWorkoutEntry (user, body) {      
        try {
            const response = await this.createEntry(user.email, body);

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
            };
        }
    }

    async createEntry(email, workoutEntry) {
        const workoutEntryID = uuidv1();

        const data = {
          PK: `${email}-workoutEntry`, 
          SK: `${workoutEntry.dateStamp}-${workoutEntryID}`,
          time: workoutEntry.time,
          workoutPlanID: workoutEntry.workoutPlanID,
          exerciseIDs: workoutEntry.exerciseIDs,
        };

        await this.DB.putItem(data);
        return {ID: data.SK};
    }
};
module.exports = CreateWorkoutEntry;