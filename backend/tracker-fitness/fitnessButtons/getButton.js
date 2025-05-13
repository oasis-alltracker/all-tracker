class GetButton{
    constructor(db) {
        this.DB = db;
    }

    async getButton(user) {
        try{
            const buttonClicks = await this.get(user.email);

            return {
                statusCode: 200,
                body: JSON.stringify(buttonClicks),
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

    async get(email){
        const expression = "#pk = :pk";

        const names = {
            "#pk" : "PK"
        };
        const values = {
            ":pk" : `${email}-exercise-button`,
        };

        console.log(email);

        const response = await this.DB.queryItem(expression,names,values); 
        return response?.Items;
    }

}
module.exports = GetButton;