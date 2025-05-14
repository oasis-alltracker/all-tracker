import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";

class StatsAPI {
  static async getHabitStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "habitStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(api, {
      headers: headers,
      params: { sunday: sunday },
    });
    return response?.data;
  }
  static async getTaskStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "taskStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(api, {
      headers: headers,
      params: { sunday: sunday },
    });
    return response?.data;
  }

  static async getMoodStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "moodStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(api, {
      headers: headers,
      params: { sunday: sunday },
    });
    return response?.data;
  }

  static async getSleepStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "sleepStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(api, {
      headers: headers,
      params: { sunday: sunday },
    });
    return response?.data;
  }
}
export default StatsAPI;
