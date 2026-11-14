const { DynamoDBDocument } = require("@aws-sdk/lib-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = DynamoDBDocument.from(new DynamoDB());
const dbService = new DbUtils(DB, tableName);

const GetJournalEntries = require("./getJournalEntries");
const getJournalEntries = new GetJournalEntries(dbService);
const UpdateJournalEntry = require("./updateJournalEntry");
const updateJournalEntry = new UpdateJournalEntry(dbService);
const CreateJournalEntry = require("./createJournalEntry");
const createJournalEntry = new CreateJournalEntry(dbService);
const DeleteJournalEntry = require("./deleteJournalEntry");
const deleteJournalEntry = new DeleteJournalEntry(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const journalEntryID = event.pathParameters?.journalEntryID;

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
    response = await getJournalEntries.getJournalEntries(
      user,
      event.queryStringParameters,
    );
  } else if (event.httpMethod == "PUT") {
    response = await updateJournalEntry.updateJournalEntry(
      user,
      journalEntryID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createJournalEntry.createJournalEntry(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteJournalEntry.deleteJournalEntry(
      user,
      journalEntryID,
    );
  }

  callback(null, response);
};
