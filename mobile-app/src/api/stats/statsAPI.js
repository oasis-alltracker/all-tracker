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
  // One habit's progress view: streaks, totals, season split and the 44-day
  // dot timeline. dateStamp is the user's today.
  static async getHabitProgress(token, habitID, dateStamp) {
    const api = EXPO_PUBLIC_BASE_URL + "habitProgress/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(api, {
      headers: headers,
      params: { habitID: habitID, dateStamp: dateStamp },
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

  static async getDietStats(token, sunday) {
    const api = EXPO_PUBLIC_BASE_URL + "dietStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(api, {
      headers: headers,
      params: { sunday: sunday },
    });
    return response?.data;
  }

  // Season session counts, streaks and rhythm for the fitness screen.
  // dateStamp is the user's today.
  static async getFitnessStats(token, dateStamp) {
    const api = EXPO_PUBLIC_BASE_URL + "fitnessStats/";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(api, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }
}
export default StatsAPI;
