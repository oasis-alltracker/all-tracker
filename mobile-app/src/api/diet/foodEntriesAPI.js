import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "foodEntries/";

class FoodEntriesAPI {
  static async getFoodEntriesForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }
  static async getFoodEntriesForMutlipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }
  static async createFoodEntry(token, foodEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, foodEntry, { headers: headers });
  }

  static async updateFoodEntry(token, foodEntryID, foodEntry) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodEntryID;

    await axios.put(url, foodEntry, { headers: headers });
  }

  static async deleteFoodEntry(token, foodEntryID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodEntryID;

    await axios.delete(url, { headers: headers });
  }
}
export default FoodEntriesAPI;
