const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetWorkoutEntries = require("./getWorkoutEntries");
const getWorkoutEntries = new GetWorkoutEntries(dbService);
const UpdateWorkoutEntry = require("./updateWorkoutEntry");
const updateWorkoutEntry = new UpdateWorkoutEntry(dbService);
const CreateWorkoutEntry = require("./createWorkoutEntry");
const createWorkoutEntry = new CreateWorkoutEntry(dbService);
const DeleteWorkoutEntry = require("./deleteWorkoutEntry");
const deleteWorkoutEntry = new DeleteWorkoutEntry(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const workoutEntryID = event.pathParameters?.workoutEntryID;

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
    response = await getWorkoutEntries.getWorkoutEntries(
      user,
      event.queryStringParameters,
    );
  } else if (event.httpMethod == "PUT") {
    response = await updateWorkoutEntry.updateWorkoutEntry(
      user,
      workoutEntryID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createWorkoutEntry.createWorkoutEntry(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteWorkoutEntry.deleteWorkoutEntry(
      user,
      workoutEntryID,
    );
  }

  callback(null, response);
};
