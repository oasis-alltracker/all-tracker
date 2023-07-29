class UpdateUser {
    constructor(db) {
      this.DB = db;
    }

    async updateUser(user, body) {
        console.log("BODY is ", body)
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
        const expression =  'SET #isSetupComplete = :isSetupComplete, #trackingPreferences = :trackingPreferences';
        const names = {
            '#isSetupComplete': 'isSetupComplete',
            '#trackingPreferences': 'trackingPreferences',
        };
        const values = {
            ':isSetupComplete': userInfo.isSetupComplete,
            ':trackingPreferences': userInfo.trackingPreferences,      
        };
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateUser;