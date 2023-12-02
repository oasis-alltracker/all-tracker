const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const UserDB = require("../../utils/userDB");
const userDB = new UserDB(dbService);

const bcrypt = require("bcryptjs");
const SQS = require("aws-sdk/clients/sqs");
const sqs = new SQS();
const queueUrl = process.env.SEND_OTP_URL;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const userCredentials = JSON.parse(event.body);
    const email = userCredentials.email.toLowerCase();
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const hashedPassword = await bcrypt.hash(
      userCredentials.password,
      saltRounds
    );
    const existingUser = await userDB.userExistsOrCreateUser(
      email,
      hashedPassword
    );
    var body;
    if (existingUser && existingUser.failedAttempts < 5)
      if (
        await bcrypt.compare(
          userCredentials.password,
          existingUser.hashedPassword
        )
      ) {
        await createOTP(email, hashedOTP);

        const params = {
          MessageBody: JSON.stringify({ email: email, otp: otp }),
          QueueUrl: queueUrl,
        };
        await sqs.sendMessage(params).promise();
        body = { isCorrectPassword: true, isAccountLocked: false };
        await userDB.updateFailedAttemptsCount(0);
      } else {
        if (failedAttempts >= 4) {
          body = { isCorrectPassword: false, isAccountLocked: true };
        } else {
          body = { isCorrectPassword: false, isAccountLocked: false };
        }
        await userDB.updateFailedAttemptsCount(existingUser.failedAttempts);
      }
    else {
      body = { isCorrectPassword: false, isAccountLocked: true };
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
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

async function createOTP(email, hashedOTP) {
  const data = {
    PK: `${email}`,
    SK: `otp`,
    hashedOTP: hashedOTP,
    createdAt: new Date().toJSON(),
  };

  await dbService.putItem(data);
  return { ID: data.SK };
}
