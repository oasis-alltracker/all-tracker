const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetHealthInfo = require('./getHealthInfo');
const getHealthInfo = new GetHealthInfo(dbService);
const UpdateHealthInfo = require('./updateHealthInfo');
const updateHealthInfo = new UpdateHealthInfo(dbService);

const { authenticateToken } = require('../../utils/authenticateToken');

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
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
    response = await getHealthInfo.getHealthInfo(user);
  }
  else if(event.httpMethod == "PUT") {
    response = await updateHealthInfo.updateHealthInfo(user, JSON.parse(event.body));
  }

  callback(null, response);
};
