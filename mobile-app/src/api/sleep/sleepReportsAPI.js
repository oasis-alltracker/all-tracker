import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "sleepReports/";

class SleepReportsAPI {
  static async getSleepReportsForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }
  static async getSleepReportsForMutlipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }
  static async createSleepReport(token, sleepReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, sleepReport, { headers: headers });
  }

  static async updateSleepReport(token, sleepReportID, sleepReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + sleepReportID;

    await axios.put(url, sleepReport, { headers: headers });
  }

  static async deleteSleepReport(token, sleepReportID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + sleepReportID;

    await axios.delete(url, { headers: headers });
  }
}
export default SleepReportsAPI;
