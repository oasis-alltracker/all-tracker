import axios from "axios";
import { BASE_URL } from "@env";
const API = BASE_URL + "authentication/";

class LoginAPI {
  static async loginApple(token) {
    const url = API + "loginApple";

    const body = {
      token: token,
    };

    try {
      const response = await axios.post(url, body);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async loginGoogle(token) {
    const url = API + "loginGoogle";

    const body = {
      token: token,
    };

    try {
      const response = await axios.post(url, body);
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async doesUserExist(email) {
    const url = API + "userExists";

    const body = {
      email: email,
    };

    var status, data;

    try {
      const response = await axios.post(url, body);
      status = response?.status;
      data = response?.data;
    } catch (error) {
      status = error.response.status;
      data = error.response.data;
    }
    return { status, data };
  }

  static async loginOTP(email, otp) {
    const url = API + "loginOTP";

    const body = {
      email: email,
      otp: otp,
    };

    var status, data;

    try {
      const response = await axios.post(url, body);
      status = response?.status;
      data = response?.data;
    } catch (error) {
      status = error.response.status;
      data = error.response.data;
    }
    return { status, data };
  }

  static async requestOTP(email, password) {
    const url = API + "requestOTP";

    const body = {
      email: email,
      password: password,
    };

    var status, data;

    try {
      const response = await axios.post(url, body);
      status = response?.status;
      data = response?.data;
    } catch (error) {
      status = error.response.status;
      data = error.response.data;
    }
    return { status, data };
  }

  static async refreshToken(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + "refreshToken";
    const body = {};

    try {
      const response = await axios.post(url, body, { headers: headers });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }
}
export default LoginAPI;
