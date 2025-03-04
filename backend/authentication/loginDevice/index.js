const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");
const tableName = process.env.ALL_TRACKER_TABLE_NAME;

const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const bcrypt = require("bcryptjs");

const UserDB = require("../../utils/userDB");
const userDB = new UserDB(dbService);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const userCredentials = JSON.parse(event.body);
    const deviceID = userCredentials.deviceID;

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      userCredentials.password,
      saltRounds
    );
    const existingUser = await userDB.userExistsOrCreateUser(
      deviceID,
      hashedPassword
    );
    var body;
    if (existingUser && existingUser.infractionCount === undefined) {
      await userDB.updateInfractionCount(deviceID, 0);
    }
    if (
      !existingUser ||
      existingUser.infractionCount === undefined ||
      existingUser.infractionCount < 2
    ) {
      if (!existingUser || existingUser.failedAttempts < 4) {
        if (existingUser) {
          if (
            !existingUser.hashedPassword ||
            !(await bcrypt.compare(
              userCredentials.password,
              existingUser.hashedPassword
            ))
          ) {
            if (existingUser.failedAttempts >= 3) {
              body = { isCorrectPassword: false, isAccountLocked: true };
              await userDB.updateInfractionCount(
                deviceID,
                existingUser.infractionCount + 1
              );
            } else {
              body = { isCorrectPassword: false, isAccountLocked: false };
            }
            await userDB.updateFailedAttemptsCount(
              deviceID,
              existingUser.failedAttempts + 1
            );
            callback(null, {
              statusCode: 200,
              body: JSON.stringify(body),
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
              },
            });
            return;
          }
        }
        const accessToken = jwt.sign(
          { deviceID: deviceID },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: "48h",
          }
        );
        const refreshToken = jwt.sign(
          { deviceID: deviceID },
          ACCESS_TOKEN_SECRET,
          {
            expiresIn: "100d",
          }
        );
        body = {
          isCorrectPassword: true,
          isAccountLocked: false,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        await userDB.updateFailedAttemptsCount(deviceID, 0);
      } else {
        body = { isCorrectPassword: false, isAccountLocked: true };
      }
    } else {
      body = {
        isCorrectPassword: false,
        isAccountLocked: true,
        isAccountSuspended: true,
      };
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
