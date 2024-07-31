import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "exercise/";

class ExercisesAPI {
  static async getExercisesForWorkout(token, workoutPlanID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, {
      headers: headers,
      params: { workoutPlanID: workoutPlanID },
    });
    return response?.data;
  }

  static async createExercise(token, exercise) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, exercise, { headers: headers });
  }

  static async updateExercise(token, exerciseID, exercise) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseID;

    await axios.put(url, exercise, { headers: headers });
  }

  static async deleteExercise(token, exerciseID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + exerciseID;

    await axios.delete(url, { headers: headers });
  }
}
export default ExercisesAPI;
