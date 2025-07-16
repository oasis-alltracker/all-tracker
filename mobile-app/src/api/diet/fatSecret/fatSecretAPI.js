import axios from "axios";
import { FATSECRET_BASE_URL } from "../../../../config";
import { getFatSecretToken } from "./fatSecretToken";

export async function barcodeSearchFatSecret(barcode) {
  const API = FATSECRET_BASE_URL + "food/barcode/find-by-id/v1";
  const token = await getFatSecretToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = {
    barcode: barcode, //as a string
    format: "json",
    language: "en",
    region: "US",
  };
  const response = await axios.get(API, { headers: headers, params: params });
  if (response?.data.food_id.value != 0) {
    var result = await getByID(response?.data.food_id.value);
    return result;
  } else {
    return null;
  }
}

async function getByID(id) {
  const API = FATSECRET_BASE_URL + "food/v4";
  const token = await getFatSecretToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = {
    food_id: id,
    format: "json",
    flag_default_serving: true,
    language: "en",
    region: "US",
  };
  const response = await axios.get(API, { headers: headers, params: params });
  return convertResults([response?.data.food])[0]; //either this or make a new function
}

export async function searchFatSecret(searchInput, page = 0) {
  const API = FATSECRET_BASE_URL + "foods/search/v3";
  const token = await getFatSecretToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const params = {
    search_expression: searchInput,
    format: "json",
    flag_default_serving: true,
    max_results: 10,
    page_number: page,
    language: "en",
    region: "US",
  };
  const response = await axios.get(API, { headers: headers, params: params });
  return convertResults(response?.data.foods_search.results?.food);
}

const convertResults = (results) => {
  var transformedResults = [];
  if (results != null) {
    results.forEach((item) => {
      var defaultServing;
      var servings = item.servings.serving.map((serving) => {
        var entry = {
          servingID: serving.serving_id,
          measurement: serving.serving_description,
          calorieCount: serving.calories,
          carbCount: serving.carbohydrate,
          proteinCount: serving.protein,
          fatCount: serving.fat,
        };
        if (serving.is_default == "1") {
          defaultServing = entry;
        }
        return entry;
      });

      transformedResults.push({
        name:
          item.food_type == "Brand"
            ? `${item.brand_name} ${item.food_name}`
            : item.food_name,
        foodItemID: item.food_id,
        calorieCount: defaultServing.calorieCount,
        carbCount: defaultServing.carbCount,
        fatCount: defaultServing.fatCount,
        proteinCount: defaultServing.proteinCount,
        measurement: defaultServing.measurement,
        quantity: "1",
        servingsDetails: servings,
      });
    });
  }

  return transformedResults;
};
