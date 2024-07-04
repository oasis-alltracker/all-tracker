const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetDietGoals = require("./getDietGoals");
const getDietGoals = new GetDietGoals(dbService);
const UpdateDietGoals = require("./updateDietGoals");
const updateDietGoals = new UpdateDietGoals(dbService);

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
    response = await getDietGoals.getDietGoals(user);
  } else if (event.httpMethod == "PUT") {
    response = await updateDietGoals.updateDietGoals(
      user,
      JSON.parse(event.body)
    );
  }

  callback(null, response);
};
