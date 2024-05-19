const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetExercises = require("./getExercises");
const getExercises = new GetExercises(dbService);
const UpdateExercise = require("./updateExercise");
const updateExercise = new UpdateExercise(dbService);
const CreateExercise = require("./createExercise");
const createExercise = new CreateExercise(dbService);
const DeleteExercise = require("./deleteExercise");
const deleteExercise = new DeleteExercise(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const exerciseID = event.pathParameters?.exerciseID;
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
    response = await getExercises.getExercises(
      user,
      event.queryStringParameters,
    );
  } else if (event.httpMethod == "PUT") {
    response = await updateExercise.updateExercise(
      user,
      exerciseID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createExercise.createExercise(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteExercise.deleteExercise(user, exerciseID);
  }

  callback(null, response);
};
