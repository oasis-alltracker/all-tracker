class GetDietButtonResponse {
    constructor(db) {
        this.DB = db;
    }

    async getDietButtonResponse(user){
        try {
            const response = await this.getButtonResponse(user.email);
            
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

    async getButtonResponse(user){
        const expression = "#pk = :pk";
        const names = {
            "#pk": "PK",
        };
        const values = {
            ":pk": `${user}-dietButton`
        };

        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}

module.exports = GetDietButtonResponse;