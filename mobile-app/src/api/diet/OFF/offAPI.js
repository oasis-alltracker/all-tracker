import axios from "axios";
const API = "https://world.openfoodfacts.net/api/v2/product/";

export async function barcodeSearchOFF(barcode) {
  const request = API + barcode;
  try {
    const response = await axios.get(request);
    const transformedResult = convertResults(response?.data);
    return transformedResult;
  } catch (e) {
    return null;
  }
}

const convertResults = (response) => {
  var nutriments = response.product.nutriments;
  nutriments = Object.fromEntries(
    Object.entries(nutriments).filter(([_, value]) => value !== "")
  );
  var serving = {
    calorieCount:
      nutriments["energy-kcal_serving"] ??
      nutriments["energy-kcal_value"] ??
      "0",
    carbCount:
      nutriments?.carbohydrates_serving ??
      nutriments?.carbohydrates_value ??
      "0",
    fatCount: nutriments?.fat_serving ?? nutriments?.fat_value ?? "0",
    proteinCount:
      nutriments?.proteins_serving ?? nutriments?.proteins_value ?? "0",
    measurement: response.product?.serving_size ?? "per serving",
  };

  serving.calorieCount = serving.calorieCount.toFixed(2);
  serving.carbCount = serving.carbCount.toFixed(2);
  serving.fatCount = serving.fatCount.toFixed(2);
  serving.proteinCount = serving.proteinCount.toFixed(2);

  var brandName = response.product?.brands ?? "";
  var name =
    response.product?.product_name_en ?? response.product?.product_name;
  var transformedResult = {
    name: `${brandName} ${name}`,
    foodItemID: response.product._id,
    calorieCount: serving.calorieCount,
    carbCount: serving.carbCount,
    fatCount: serving.fatCount,
    proteinCount: serving.proteinCount,
    measurement: serving.measurement,
    quantity: 1,
    servingsDetails: [serving],
  };

  return transformedResult;
};
