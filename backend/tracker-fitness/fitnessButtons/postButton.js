const { v1: uuidv1 } = require("uuid");

class PostButton{

    constructor(db) {
        this.DB = db;
    }

    async postButton(user, body) {
        try{
            const response = await this.create(user.email, body);

            return {
                statusCode: 200,
                body: JSON.stringify(response),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                  },
            };

        }catch(e){
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

    async create(email, body){
        const buttonID = uuidv1();

        const data = {
            PK: `${email}-exercise-button`,
            SK: `${buttonID}`,
            name: body.name,
        };

        await this.DB.putItem(data); 
        return {ID: data.SK};
    }

}
module.exports = PostButton;