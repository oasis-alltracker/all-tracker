const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetSleepReports  = require('./getSleepReports');
const getSleepReports = new GetSleepReports(dbService);
const UpdateSleepReport = require('./updateSleepReport');
const updateSleepReport = new UpdateSleepReport(dbService);
const CreateSleepReport = require('./createSleepReport');
const createSleepReport = new CreateSleepReport(dbService);
const DeleteSleepReport = require('./deleteSleepReport');
const deleteSleepReport = new DeleteSleepReport(dbService);

const { authenticateToken } = require('../../utils/authenticateToken');

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const sleepReportID = event.pathParameters?.sleepReportID;

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
    response = await getSleepReports.getSleepReports(user, event.queryStringParameters);
  }
  else if(event.httpMethod == "PUT") {
    response = await updateSleepReport.updateSleepReport(user, sleepReportID, JSON.parse(event.body));
  }
  else if(event.httpMethod == "POST") {
    response = await createSleepReport.createSleepReport(user, JSON.parse(event.body));
  }
  else if(event.httpMethod == "DELETE") {
    response = await deleteSleepReport.deleteSleepReport(user, sleepReportID);
  }

  callback(null, response);
};
