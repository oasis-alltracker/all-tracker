const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const GetSeasons = require("./getSeasons");
const getSeasons = new GetSeasons(dbService);
const CreateSeason = require("./createSeason");
const createSeason = new CreateSeason(dbService);

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
    return;
  }

  if (event.httpMethod == "GET") {
    response = await getSeasons.getSeasons(user, event.queryStringParameters);
  } else if (event.httpMethod == "POST") {
    response = await createSeason.createSeason(user, JSON.parse(event.body));
  }

  callback(null, response);
};
