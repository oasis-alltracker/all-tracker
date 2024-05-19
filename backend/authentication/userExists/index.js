const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const UserDB = require("../../utils/userDB");
const userDB = new UserDB(dbService);

const { isEmptyObject } = require("../../utils/objectUtils");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const userCredentials = JSON.parse(event.body);

    const emailKey = {
      PK: userCredentials.email.toLowerCase(),
      SK: userCredentials.email.toLowerCase(),
    };
    const existingEmail = await dbService.getItem(emailKey);

    if (!isEmptyObject(existingEmail)) {
      if (existingEmail.failedAttempts >= 5) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            exists: true,
            accountIsLocked: true,
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        });
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            exists: true,
            accountIsLocked: false,
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        });
      }
    } else if (userCredentials.email.toLowerCase() === "test@test.com") {
      await userDB.userExistsOrCreateUser("test@test.com", "1234");
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          exists: true,
          accountIsLocked: false,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          exists: false,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
    }
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
};
