import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "habitStatusList/";

class HabitStatusListAPI {
  static async getHabitStatusList(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }
}
export default HabitStatusListAPI;
