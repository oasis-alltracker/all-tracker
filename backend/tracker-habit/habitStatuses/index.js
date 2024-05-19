const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetHabitStatuses = require("./getHabitStatuses");
const getHabitStatuses = new GetHabitStatuses(dbService);
const UpdateHabitStatus = require("./updateHabitStatus");
const updateHabitStatus = new UpdateHabitStatus(dbService);
const CreateHabitStatus = require("./createHabitStatus");
const createHabitStatus = new CreateHabitStatus(dbService);
const DeleteHabitStatus = require("./deleteHabitStatus");
const deleteHabitStatus = new DeleteHabitStatus(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const habitStatusID = event.pathParameters?.habitStatusID;
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
    response = await getHabitStatuses.getHabitStatuses(
      user,
      event.queryStringParameters,
    );
  } else if (event.httpMethod == "PUT") {
    response = await updateHabitStatus.updateHabitStatus(
      user,
      habitStatusID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createHabitStatus.createHabitStatus(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteHabitStatus.deleteHabitStatus(user, habitStatusID);
  }

  callback(null, response);
};
