import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "workoutEntries/";

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

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }
  static async createWorkoutEntry(token, workoutEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, workoutEntry, { headers: headers });
  }

  static async updateWorkoutEntry(token, workoutEntryID, workoutEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + workoutEntryID;

    await axios.put(url, workoutEntry, { headers: headers });
  }

  static async deleteWorkoutEntry(token, workoutEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + workoutEntryID;

    await axios.delete(url, { headers: headers });
  }
}
export default WorkoutEntriesAPI;
