class UpdateWellnessReport {
  constructor(db) {
    this.DB = db;
  }

  async updateWellnessReport(user, wellnessReportID, body) {
    try {
      await this.updateReport(user.email, wellnessReportID, body);

      return {
        statusCode: 200,
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

  async updateReport(email, wellnessReportID, sleeReport) {
    const key = { PK: `${email}-wellnessReport`, SK: wellnessReportID };
    const expression =
      "SET #feeling = :feeling, #mood = :mood, #location = :location, #company = :company, #activity = :activity, #title = :title";
    const names = {
      "#feeling": "feeling",
      "#mood": "mood",
      "#location": "location",
      "#company": "company",
      "#activity": "activity",
      "#title": "title",
    };
    const values = {
      ":feeling": sleeReport.feeling,
      ":mood": sleeReport.mood,
      ":location": sleeReport.location,
      ":company": sleeReport.company,
      ":title": sleeReport.title,
    };

    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateWellnessReport;
