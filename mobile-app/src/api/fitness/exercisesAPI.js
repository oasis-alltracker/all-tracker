import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "exercise/";

class ExercisesAPI {
  static async getExercisesForWorkout(token, workoutPlanID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, {
        headers: headers,
        params: { workoutPlanID: workoutPlanID },
      });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async createExercise(token, exercise) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await axios.post(API, exercise, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async updateExercise(token, exerciseID, exercise) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseID;

    try {
      await axios.put(url, exercise, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteExercise(token, exerciseID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }
}
export default ExercisesAPI;
