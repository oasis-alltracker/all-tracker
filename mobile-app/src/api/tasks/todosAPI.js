import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + '/toDos/';

class ToDosAPI{

    static async getToDosForToday(token, dateStamp){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.get(API, {headers: headers, params: { dateStamp: dateStamp }});
            return (response?.data);
        }
        catch(e) {
            console.log(e);
        }
    }
    static async getToDosForMutlipleDays(token, startDate, endDate){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.get(API, {headers: headers, params: { startDate: startDate, endDate: endDate }});
            return (response?.data);
        }
        catch(e) {
            console.log(e);
        }
    }
    static async createToDo(token, toDo){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            await axios.post(API, toDo, {headers: headers});
        }
        catch(e) {
            console.log(e);
        }
    }

    static async updateToDo(token, toDoID, toDo){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + toDoID;

        try{
            await axios.put(url, toDo, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }

    static async deleteToDo(token, toDoID){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + toDoID;

        try {
            await axios.delete(url, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }


}
export default ToDosAPI;