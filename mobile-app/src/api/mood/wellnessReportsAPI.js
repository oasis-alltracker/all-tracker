import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "wellnessReports/";

class WellnessReportsAPI {
  static async getWellnessReportsForToday(token, dateStamp) {
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
  static async getWellnessReportsForMutlipleDays(token, startDate, endDate) {
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
  static async createWellnessReport(token, wellnessReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, wellnessReport, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateWellnessReport(token, wellnessReportID, wellnessReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + wellnessReportID;

    try {
      await axios.put(url, wellnessReport, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteWellnessReport(token, wellnessReportID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + wellnessReportID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default WellnessReportsAPI;
