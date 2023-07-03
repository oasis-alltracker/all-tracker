const { v1: uuidv1 } = require('uuid');

class CreateSleepReport {
    constructor(db) {
        this.DB = db;
    }

    async createSleepReport (user, body) {      
        try {
            const response = await this.createReport(user.email, body);

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
            }
        }
    }

    async createReport(email, sleeReport) {
        const sleepReportID = uuidv1();

        const data = {
          PK: `${email}-sleepReport`, 
          SK: `${sleeReport.dateStamp}-${sleepReportID}`,
          rating: sleeReport.rating,
          wasComfyEnvironment: sleeReport.wasComfyEnvironment,
          didWindDown: sleeReport.didWindDown,
          didManageIntake: sleeReport.didManageIntake,
          didRelaxation: sleeReport.didRelaxation,
        };

        await this.DB.putItem(data);
        return {ID: data.SK};
    }
};
module.exports = CreateSleepReport;   
