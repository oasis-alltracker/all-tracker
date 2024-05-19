const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetWellnessReports = require("./getWellnessReports");
const getWellnessReports = new GetWellnessReports(dbService);
const UpdateWellnessReport = require("./updateWellnessReport");
const updateWellnessReport = new UpdateWellnessReport(dbService);
const CreateWellnessReport = require("./createWellnessReport");
const createWellnessReport = new CreateWellnessReport(dbService);
const DeleteWellnessReport = require("./deleteWellnessReport");
const deleteWellnessReport = new DeleteWellnessReport(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const wellnessReportID = event.pathParameters?.wellnessReportID;

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
    response = await getWellnessReports.getWellnessReports(
      user,
      event.queryStringParameters,
    );
  } else if (event.httpMethod == "PUT") {
    response = await updateWellnessReport.updateWellnessReport(
      user,
      wellnessReportID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createWellnessReport.createWellnessReport(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteWellnessReport.deleteWellnessReport(
      user,
      wellnessReportID,
    );
  }

  callback(null, response);
};
