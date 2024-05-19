const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetUser = require("./getUser");
const getUser = new GetUser(dbService);
const DeleteUser = require("./deleteUser");
const deleteUser = new DeleteUser(dbService);
const UpdateUser = require("./updateUser");
const updateUser = new UpdateUser(dbService);
const UpdateTaskPreference = require("./updateTaskPreference");
const updateTaskPreference = new UpdateTaskPreference(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
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
    response = await getUser.getUser(user);
  } else if (event.httpMethod == "DELETE") {
    response = await deleteUser.deleteUser(user);
  } else if (event.httpMethod == "PUT") {
    const body = JSON.parse(event.body);
    if (body.taskPreference) {
      response = await updateTaskPreference.updateTaskPreference(
        user,
        JSON.parse(event.body),
      );
    } else {
      response = await updateUser.updateUser(user, JSON.parse(event.body));
    }
  }

  callback(null, response);
};
