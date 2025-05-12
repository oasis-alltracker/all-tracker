import axios from "axios";
import moment from "moment";

import { EXPO_PUBLIC_BASE_URL } from "../config";
const API = EXPO_PUBLIC_BASE_URL + "toDos/";

class ToDosAPI {
  static async getToDosForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }
  static async getToDos(token, isComplete) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { isComplete: isComplete },
    });
    return response?.data;
  }
  static async createToDo(token, toDo) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    response = await axios.post(API, toDo, { headers: headers });
    return response?.data?.ID;
  }

  static async updateToDo(token, toDoID, toDo) {
    const today = new Date();
    toDo.completionDate = moment(today).format("YYYYMMDD");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + toDoID;

    await axios.put(url, toDo, { headers: headers });
  }

  static async deleteToDo(token, toDoID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + toDoID;

    await axios.delete(url, { headers: headers });
  }
}
export default ToDosAPI;
