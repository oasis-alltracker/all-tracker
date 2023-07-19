const jwt = require('jsonwebtoken');
const axios = require('axios');

const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');
const tableName = process.env.ALL_TRACKER_TABLE_NAME;

const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const UserDB = require('../../utils/userDB');
const userDB = new UserDB(dbService);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const body = JSON.parse(event.body);
    var googleToken = body.token;

    const userInfoResponse = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${googleToken}` }
    });

    if(userInfoResponse?.status == 200 && userInfoResponse?.data?.email){
      await userDB.userExistsOrCreateUser(userInfoResponse.email);
      const accessToken = jwt.sign({email: userInfoResponse.email}, ACCESS_TOKEN_SECRET, { expiresIn: '48h' });
      const refreshToken = jwt.sign({email: userInfoResponse.email}, ACCESS_TOKEN_SECRET, { expiresIn: '100d' });

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({accessToken: accessToken, refreshToken: refreshToken}),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }
      });
    }
    else{
      console.log("Google auth did not return an email");
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({accessToken: accessToken}),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }
      });
    }
  } 
  catch (e) {
    console.log(e);
    callback(null, {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    });
  }
};