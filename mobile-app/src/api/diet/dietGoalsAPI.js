import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "dietGoals/";

class DietGoalsAPI {
  static async getDietGoals(token) {
    console.log("entered diet goals");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    var status, data;

    const response = await axios.get(API, { headers: headers });
    status = response?.status;
    data = response?.data[0];

    return data;
  }

  static async updateDietGoals(token, dietGoals) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API;

    await axios.put(url, dietGoals, { headers: headers });
  }
}
export default DietGoalsAPI;
