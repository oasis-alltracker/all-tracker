const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetNotifications = require("./getNotifications");
const getNotifications = new GetNotifications(dbService);
const GetNotification = require("./getNotification");
const getNotification = new GetNotification(dbService);
const UpdateNotification = require("./updateNotification");
const updateNotification = new UpdateNotification(dbService);
const DeleteNotification = require("./deleteNotification");
const deleteNotification = new DeleteNotification(dbService);

const { authenticateToken } = require("../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const notificationID = event.pathParameters?.notificationID;

  var response;

  if (!user?.email) {
    callback(null, {
      statusCode: 401,
      body: JSON.stringify("Unauthorized"),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }

  if (event.httpMethod == "GET") {
    if (notificationID) {
      response = await getNotification.getNotification(user, notificationID);
    } else {
      response = await getNotifications.getNotifications(user);
    }
  } else if (event.httpMethod == "PUT") {
    response = await updateNotification.updateNotification(
      user,
      notificationID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteNotification.deleteNotification(
      user,
      notificationID,
    );
  }

  callback(null, response);
};
