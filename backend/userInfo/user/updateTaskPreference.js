class UpdateTaskPreference {
    constructor(db) {
      this.DB = db;
    }

    async updateTaskPreference(user, body) {
        try {
            await this.updateInfo(user.email, body);

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

    async updateInfo(email, userInfo) {
        const key = {PK: `${email}`, SK: `${email}`};
        const expression =  'SET #taskPreference = :taskPreference';
        const names = {
            '#taskPreference': 'taskPreference',
        };
        const values = {
            ':taskPreference': userInfo.taskPreference,  
        };
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateTaskPreference;