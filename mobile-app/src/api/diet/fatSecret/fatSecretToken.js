import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Buffer } from "buffer";
import { jwtDecode } from "jwt-decode";
import { FATSECRET_KEYS } from "../../../../config";
const API = "https://oauth.fatsecret.com/connect/token";

export async function getFatSecretToken() {
  var accessToken = await SecureStore.getItemAsync("fatSecretToken");
  if (!isTokenValid(accessToken)) {
    const generatedToken = await generateToken();
    var newToken = generatedToken["access_token"];

    await SecureStore.setItemAsync("fatSecretToken", newToken);
    accessToken = newToken;
  }
  return accessToken;
}

//helper functions
const isTokenValid = (token) => {
  var result = false;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp > currentTime) result = true;
  } catch (e) {}

  return result;
};

const generateToken = async () => {
  var encoded = Buffer.from(
    `${FATSECRET_KEYS.client_ID}:${FATSECRET_KEYS.client_secret}`
  ).toString("base64");
  const headers = {
    Authorization: `Basic ${encoded}`,
  };

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("scope", "");

  const response = await axios.post(API, body.toString(), { headers });
  return response?.data;
};
