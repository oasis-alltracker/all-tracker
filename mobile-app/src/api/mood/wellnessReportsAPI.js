import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "wellnessReports/";

class WellnessReportsAPI {
  static async getWellnessReportsForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }
  static async getWellnessReportsForMutlipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }
  static async createWellnessReport(token, wellnessReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, wellnessReport, { headers: headers });
  }

  static async updateWellnessReport(token, wellnessReportID, wellnessReport) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + wellnessReportID;

    await axios.put(url, wellnessReport, { headers: headers });
  }

  static async deleteWellnessReport(token, wellnessReportID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + wellnessReportID;

    await axios.delete(url, { headers: headers });
  }
}
export default WellnessReportsAPI;
