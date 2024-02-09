class GetExerciseEntries {
    constructor(db) {
      this.DB = db;
    }

    async getExerciseEntries(user, queryStringParameters) {
        try {
            var exerciseEntries;
            if(queryStringParameters.workoutEntryID){
                exerciseEntries = await this.getEntries(user.email, queryStringParameters.workoutEntryID);
            }
            else{
                throw new Error("Missing queryStringParameters");
            }
            
            return {
                statusCode: 200,
                body: JSON.stringify(exerciseEntries),
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

    async getEntries(user, workoutEntryID) {
        const expression =  '#pk = :pk AND begins_with(#sk, :sk)';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK'
        };
        const values = {
            ':pk': `${user}-exerciseEntry`,
            ':sk': workoutEntryID
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }

    async getAllExerciseEntries(user) {
        const expression =  '#pk = :pk';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK'
        };
        const values = {
            ':pk': `${user}-exerciseEntry`,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }

}
module.exports = GetExerciseEntries;