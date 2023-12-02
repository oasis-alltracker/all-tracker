import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "foodEntries/";

class FoodEntriesAPI {
  static async getFoodEntriesForToday(token, dateStamp) {
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
  static async getFoodEntriesForMutlipleDays(token, startDate, endDate) {
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
  static async createFoodEntry(token, foodEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, foodEntry, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateFoodEntry(token, foodEntryID, foodEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodEntryID;

    try {
      await axios.put(url, foodEntry, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteFoodEntry(token, foodEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodEntryID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default FoodEntriesAPI;
