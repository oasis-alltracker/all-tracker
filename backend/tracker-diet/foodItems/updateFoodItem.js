class UpdateFoodItem {
    constructor(db) {
      this.DB = db;
    }

    async updateFoodItem(user, foodItemID, body) {
        try {
            await this.updateItem(user.email, foodItemID, body);

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

    async updateItem(email, foodItemID, foodEntry) {
        const key = {PK: `${email}-foodItem`, SK: foodItemID};
        const expression =  'SET #name = :name, #caloriesPerMeasure = :caloriesPerMeasure, #proteinsPerMeasure = :proteinsPerMeasure, #fatsPerMeasure = :fatsPerMeasure, #servingOption = :servingOption, #foodIDs = :foodIDs';
        const names = {
            '#name': 'name',
            '#caloriesPerMeasure': 'caloriesPerMeasure',
            '#proteinsPerMeasure': 'proteinsPerMeasure',
            '#fatsPerMeasure': 'fatsPerMeasure',
            '#servingOption': 'servingOption',
            '#foodIDs': 'foodIDs',
        };
        const values = {
            ':name': foodEntry.name,
            ':caloriesPerMeasure': foodEntry.caloriesPerMeasure,
            ':proteinsPerMeasure': foodEntry.proteinsPerMeasure,
            ':fatsPerMeasure': foodEntry.fatsPerMeasure,
            ':servingOption': foodEntry.servingOption,    
            ':foodIDs': foodEntry.foodIDs,        
        };
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateFoodItem;