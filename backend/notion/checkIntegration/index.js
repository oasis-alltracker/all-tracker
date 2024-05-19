const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const user = authenticateToken(event.headers);

    const emailKey = { PK: user.email, SK: user.email };
    const account = await dbService.getItem(emailKey);

    if (account?.Item?.notionIntegrated) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          integrated: true,
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
          integrated: false,
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
