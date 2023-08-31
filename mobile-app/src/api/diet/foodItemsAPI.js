import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + '/foodItems/';

class FoodItemsAPI{

    static async getFoodItems(token){
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
    static async getFoodItem(token){
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
    static async createFoodItem(token, foodItem){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            await axios.post(API, foodItem, {headers: headers});
        }
        catch(e) {
            console.log(e);
        }
    }

    static async updateFoodItem(token, foodItemID, foodItem){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + foodItemID;

        try{
            await axios.put(url, foodItem, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }

    static async deleteFoodItem(token, foodItemID){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + foodItemID;

        try {
            await axios.delete(url, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }


}
export default FoodItemsAPI;