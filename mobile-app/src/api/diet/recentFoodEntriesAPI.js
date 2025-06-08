import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "foodEntries/recent";

class RecentFoodEntriesAPI {
  static async getRecentFoodEntries(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, { headers: headers });
    return response?.data;
  }
}
export default RecentFoodEntriesAPI;
