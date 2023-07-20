import axios from 'axios';
const baseURL = process.env['REACT_APP_BASE_URL'];
const API = baseURL + '/authentication/';



class LoginAPI{

    static async loginApple(token) {
        const url = API + 'loginApple';

        const body = {
            token: token
        }

        try{
            const response = await axios.post(url, body);
            return response?.data;
        }
        catch(e){
            console.log(e);
        }
    }

    static async loginGoogle(token){
        const url = API + 'loginGoogle';

        const body = {
            token: token
        }

        try{
            const response = await axios.post(url, body);
            return response?.data;
        }
        catch(e){
            console.log(e);
        }
    }

    static async loginOTP(email, otp){
        const url = API + 'loginOTP';

        const body = {
            email: email,
            otp: otp
        }

        try{
            await axios.post(url, body);
        }
        catch(e){
            console.log(e);
        }
    }

    static async requestOTP(email){
        const url = API + 'requestOTP';

        const body = {
            email: email
        }

        try{
            await axios.post(url, body);
        }
        catch(e){
            console.log(e);
        }
    }

    static async refreshToken(token){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + 'refreshToken';
        const body = {};

        try{
            await axios.post(url, body, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }

}
export default LoginAPI;