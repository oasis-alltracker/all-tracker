const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetHabitStats = require("./getHabitStats");
const getHabitStats = new GetHabitStats(dbService);

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

  var days = [
    event.queryStringParameters.monday,
    event.queryStringParameters.tuesday,
    event.queryStringParameters.wednesday,
    event.queryStringParameters.thursday,
    event.queryStringParameters.friday,
    event.queryStringParameters.saturday,
    event.queryStringParameters.sunday,
  ];

  if (event.httpMethod == "GET") {
    response = await getHabitStats.getHabitStats(user, days);
  }
  callback(null, response);
};
