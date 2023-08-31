import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + '/workoutPlans/';

class WorkoutPlansAPI{

    static async getWorkoutPlans(token){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.get(API, {headers: headers});
            return (response?.data);
        }
        catch(e) {
            console.log(e);
        }
    }

    static async createWorkoutPlan(token, workoutPlan){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            await axios.post(API, workoutPlan, {headers: headers});
        }
        catch(e) {
            console.log(e);
        }
    }

    static async updateWorkoutPlan(token, workoutPlanID, workoutPlan){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + workoutPlanID;

        try{
            await axios.put(url, workoutPlan, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }

    static async deleteWorkoutPlan(token, workoutPlanID){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + workoutPlanID;

        try {
            await axios.delete(url, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }


}
export default WorkoutPlansAPI;