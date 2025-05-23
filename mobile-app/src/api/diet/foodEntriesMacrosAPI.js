import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "foodEntries/macros";

class FoodEntriesMacrosAPI {
  static async getFoodMacrosForDay(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }

  static async getFoodMacrosForMeal(token, dateStamp, meal) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp, meal: meal },
    });
    return response?.data;
  }
}
export default FoodEntriesMacrosAPI;
