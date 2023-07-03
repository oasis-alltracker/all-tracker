class UpdateSleepReport {
    constructor(db) {
      this.DB = db;
    }

    async updateSleepReport(user, sleepReportID, body) {
        try {
            await this.updateReport(user.email, sleepReportID, body);

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

    async updateReport(email, sleepReportID, sleeReport) {
        const key = {PK: `${email}-sleepReport`, SK: sleepReportID};
        const expression =  'SET #rating = :rating, #wasComfyEnvironment = :wasComfyEnvironment, #didWindDown = :didWindDown, #didManageIntake = :didManageIntake, #didRelaxation = :didRelaxation';
        const names = {
            '#rating': 'rating',
            '#wasComfyEnvironment': 'wasComfyEnvironment',
            '#didWindDown': 'didWindDown',
            '#didManageIntake': 'didManageIntake',
            '#didRelaxation': 'didRelaxation',
        };
        const values = {
            ':rating': sleeReport.rating,
            ':wasComfyEnvironment': sleeReport.wasComfyEnvironment,
            ':didWindDown': sleeReport.didWindDown,
            ':didManageIntake': sleeReport.didManageIntake,
            ':didRelaxation': sleeReport.didRelaxation,            
        };
    
        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateSleepReport;