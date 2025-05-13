import axios from "axios";
import {EXPO_PUBLIC_BASE_URL} from "../config";
const API = EXPO_PUBLIC_BASE_URL + "dietButton/";

class DietButtonAPI {
    static async getDietButtonResponse(token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(API, { headers: headers });
        return response?.data;
    }

    static async createDietButtonResponse(token, input){
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        response = await axios.post(API, input, {headers: headers });
        return response?.data?.ID;
    }
}
export default DietButtonAPI;