const { v1: uuidv1} = require("uuid");

class CreateDietButtonResponse {
    constructor(db) {
        this.DB = db;
    }

    async CreateDietButtonResponse(user, body) {
        try {
            const response = await this.CreateButtonResponse(user.email, body);

            return {
                statusCode: 200,
                body: JSON.stringify(response),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
            };
        }
        catch (e) {
            console.log(e);
            return {
                statusCode: 500, 
                body: JSON.stringify("Request failed"),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
            };
        }
    }

    async CreateButtonResponse(email, dietInfo){
        const buttonPressID = uuidv1();

        const data = {
            PK: `${email}-dietButton`,
            SK: `${buttonPressID}`,
            meal: dietInfo.meal,
            food: dietInfo.food,
        };  

        await this.DB.putItem(data);
        return {ID: data.SK};
    }
}

module.exports = CreateDietButtonResponse;