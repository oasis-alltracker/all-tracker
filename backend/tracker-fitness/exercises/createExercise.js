const { v1: uuidv1 } = require('uuid');

class CreateExercise {
    constructor(db) {
        this.DB = db;
    }

    async createExercise (user, body) {      
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
            };
        }
    }

    async create(email, exercise) {
        const exerciseID = uuidv1();

        const data = {
          PK: `${email}-exercise`, 
          SK: `${exercise.workoutPlanID}-${exerciseID}`,
          name: exercise.name,
          type: exercise.type,
          muscle: exercise.muscle,
          equipment: exercise.equipment,
          difficulty: exercise.difficulty,
          instructions: exercise.instructions,
          sets: exercise.sets
        };

        await this.DB.putItem(data);
        return {ID: data.SK};
    }
};
module.exports = CreateExercise;
