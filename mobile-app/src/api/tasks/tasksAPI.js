import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "tasks/";

class TasksAPI {
  static async getTasks(token) {
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

  static async getDueAndOverdueTaks(token, dateStamp) {
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

  static async createTask(token, task) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      response = await axios.post(API, task, { headers: headers });
      return response?.data?.ID;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateTask(token, taskID, task) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + taskID;

    try {
      await axios.put(url, task, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteTask(token, taskID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + taskID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default TasksAPI;
