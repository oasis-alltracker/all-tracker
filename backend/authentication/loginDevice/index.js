const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");
const tableName = process.env.ALL_TRACKER_TABLE_NAME;

const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const UserDB = require("../../utils/userDB");
const userDB = new UserDB(dbService);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const body = JSON.parse(event.body);
    const deviceID = body.deviceID;

    await userDB.userExistsOrCreateUser(deviceID);
    const accessToken = jwt.sign({ email: deviceID }, ACCESS_TOKEN_SECRET, {
      expiresIn: "48h",
    });
    const refreshToken = jwt.sign({ email: deviceID }, ACCESS_TOKEN_SECRET, {
      expiresIn: "100d",
    });

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  } catch (e) {
    console.log(e);
    callback(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }
};
