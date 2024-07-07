import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "dietGoals/";

class DietGoalsAPI {
  static async getDietGoals(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    var status, data;
    try {
      const response = await axios.get(API, { headers: headers });
      status = response?.status;
      data = response?.data[0];
    } catch (e) {
      console.log(e);
      status = error.response.status;
      data = error.response.data;
    }
    return data;
  }

  static async updateDietGoals(token, dietGoals) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API;

    try {
      await axios.put(url, dietGoals, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default DietGoalsAPI;
