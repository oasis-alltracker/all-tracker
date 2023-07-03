class GetWellnessReports {
    constructor(db) {
      this.DB = db;
    }

    async getWellnessReports(user, queryStringParameters) {
        try {
            var wellnessReports;
            if(queryStringParameters.dateStamp) {
                wellnessReports = await this.getReportsForOneDay(user.email, queryStringParameters.dateStamp);
            }
            else if(queryStringParameters.startDate && queryStringParameters.endDate){
                wellnessReports = await this.getReportsForMulitpleDays(user.email, queryStringParameters.startDate, queryStringParameters.endDate);
            }
            else{
                throw new Error("Missing queryStringParameters")
            }
            return {
                statusCode: 200,
                body: JSON.stringify(wellnessReports),
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

    async getReportsForOneDay(user, dateStamp) {
        const expression =  '#pk = :pk AND begins_with(#sk, :sk) ';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK',
        };
            const values = {
            ':pk': `${user}-wellnessReport`,
            ':sk': dateStamp,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }

    async getReportsForMulitpleDays(user, startDate, endDate) {
        const expression =  '#pk = :pk AND #sk BETWEEN :startDate AND :endDate';
        const names = {
            '#pk': 'PK',
            '#sk': 'SK',
        };
            const values = {
            ':pk': `${user}-wellnessReport`,
            ':startDate': `${startDate}`,
            ':endDate': `${endDate}`,
        };
    
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}
module.exports = GetWellnessReports;