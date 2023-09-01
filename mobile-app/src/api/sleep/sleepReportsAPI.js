import axios from "axios";
require("dotenv").config();
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + "sleepReports/";

class SleepReportsAPI {
  static async getSleepReportsForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, {
        headers: headers,
        params: { dateStamp: dateStamp },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async getSleepReportsForMutlipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, {
        headers: headers,
        params: { startDate: startDate, endDate: endDate },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async createSleepReport(token, sleepReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, sleepReport, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateSleepReport(token, sleepReportID, sleepReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + sleepReportID;

    try {
      await axios.put(url, sleepReport, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteSleepReport(token, sleepReportID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + sleepReportID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default SleepReportsAPI;
