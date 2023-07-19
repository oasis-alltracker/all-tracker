import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + '/user/';

class UserAPI{

    static async getUser(token){
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
}
export default UserAPI;