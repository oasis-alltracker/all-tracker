const { v1: uuidv1 } = require('uuid');

class CreateHabit {
    constructor(db) {
        this.DB = db;
    }

    async createHabit(user, body) {      
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
            }
        }
    }

    async create(email, habit) {
        const habitID = uuidv1();

        const data = {
          PK: `${email}-habit`, 
          SK: `${habitID}`,
          name: habit.name,
          isPositive: habit.isPositive,
          threshold: habit.threshold,
        };

        await this.DB.putItem(data);
        return {ID: data.SK}
    }
};
module.exports = CreateHabit;   
