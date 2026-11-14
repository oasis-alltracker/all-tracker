const { v1: uuidv1 } = require("uuid");
const { SEASONS } = require("../../userInfo/seasons/createSeason");
const { presentFields, fieldsAreValid } = require("./validateReflectiveMeal");

class CreateReflectiveMeal {
  constructor(db) {
    this.DB = db;
  }

  async createReflectiveMeal(user, body) {
    if (
      body?.mealDescription === undefined ||
      !fieldsAreValid(body, presentFields(body)) ||
      !SEASONS.includes(body.season) ||
      !/^\d{8}$/.test(body.dateStamp) ||
      (body.seasonalQuestion !== undefined &&
        body.seasonalQuestion !== null &&
        typeof body.seasonalQuestion !== "string")
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid reflective meal"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      const response = await this.createEntry(user.email, body);

      return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify("Request failed"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }
  }

  // Meals are logged when eaten; there is no breakfast/lunch/dinner field.
  // seasonalQuestion is the season's question as shown above the note, kept so
  // the note reads correctly after copy or season changes.
  async createEntry(email, reflectiveMeal) {
    const reflectiveMealID = uuidv1();

    const data = {
      PK: `${email}-reflectiveMeal`,
      SK: `${reflectiveMeal.dateStamp}-${reflectiveMealID}`,
      mealDescription: reflectiveMeal.mealDescription,
      feelingDescriptors: reflectiveMeal.feelingDescriptors ?? [],
      bodyFeelingDescriptors: reflectiveMeal.bodyFeelingDescriptors ?? [],
      seasonalQuestion: reflectiveMeal.seasonalQuestion ?? null,
      note: reflectiveMeal.note ?? null,
      season: reflectiveMeal.season,
      time: reflectiveMeal.time ?? null,
      createdAt: new Date().toISOString(),
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateReflectiveMeal;
