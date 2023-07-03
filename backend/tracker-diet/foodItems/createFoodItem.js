const { v1: uuidv1 } = require('uuid');

class CreateFoodItem {
    constructor(db) {
        this.DB = db;
    }

    async createFoodItem (user, body) {      
        try {
            const response = await this.createItem(user.email, body);

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
            };
        }
    }

    async createItem(email, foodItem) {
        const foodItemID = uuidv1();
        const timestamp = new Date().getTime();


        const data = {
          PK: `${email}-foodItem`, 
          SK: `${foodItemID}`,
          name: foodItem.name,
          caloriesPerMeasure: foodItem.caloriesPerMeasure,
          fatsPerMeasure: foodItem.fatsPerMeasure,
          proteinsPerMeasure: foodItem.proteinsPerMeasure,
          servingOption: foodItem.servingOption,
          foodIDs: foodItem.foodIDs,
        };

        await this.DB.putItem(data);
        return {ID: data.SK};
    }
};
module.exports = CreateFoodItem;   
