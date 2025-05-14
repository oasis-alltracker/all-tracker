import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "foodItems/";

class FoodItemsAPI {
  static async getFoodItems(token) {
    token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvZGdlcnRhQGdtYWlsLmNvbSIsImlhdCI6MTY5MzUyMDM3NCwiZXhwIjoxNjkzNjkzMTc0fQ._lmRXvecf-X_1zunfHqr0ldoTrejIyVthcEo1zpkWss";
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, { headers: headers });
    return response?.data;
  }
  static async getFoodItem(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, { headers: headers });
    return response?.data;
  }
  static async createFoodItem(token, foodItem) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, foodItem, { headers: headers });
  }

  static async updateFoodItem(token, foodItemID, foodItem) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodItemID;

    await axios.put(url, foodItem, { headers: headers });
  }

  static async deleteFoodItem(token, foodItemID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + foodItemID;

    await axios.delete(url, { headers: headers });
  }
}
export default FoodItemsAPI;
