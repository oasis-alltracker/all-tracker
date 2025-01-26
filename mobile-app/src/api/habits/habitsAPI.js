import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "habits/";

class HabitsAPI {
  static async getHabits(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, { headers: headers });
    return response?.data;
  }

  static async createHabit(token, habit) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    response = await axios.post(API, habit, { headers: headers });
    return response?.data?.ID;
  }

  static async updateHabit(token, habitID, habit) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + habitID;

    await axios.put(url, habit, { headers: headers });
  }

  static async deleteHabit(token, habitID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + habitID;

    await axios.delete(url, { headers: headers });
  }
}
export default HabitsAPI;
