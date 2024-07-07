import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "habits/";

class HabitsAPI {
  static async getHabits(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, { headers: headers });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async createHabit(token, habit) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, habit, { headers: headers });
    } catch (e) {
      console.log(e);
    }
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
