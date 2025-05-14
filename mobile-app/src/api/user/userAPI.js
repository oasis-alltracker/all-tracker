import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "user/";

class UserAPI {
  static async getUser(token) {
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
    return { status, data };
  }

  static async deleteUser(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.delete(API, { headers: headers });
  }

  static async updateUser(isSetupComplete, trackingPreferences, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      isSetupComplete: isSetupComplete,
      trackingPreferences: trackingPreferences,
    };

    var status;
    try {
      const response = await axios.put(API, body, { headers: headers });
      status = response?.status;
    } catch (error) {
      status = error.response.status;
    }
    return { status };
  }

  static async updateTaskPreference(taskPreference, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      taskPreference: taskPreference,
    };

    var status;
    try {
      const response = await axios.put(API, body, { headers: headers });
      status = response?.status;
    } catch (error) {
      status = error.response.status;
    }
    return { status };
  }
}
export default UserAPI;
