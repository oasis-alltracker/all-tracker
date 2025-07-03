import axios from "axios";
import { FATSECRET_BASE_URL } from "../../../../config";
import { getFatSecretToken } from "./fatSecretToken";
const API = FATSECRET_BASE_URL + "foods/search/v3";

export async function searchFatSecret(searchInput, page = 0) {
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
  return convertResults(response?.data.foods_search.results.food);
}

const convertResults = (results) => {
  var transformedResults = [];

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
        quantity: 1,
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
      quantity: defaultServing.quantity,
      servingsDetails: servings,
    });
  });

  return transformedResults;
};
