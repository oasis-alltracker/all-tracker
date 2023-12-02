import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "exerciseEntries/";

class ExerciseEntriesAPI {
  static async getExerciseEntriesForToday(token, dateStamp) {
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
  static async getExerciseEntriesForMutlipleDays(token, startDate, endDate) {
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
  static async createExerciseEntry(token, exerciseEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, exerciseEntry, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateExerciseEntry(token, exerciseEntryID, exerciseEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseEntryID;

    try {
      await axios.put(url, exerciseEntry, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteExerciseEntry(token, exerciseEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseEntryID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default ExerciseEntriesAPI;
