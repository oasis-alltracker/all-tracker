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
      status = e.response?.status;
      data = e.response?.data;
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

  // The name the home screen greets the user by. The backend trims it and
  // rejects an empty or over-long name with 400.
  static async updateName(name, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    var status;
    try {
      const response = await axios.put(API, { name }, { headers: headers });
      status = response?.status;
    } catch (error) {
      status = error.response?.status;
    }
    return { status };
  }

  static async updateNutritionPath(nutritionPath, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      nutritionPath: nutritionPath,
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
