import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../config";
const API = EXPO_PUBLIC_BASE_URL + "habitStatuses/";

class HabitStatusesAPI {
  static async getHabitStatusesForToday(token, dateStamp, isComplete) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp, isComplete: isComplete },
    });
    return response?.data;
  }
  static async getHabitStatusesForMutlipleDays(
    token,
    startDate,
    endDate,
    isComplete
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: {
        startDate: startDate,
        endDate: endDate,
        isComplete: isComplete,
      },
    });
    return response?.data;
  }
  static async createHabitStatus(token, habitStatus) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, habitStatus, { headers: headers });
  }

  static async updateHabitStatus(token, habitStatusID, habitStatus) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + habitStatusID;

    await axios.put(url, habitStatus, { headers: headers });
  }

  static async deleteHabitStatus(token, habitStatusID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + habitStatusID;

    await axios.delete(url, { headers: headers });
  }
}
export default HabitStatusesAPI;
