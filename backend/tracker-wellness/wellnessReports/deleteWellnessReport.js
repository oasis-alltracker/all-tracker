class DeleteWellnessReport {
    constructor(db) {
      this.DB = db;
    }

    async deleteWellnessReport(user, wellnessReportID) {
        
        try {
            await this.deleteReport(user.email, wellnessReportID);

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
        const key = {PK: `${email}-wellnessReport`, SK: SK};
        await this.DB.deleteItem(key);
    }
};
module.exports = DeleteWellnessReport;   