import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "habitStatusList/";

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
