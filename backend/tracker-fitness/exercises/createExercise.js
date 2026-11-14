const { v1: uuidv1 } = require("uuid");

class CreateExercise {
  constructor(db) {
    this.DB = db;
  }

  async createExercise(user, body) {
    if (typeof body?.name !== "string" || body.name.trim() === "") {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid exercise"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      const response = await this.create(user.email, body);

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

  // Exercises are the user's library, shared across all of their plans and
  // sessions. Set counts live on the plan (exercisesAndSets), not here.
  async create(email, exercise) {
    const exerciseID = uuidv1();

    const data = {
      PK: `${email}-exercise`,
      SK: `${exerciseID}`,
      name: exercise.name,
      type: exercise.type ?? null,
      muscle: exercise.muscle ?? null,
      equipment: exercise.equipment ?? null,
      difficulty: exercise.difficulty ?? null,
      instructions: exercise.instructions ?? null,
    };

    await this.DB.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = CreateExercise;
