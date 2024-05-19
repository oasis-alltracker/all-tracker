class UpdateExercise {
  constructor(db) {
    this.DB = db;
  }

  async updateExercise(user, exerciseID, body) {
    try {
      await this.updateEntry(user.email, exerciseID, body);

      return {
        statusCode: 200,
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

  async updateEntry(email, exerciseID, exerciseEntry) {
    const key = { PK: `${email}-exercise`, SK: exerciseID };
    const expression =
      "SET #name = :name, #type = :type, #muscle = :muscle, #equipment = :equipment, #difficulty = :difficulty, #instructions = :instructions, #sets = :sets";
    const names = {
      "#name": "name",
      "#type": "type",
      "#muscle": "muscle",
      "#equipment": "equipment",
      "#difficulty": "difficulty",
      "#instructions": "instructions",
      "#sets": "sets",
    };
    const values = {
      ":name": exerciseEntry.name,
      ":type": exerciseEntry.type,
      ":muscle": exerciseEntry.muscle,
      ":equipment": exerciseEntry.equipment,
      ":difficulty": exerciseEntry.difficulty,
      ":instructions": exerciseEntry.instructions,
      ":sets": exerciseEntry.sets,
    };
    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateExercise;
