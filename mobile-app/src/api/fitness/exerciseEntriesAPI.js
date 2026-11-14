import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "exerciseEntries/";

class ExerciseEntriesAPI {
  // One session's exercises, in the order they were done.
  static async getExerciseEntriesForWorkout(token, workoutEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { workoutEntryID: workoutEntryID },
    });
    return response?.data;
  }

  static async getExerciseEntriesForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }
  static async getExerciseEntriesForMutlipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }
  static async createExerciseEntry(token, exerciseEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(API, exerciseEntry, { headers: headers });
    return response?.data?.ID;
  }

  static async updateExerciseEntry(token, exerciseEntryID, exerciseEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseEntryID;

    await axios.put(url, exerciseEntry, { headers: headers });
  }

  static async deleteExerciseEntry(token, exerciseEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseEntryID;

    await axios.delete(url, { headers: headers });
  }
}
export default ExerciseEntriesAPI;
