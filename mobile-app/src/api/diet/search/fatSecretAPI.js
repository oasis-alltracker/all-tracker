import axios from "axios";
import { FATSECRET_BASE_URL } from "../../../../config";
import { getFatSecretToken } from "./fatSecretToken";
const API = FATSECRET_BASE_URL + "foods/search/v3";

export async function searchFatSecret(searchInput, page = 0) {
  const token = await getFatSecretToken();
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = {
    search_expression: searchInput,
    format: "json",
    flag_default_serving: true,
    max_results: 1,
    page_number: page,
    language: "en",
    region: "US",
  };
  const response = await axios.get(API, { headers: headers, params: params });
  console.log(response?.data);
  return response?.data.foods_search.results.food;
}

const convertResults = (results) => {};
