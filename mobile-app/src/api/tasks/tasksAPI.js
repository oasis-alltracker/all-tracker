import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + '/tasks/';

class TasksAPI{

    static async getTasks(token){
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

    static async createTask(token, task){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            await axios.post(API, task, {headers: headers});
        }
        catch(e) {
            console.log(e);
        }
    }

    static async updateTask(token, taskID, task){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + taskID;

        try{
            await axios.put(url, task, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }

    static async deleteTask(token, taskID){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + taskID;

        try {
            await axios.delete(url, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }


}
export default TasksAPI;