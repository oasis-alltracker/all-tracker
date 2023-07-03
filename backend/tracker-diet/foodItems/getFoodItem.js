class GetFoodItem {
    constructor(db) {
      this.DB = db;
    }

    async getFoodItem(user, foodItemID) {
        try {
            const foodItem = await this.getItem(user.email, foodItemID);
 
            return {
                statusCode: 200,
                body: JSON.stringify(foodItem),
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

    async getItem(user, foodItemID) {
        const expression =  '#pk = :pk AND #sk = :sk ';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK',
        };
            const values = {
            ':pk': `${user}-foodItem`,
            ':sk': foodItemID,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}
module.exports = GetFoodItem;