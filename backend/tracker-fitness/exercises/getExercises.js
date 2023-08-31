class GetExercises {
    constructor(db) {
      this.DB = db;
    }

    async getExercises(user, queryStringParameters) {
        try {
            var exercises;
            if(queryStringParameters.workoutPlanID){
                exercises = await this.get(user.email, queryStringParameters.workoutPlanID);
            }
            else{
                throw new Error("Missing queryStringParameters");
            }
 
            return {
                statusCode: 200,
                body: JSON.stringify(exercises),
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

    async get(user, workoutPlanID) {
        const expression =  '#pk = :pk AND begins_with(#sk, :sk)';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK',
        };
            const values = {
            ':pk': `${user}-exercise`,
            ':sk': workoutPlanID,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}
module.exports = GetExercises;