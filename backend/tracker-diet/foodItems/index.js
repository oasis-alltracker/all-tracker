const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const GetFoodItems = require("./getFoodItems");
const getFoodItems = new GetFoodItems(dbService);
const GetFoodItem = require("./getFoodItem");
const getFoodItem = new GetFoodItem(dbService);
const UpdateFoodItem = require("./updateFoodItem");
const updateFoodItem = new UpdateFoodItem(dbService);
const CreateFoodItem = require("./createFoodItem");
const createFoodItem = new CreateFoodItem(dbService);
const DeleteFoodItem = require("./deleteFoodItem");
const deleteFoodItem = new DeleteFoodItem(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const foodItemID = event.pathParameters?.foodItemID;
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
    if (foodItemID) {
      response = await getFoodItem.getFoodItem(user, foodItemID);
    } else {
      response = await getFoodItems.getFoodItems(user);
    }
  } else if (event.httpMethod == "PUT") {
    response = await updateFoodItem.updateFoodItem(
      user,
      foodItemID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createFoodItem.createFoodItem(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteFoodItem.deleteFoodItem(user, foodItemID);
  }

  callback(null, response);
};
