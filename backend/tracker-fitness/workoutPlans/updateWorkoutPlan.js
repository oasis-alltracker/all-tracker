class UpdateWorkoutPlan {
    constructor(db) {
      this.DB = db;
    }

    async updateWorkoutPlan(user, workoutPlanID, body) {
        try {
            await this.updatePlan(user.email, workoutPlanID, body);

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

    async updatePlan(email, workoutPlanID, workoutPlan) {
        const key = {PK: `${email}-workoutPlan`, SK: workoutPlanID};
        const expression =  'SET #name = :name, #exerciseIDs = :exerciseIDs';
        const names = {
            '#name': 'name',
            '#exerciseIDs': 'exerciseIDs',
        };
        const values = {
            ':name': workoutPlan.name,
            ':exerciseIDs': workoutPlan.exerciseIDs,      
        };
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateWorkoutPlan;