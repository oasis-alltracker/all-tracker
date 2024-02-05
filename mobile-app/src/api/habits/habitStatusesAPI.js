import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "habitStatuses/";

class HabitStatusesAPI {
  static async getHabitStatusesForToday(token, dateStamp, isComplete) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, {
        headers: headers,
        params: { dateStamp: dateStamp, isComplete: isComplete},
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async getHabitStatusesForMutlipleDays(token, startDate, endDate, isComplete) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, {
        headers: headers,
        params: { startDate: startDate, endDate: endDate, isComplete: isComplete},
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async createHabitStatus(token, habitStatus) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, habitStatus, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateHabitStatus(token, habitStatusID, habitStatus) {
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + habitStatusID;

    try {
      await axios.put(url, habitStatus, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteHabitStatus(token, habitStatusID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + habitStatusID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default HabitStatusesAPI;
