class UpdateHabitStatus {
    constructor(db) {
      this.DB = db;
    }

    async updateHabitStatus(user, habitStatusID, body) {
        try {
            await this.updateStatus(user.email, habitStatusID, body);

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

    async updateStatus(email, habitStatusID, habitStatus) {
        const key = {PK: `${email}-habitStatus`, SK: habitStatusID};
        const expression =  'SET #count = :count';
        const names = {
            '#count': 'count',
        };
        const values = {
            ':count': habitStatus.count,
  
        };
        
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateHabitStatus;