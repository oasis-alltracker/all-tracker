import axios from "axios";
import { FATSECRET_BASE_URL, FATSECRET_KEYS } from "./fatSecretBase";
const API = FATSECRET_BASE_URL + "foods/search/v3";
const tokenURL = "https://oauth.fatsecret.com/connect/token";

export async function getFatSecretToken() {
  const headers = {
    Authorization: `Basic ${btoa(
      `${FATSECRET_KEYS.client_ID}:${FATSECRET_KEYS.client_secret}`
    )}`,
  };

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("scope", "");

  console.log(JSON.stringify(headers));
  console.log(body.toString());

  const response = await axios
    .post(tokenURL, body.toString(), { headers })
    .catch((error) => console.log(error.response?.data || error.message));
  return response?.data;
}
