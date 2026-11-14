import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "reflectiveMeals/";

class ReflectiveMealsAPI {
  static async getReflectiveMealsForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }

  static async getReflectiveMealsForMultipleDays(token, startDate, endDate) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { startDate: startDate, endDate: endDate },
    });
    return response?.data;
  }

  // Returns the new meal's ID (its SK), used for update and delete.
  static async createReflectiveMeal(token, reflectiveMeal) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(API, reflectiveMeal, {
      headers: headers,
    });
    return response?.data?.ID;
  }

  static async updateReflectiveMeal(token, reflectiveMealID, reflectiveMeal) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + reflectiveMealID;

    await axios.put(url, reflectiveMeal, { headers: headers });
  }

  static async deleteReflectiveMeal(token, reflectiveMealID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + reflectiveMealID;

    await axios.delete(url, { headers: headers });
  }
}
export default ReflectiveMealsAPI;
