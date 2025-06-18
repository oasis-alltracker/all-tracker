import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Buffer } from "buffer";
import { jwtDecode } from "jwt-decode";
import { FATSECRET_BASE_URL, FATSECRET_KEYS } from "./fatSecretBase";
const API = FATSECRET_BASE_URL + "foods/search/v3";
const tokenURL = "https://oauth.fatsecret.com/connect/token";

export async function getFatSecretToken() {
  var encoded = Buffer.from(
    `${FATSECRET_KEYS.client_ID}:${FATSECRET_KEYS.client_secret}`
  ).toString("base64");
  const headers = {
    Authorization: `Basic ${encoded}`,
  };

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("scope", "");

  const response = await axios.post(tokenURL, body.toString(), { headers });
  return response?.data;
}

export async function retrieveFatScecretToken() {
  var accessToken = await SecureStore.getItemAsync("fatSecretToken");
  if (!isTokenValid(accessToken)) {
    const generatedToken = await getFatSecretToken();
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
