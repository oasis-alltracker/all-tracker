const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetExerciseEntries = require('./getExerciseEntries');
const getExerciseEntries = new GetExerciseEntries(dbService);
const UpdateExerciseEntry = require('./updateExerciseEntry');
const updateExerciseEntry = new UpdateExerciseEntry(dbService);
const CreateExerciseEntry = require('./createExerciseEntry');
const createExerciseEntry = new CreateExerciseEntry(dbService);
const DeleteExerciseEntry = require('./deleteExerciseEntry');
const deleteExerciseEntry = new DeleteExerciseEntry(dbService);

const { authenticateToken } = require('../../utils/authenticateToken');

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const exerciseEntryID = event.pathParameters?.exerciseEntryID;

  var response;

  if(!user?.email) {
    callback(null, {
      statusCode: 401,
      body: JSON.stringify("Unauthorized"),
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
      }
    });
  }

  if(event.httpMethod == "GET") {
    response = await getExerciseEntries.getExerciseEntries(user, event.queryStringParameters);
  }
  else if(event.httpMethod == "PUT") {
    response = await updateExerciseEntry.updateExerciseEntry(user, exerciseEntryID, JSON.parse(event.body));
  }
  else if(event.httpMethod == "POST") {
    response = await createExerciseEntry.createExerciseEntry(user, JSON.parse(event.body));
  }
  else if(event.httpMethod == "DELETE") {
    response = await deleteExerciseEntry.deleteExerciseEntry(user, exerciseEntryID);
  }

  callback(null, response);
};
