class UpdateHealthInfo {
    constructor(db) {
      this.DB = db;
    }

    async updateHealthInfo(user, body) {
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

    async updateInfo(email, healthInfo) {
        const key = {PK: `${email}-healthInfo`, SK: `healthInfo`};
        const expression =  'SET #weight = :weight, #height = :height, #weightGoal = :weightGoal, #calorieGoal = :calorieGoal, #proteinGoal = :proteinGoal, #fatGoal = :fatGoal';
        const names = {
            '#weight': 'weight',
            '#height': 'height',
            '#weightGoal': 'weightGoal',
            '#calorieGoal': 'calorieGoal',
            '#proteinGoal': 'proteinGoal',
            '#fatGoal': 'fatGoal',
        };
        const values = {
            ':weight': healthInfo.weight,
            ':height': healthInfo.height,
            ':weightGoal': healthInfo.weightGoal,
            ':calorieGoal': healthInfo.calorieGoal,
            ':proteinGoal': healthInfo.proteinGoal,    
            ':fatGoal': healthInfo.fatGoal,        
        };
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateHealthInfo;