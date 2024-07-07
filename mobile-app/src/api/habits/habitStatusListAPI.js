import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "habitStatusList/";

class HabitStatusListAPI {
  static async getHabitStatusList(token, dateStamp) {
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
}
export default HabitStatusListAPI;
