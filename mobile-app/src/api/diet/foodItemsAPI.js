import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "foodItems/";

class FoodItemsAPI {
  static async getFoodItems(token) {
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvZGdlcnRhQGdtYWlsLmNvbSIsImlhdCI6MTY5MzUyMDM3NCwiZXhwIjoxNjkzNjkzMTc0fQ._lmRXvecf-X_1zunfHqr0ldoTrejIyVthcEo1zpkWss";
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
  static async getFoodItem(token) {
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
  static async createFoodItem(token, foodItem) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, foodItem, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateFoodItem(token, foodItemID, foodItem) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodItemID;

    try {
      await axios.put(url, foodItem, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteFoodItem(token, foodItemID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodItemID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default FoodItemsAPI;
