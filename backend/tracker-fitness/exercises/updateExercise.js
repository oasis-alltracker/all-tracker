// Fields an edit can set. Anything else in the body is ignored.
const ALLOWED_FIELDS = [
  "name",
  "type",
  "muscle",
  "equipment",
  "difficulty",
  "instructions",
];

class UpdateExercise {
  constructor(db) {
    this.DB = db;
  }

  async updateExercise(user, exerciseID, body) {
    const fields = ALLOWED_FIELDS.filter((field) => body?.[field] !== undefined);
    if (
      fields.length === 0 ||
      (body.name !== undefined &&
        (typeof body.name !== "string" || body.name.trim() === ""))
    ) {
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
      await this.updateEntry(user.email, exerciseID, body, fields);

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

  async updateEntry(email, exerciseID, exercise, fields) {
    const key = { PK: `${email}-exercise`, SK: exerciseID };
    const expression =
      "SET " + fields.map((field) => `#${field} = :${field}`).join(", ");
    const names = {};
    const values = {};
    fields.forEach((field) => {
      names[`#${field}`] = field;
      values[`:${field}`] = exercise[field];
    });
    const condition = "attribute_exists(PK)";
    await this.DB.updateItem(expression, key, names, values, condition);
  }
}
module.exports = UpdateExercise;
