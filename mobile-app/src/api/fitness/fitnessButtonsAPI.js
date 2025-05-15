import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../config";
const API = EXPO_PUBLIC_BASE_URL + "fitnessButtons/";

class FitnessButtonsAPI {

  static async getFitnessButtonCalls(token){
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
        headers: headers,
    });
    return response?.data;
  }

  static async createFitnessButtonClick(token, name) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(API,
        {name: name, }, 
        {headers: headers,}
    );
    return response?.data;
  }
  
}
export default FitnessButtonsAPI;
