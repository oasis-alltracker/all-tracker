const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const UserDB = require('../../utils/userDB');
const userDB = new UserDB(dbService);

const bcrypt = require('bcryptjs');
const SQS = require('aws-sdk/clients/sqs');
const sqs = new SQS();
const queueUrl = process.env.SEND_OTP_URL;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const userCredentials = JSON.parse(event.body);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp,saltRounds);
    const hashedPassword = await bcrypt.hash(userCredentials.password, saltRounds);

    const existingUser = userDB.userExistsOrCreateUser(email, hashedPassword);

    if(!existingUser || existingUser && await bcrypt.compare(userCredentials.password, existingUser.hashedPassword)) {

      await createOTP(userCredentials.email, hashedOTP);

      const params = {
        MessageBody: JSON.stringify({email: userCredentials.email, otp: otp}),
        QueueUrl: queueUrl,
      };
      await sqs.sendMessage(params).promise();
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        }
      });
      //rest failed attempts
    }
    else{
        body = JSON.stringify({loginFailed: "Incorrect password."});
        statusCode = 401;
        //update failed attempts
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

async function createOTP(email, hashedOTP) {

  const data = {
    PK: `${email}`, 
    SK: `otp`,
    hashedOTP: hashedOTP,
    createdAt: new Date().toJSON()
  };

  await dbService.putItem(data);
  return {ID: data.SK};
}