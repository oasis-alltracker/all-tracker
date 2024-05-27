const { v1: uuidv1 } = require("uuid");

class CreateWellnessReport {
  constructor(db) {
    this.DB = db;
  }

  async createWellnessReport(user, body) {
    try {
      const response = await this.createReport(user.email, body);

      return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
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

  async createReport(email, wellnessReport) {
    const wellnessReportID = uuidv1();

    const data = {
      PK: `${email}-wellnessReport`,
      SK: `${wellnessReport.dateStamp}-${wellnessReportID}`,
      feeling: wellnessReport.feeling,
      mood: wellnessReport.mood,
      location: wellnessReport.location,
      company: wellnessReport.company,
      activity: wellnessReport.activity,
      title: wellnessReport.title,
      journal: wellnessReport.journal,
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateWellnessReport;
