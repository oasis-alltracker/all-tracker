import axios from "axios";
import { EXPO_PUBLIC_BASE_URL } from "../../../config";
const API = EXPO_PUBLIC_BASE_URL + "tasks/";

class TasksAPI {
  static async getTasks(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, { headers: headers });
    return response?.data;
  }

  static async getDueAndOverdueTaks(token, dateStamp) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { dateStamp: dateStamp },
    });
    return response?.data;
  }

  static async createTask(token, task) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    response = await axios.post(API, task, { headers: headers });
    return response?.data?.ID;
  }

  static async updateTask(token, taskID, task) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + taskID;

    await axios.put(url, task, { headers: headers });
  }

  static async deleteTask(token, taskID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + taskID;

    await axios.delete(url, { headers: headers });
  }
}
export default TasksAPI;
