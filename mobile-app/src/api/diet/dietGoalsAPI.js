import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "dietGoals/";

class DietGoalsAPI {
  static async getDietGoals(token) {
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
