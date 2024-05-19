const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetFoodEntries = require("./getFoodEntries");
const getFoodEntries = new GetFoodEntries(dbService);
const UpdateFoodEntry = require("./updateFoodEntry");
const updateFoodEntry = new UpdateFoodEntry(dbService);
const CreateFoodEntry = require("./createFoodEntry");
const createFoodEntry = new CreateFoodEntry(dbService);
const DeleteFoodEntry = require("./deleteFoodEntry");
const deleteFoodEntry = new DeleteFoodEntry(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const foodEntryID = event.pathParameters?.foodEntryID;

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
    response = await getFoodEntries.getFoodEntries(
      user,
      event.queryStringParameters,
    );
  } else if (event.httpMethod == "PUT") {
    response = await updateFoodEntry.updateFoodEntry(
      user,
      foodEntryID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createFoodEntry.createFoodEntry(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteFoodEntry.deleteFoodEntry(user, foodEntryID);
  }

  callback(null, response);
};
