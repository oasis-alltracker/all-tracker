import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "seasons/";

class SeasonsAPI {
  static async getSeasons(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, { headers: headers });
    return response?.data;
  }

  static async getSeasonsForMultipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }

  // Returns { ID, season, seasonStartedAt } so callers can update state without refetching the user.
  static async createSeason(token, season, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      API,
      { season: season, dateStamp: dateStamp },
      { headers: headers },
    );
    return response?.data;
  }
}
export default SeasonsAPI;
