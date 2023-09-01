import axios from "axios";
require("dotenv").config();
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + "habitStatuses/";

class HabitStatusesAPI {
  static async getHabitStatusesForToday(token, dateStamp) {
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
  static async getHabitStatusesForMutlipleDays(token, startDate, endDate) {
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
