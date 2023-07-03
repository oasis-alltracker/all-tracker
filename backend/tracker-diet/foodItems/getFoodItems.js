class GetFoodItems {
    constructor(db) {
      this.DB = db;
    }

    async getFoodItems(user) {
        try {
            const foodItems = await this.getItems(user.email);
            
            return {
                statusCode: 200,
                body: JSON.stringify(foodItems),
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

    async getItems(user) {
        const expression =  '#pk = :pk';
        const names = {
            '#pk': 'PK',
        };
            const values = {
            ':pk': `${user}-foodItem`
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}
module.exports = GetFoodItems;