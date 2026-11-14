const { presentFields, fieldsAreValid } = require("./validateReflectiveMeal");

class UpdateReflectiveMeal {
  constructor(db) {
    this.DB = db;
  }

  // Partial edit of what the log-meal sheet sets. Season, date and the
  // seasonal question describe when the meal was logged and aren't editable.
  async updateReflectiveMeal(user, reflectiveMealID, body) {
    const fields = presentFields(body);
    if (fields.length === 0 || !fieldsAreValid(body, fields)) {
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
      await this.updateEntry(user.email, reflectiveMealID, body, fields);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      if (e?.name === "ConditionalCheckFailedException") {
        return {
          statusCode: 400,
          body: JSON.stringify("Entry not found"),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      }
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

  async updateEntry(email, reflectiveMealID, reflectiveMeal, fields) {
    const key = { PK: `${email}-reflectiveMeal`, SK: reflectiveMealID };
    const expression =
      "SET " + fields.map((field) => `#${field} = :${field}`).join(", ");
    const names = {};
    const values = {};
    fields.forEach((field) => {
      names[`#${field}`] = field;
      values[`:${field}`] = reflectiveMeal[field];
    });
    const condition = "attribute_exists(PK)";
    await this.DB.updateItem(expression, key, names, values, condition);
  }
}
module.exports = UpdateReflectiveMeal;
