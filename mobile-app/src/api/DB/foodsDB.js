require("dotenv").config();

class FoodsDB {
  static async searchFoodByName(label) {
    return [
      {
        foodId: "food_bkk0d6vac2zowfb6sjtmib54wmfn",
        label: "Chips",
        calories: 343,
        measures: [
          {
            label: "Whole",
          },
          {
            label: "Serving",
          },
          {
            label: "Gram",
          },
        ],
      },
      {
        foodId: "food_bkk0d6vac2zowfb6sjtmib54wmfn",
        label: "Chips",
        calories: 343,
        measures: [
          {
            label: "Whole",
          },
          {
            label: "Serving",
          },
          {
            label: "Gram",
          },
        ],
      },
    ];
  }
  static async searchFoodByBarcode(ba) {
    return [
      {
        foodId: "food_bkk0d6vac2zowfb6sjtmib54wmfn",
        label: "Chips",
        calories: 343,
        measures: [
          {
            label: "Whole",
          },
          {
            label: "Serving",
          },
          {
            label: "Gram",
          },
        ],
      },
    ];
  }
  static async getFoodNutrition(quantity, measureType, foodID) {
    return { calories: 123, fats: 123.1, proteins: 124, carbs: 121.2 };
  }
}
export default FoodsDB;
