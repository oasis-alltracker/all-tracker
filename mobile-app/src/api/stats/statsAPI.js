import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

class StatsAPI {
  static async getHabitStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "habitStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(api, {
        headers: headers,
        params: { sunday: sunday },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async getTaskStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "taskStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(api, {
        headers: headers,
        params: { sunday: sunday },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getMoodStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "moodStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(api, {
        headers: headers,
        params: { sunday: sunday },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getSleepStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "sleepStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(api, {
        headers: headers,
        params: { sunday: sunday },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
}
export default StatsAPI;
