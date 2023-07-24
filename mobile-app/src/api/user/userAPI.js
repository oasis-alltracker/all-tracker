import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;
const API = baseURL + '/user/';

class UserAPI{

    static async getUser(token){
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        var status,data
        try {
            const response = await axios.get(API, {headers: headers});
            status = response?.status
            data = response?.data[0]
        }
        catch(error){
            status = error.response.status
            data = error.response.data
        }
        return {status, data}
    }
}
export default UserAPI;