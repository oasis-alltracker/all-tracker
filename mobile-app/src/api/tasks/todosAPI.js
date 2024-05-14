import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "toDos/";

class ToDosAPI {
  static async getToDosForToday(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, {
        headers: headers,
        params: { dateStamp: dateStamp },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async getToDos(token, isComplete) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, {
        headers: headers,
        params: { isComplete: isComplete },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
  static async createToDo(token, toDo) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      response = await axios.post(API, toDo, { headers: headers });
      return response?.data?.ID;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateToDo(token, toDoID, toDo) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + toDoID;

    try {
      await axios.put(url, toDo, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteToDo(token, toDoID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + toDoID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default ToDosAPI;
