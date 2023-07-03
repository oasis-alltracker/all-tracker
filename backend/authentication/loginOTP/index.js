const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const UserDB = require('../../utils/userDB');
const userDB = new UserDB(dbService);

const { isEmptyObject } = require('../../utils/objectUtils');

const FIVE_MINUTES=5*60*1000;

module.exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    var body = "";
  
    try {
      if (event.body) {
        const userCredentials = JSON.parse(event.body);

        const otpKey = {PK: userCredentials.email, SK: 'otp'};
        const otpResponse = await dbService.getItem(otpKey);
        
        if(!isEmptyObject(otpResponse)){
          const hashedPassword = otpResponse.Item.hashedOTP;
          const creationTime = new Date(otpResponse.Item.createdAt);

          if (new Date() - creationTime > FIVE_MINUTES) {
            body = JSON.stringify({loginFailed: "OTP expired."})
            statusCode = 410
          }
  
          else if (await bcrypt.compare(userCredentials.otp, hashedPassword)) {
              await userDB.userExistsOrCreateUser(userCredentials.email);
              const accessToken = jwt.sign({email: userCredentials.email}, ACCESS_TOKEN_SECRET, { expiresIn: '48h' });
              const refreshToken = jwt.sign({email: userCredentials.email}, ACCESS_TOKEN_SECRET, { expiresIn: '100d' });
              body = JSON.stringify({accessToken: accessToken, refreshToken: refreshToken});
              statusCode = 200
          }
          else{
              body = JSON.stringify({loginFailed: "Incorrect password."});
              statusCode = 401
          }
        }
        else{
          body = JSON.stringify({loginFailed: "User does not exist."});
          statusCode = 400;
        }
      }
      callback(null, {
          statusCode: statusCode,
          body: body,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }
      });
  
  } catch (e) {
      console.log(e);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify("Request failed"),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
      }
      })
    }
  };