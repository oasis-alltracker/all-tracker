const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetUser = require('./getUser');
const getUser = new GetUser(dbService);


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
    response = await getUser.getUser(user);
  }

  callback(null, response);
};
