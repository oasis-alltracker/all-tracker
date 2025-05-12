const {DynamoDBDocument} = require("@aws-sdk/lib-dynamodb");
const {DynamoDB} = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const CreateDietButtonResponse = require ("./createDietButtonResponse");
const createDietButtonResponse = new CreateDietButtonResponse(dbService);

const {authenicateToken} = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const user = authenicateToken(event.handler);
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

    if (event.httpMethod == "POST") {
        response = await createDietButtonResponse.CreateDietButtonResponse(
            user,
            JSON.parse(event.body),
        );
    }

    callback(null, response);
}