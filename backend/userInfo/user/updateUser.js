// Only these user attributes can be set through PUT v1/user. Anything else in
// the body is ignored (season is owned by v1/seasons).
const ALLOWED_FIELDS = [
  "isSetupComplete",
  "trackingPreferences",
  "taskPreference",
  "nutritionPath",
  "name",
];

// The name the app greets the user by ("Good morning, [Name]").
const MAX_NAME_LENGTH = 50;

function isValidName(name) {
  return (
    typeof name === "string" &&
    name.trim() !== "" &&
    name.trim().length <= MAX_NAME_LENGTH
  );
}

class UpdateUser {
  constructor(db) {
    this.DB = db;
  }

  async updateUser(user, body) {
    const fields = ALLOWED_FIELDS.filter((field) => body?.[field] !== undefined);
    const invalidName = body?.name !== undefined && !isValidName(body.name);
    if (fields.length === 0 || invalidName) {
      return {
        statusCode: 400,
        body: JSON.stringify(invalidName ? "Invalid name" : "No updatable fields"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      await this.updateInfo(user.email, body, fields);

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

  async updateInfo(email, userInfo, fields) {
    const key = { PK: `${email}`, SK: `${email}` };
    const expression =
      "SET " + fields.map((field) => `#${field} = :${field}`).join(", ");
    const names = {};
    const values = {};
    fields.forEach((field) => {
      names[`#${field}`] = field;
      values[`:${field}`] =
        field === "name" ? userInfo.name.trim() : userInfo[field];
    });
    await this.DB.updateItem(expression, key, names, values);
  }
}
module.exports = UpdateUser;
module.exports.ALLOWED_FIELDS = ALLOWED_FIELDS;
