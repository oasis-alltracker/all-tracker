const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const GetReflectiveMeals = require("./getReflectiveMeals");
const getReflectiveMeals = new GetReflectiveMeals(dbService);
const UpdateReflectiveMeal = require("./updateReflectiveMeal");
const updateReflectiveMeal = new UpdateReflectiveMeal(dbService);
const CreateReflectiveMeal = require("./createReflectiveMeal");
const createReflectiveMeal = new CreateReflectiveMeal(dbService);
const DeleteReflectiveMeal = require("./deleteReflectiveMeal");
const deleteReflectiveMeal = new DeleteReflectiveMeal(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const reflectiveMealID = event.pathParameters?.reflectiveMealID;

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
    return;
  }

  if (event.httpMethod == "GET") {
    response = await getReflectiveMeals.getReflectiveMeals(
      user,
      event.queryStringParameters,
    );
  } else if (event.httpMethod == "PUT") {
    response = await updateReflectiveMeal.updateReflectiveMeal(
      user,
      reflectiveMealID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createReflectiveMeal.createReflectiveMeal(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteReflectiveMeal.deleteReflectiveMeal(
      user,
      reflectiveMealID,
    );
  }

  callback(null, response);
};
