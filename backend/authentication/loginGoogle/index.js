const jwt = require("jsonwebtoken");
const axios = require("axios");

const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");
const tableName = process.env.ALL_TRACKER_TABLE_NAME;

const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const UserDB = require("../../utils/userDB");
const userDB = new UserDB(dbService);

const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "315014991553-li1flvq9ro8h1ulm4qa9t3p87u8p1usn.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const body = JSON.parse(event.body);
    var googleToken = body.token;

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (payload?.email_verified && payload?.email) {
      const email = payload.email.toLowerCase();
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
      console.log("Google auth did not return an email");
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
