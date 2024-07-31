import axios from "axios";
const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "workoutPlans/";

class WorkoutPlansAPI {
  static async getWorkoutPlans(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API, { headers: headers });
    return response?.data;
  }

  static async createWorkoutPlan(token, workoutPlan) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(API, workoutPlan, { headers: headers });
  }

  static async updateWorkoutPlan(token, workoutPlanID, workoutPlan) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + workoutPlanID;

    await axios.put(url, workoutPlan, { headers: headers });
  }

  static async deleteWorkoutPlan(token, workoutPlanID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + workoutPlanID;

    await axios.delete(url, { headers: headers });
  }
}
export default WorkoutPlansAPI;
