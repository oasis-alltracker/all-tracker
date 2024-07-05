const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const verifyAppleToken = require("verify-apple-id-token").default;

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
    const appleToken = body.token;
    const aud = jwt_decode(appleToken).aud;

    const jwtClaims = await verifyAppleToken({
      idToken: appleToken,
      clientId: aud,
    });

    if (jwtClaims?.email) {
      const email = jwtClaims.email.toLowerCase();
      await userDB.userExistsOrCreateUser(email);
      const accessToken = jwt.sign({ email: email }, ACCESS_TOKEN_SECRET, {
        expiresIn: "48h",
      });
      const refreshToken = jwt.sign({ email: email }, ACCESS_TOKEN_SECRET, {
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
    } else {
      console.log("Apple token verification failed");
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({ accessToken: accessToken }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
    }
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
