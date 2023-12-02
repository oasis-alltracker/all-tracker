import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "workoutEntries/";

class WorkoutEntriesAPI {
  static async getWorkoutEntriesForToday(token, dateStamp) {
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
  static async getWorkoutEntriesForMutlipleDays(token, startDate, endDate) {
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
  static async createWorkoutEntry(token, workoutEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, workoutEntry, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateWorkoutEntry(token, workoutEntryID, workoutEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + workoutEntryID;

    try {
      await axios.put(url, workoutEntry, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteWorkoutEntry(token, workoutEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + workoutEntryID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default WorkoutEntriesAPI;
