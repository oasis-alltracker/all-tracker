class GetUser {
    constructor(db) {
      this.DB = db;
    }

    async getUser(user) {
        try {
            const healthInfo = await this.getInfo(user.email);
            
            return {
                statusCode: 200,
                body: JSON.stringify(healthInfo),
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

    async getUser(user) {
        const expression =  '#pk = :pk AND #sk = :sk';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK',
        };
            const values = {
            ':pk': `${user}`,
            ':sk': `${user}`,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}
module.exports = GetUser;