class DeleteSleepReport {
    constructor(db) {
      this.DB = db;
    }

    async deleteSleepReport(user, sleepReportID) {
        
        try {
            await this.deleteReport(user.email, sleepReportID);

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

    async deleteReport(email, SK) {
        const key = {PK: `${email}-sleepReport`, SK: SK};
        await this.DB.deleteItem(key);
    }
};
module.exports = DeleteSleepReport;   