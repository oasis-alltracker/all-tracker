class GetToDos {
    constructor(db) {
      this.DB = db;
    }

    async getToDos(user, queryStringParameters) {
        try {
            var toDos;
            if(queryStringParameters.dateStamp) {
                toDos = await this.getToDosForOneDay(user.email, queryStringParameters.dateStamp);
            }
            else if(queryStringParameters.startDate && queryStringParameters.endDate){
                toDos = await this.getToDosForMulitpleDays(user.email, queryStringParameters.startDate, queryStringParameters.endDate);
            }
            else{
                throw new Error("Missing queryStringParameters");
            }

            return {
                statusCode: 200,
                body: JSON.stringify(toDos),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            };
        }
        catch (e) {
            console.log(e);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify("Request failed"),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            });
        }
    }

    async getToDosForOneDay(user, dateStamp) {
        const expression =  '#pk = :pk AND begins_with(#sk, :sk)';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK',
        };
            const values = {
            ':pk': `${user}-taskStatus`,
            ':sk': dateStamp,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }

    async getToDosForMulitpleDays(user, startDate, endDate) {
        const expression =  '#pk = :pk AND #sk BETWEEN :startDate AND :endDate';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK',
        };
            const values = {
            ':pk': `${user}-taskStatus`,
            ':startDate': `${startDate}`,
            ':endDate': `${endDate}`,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}
module.exports = GetToDos;