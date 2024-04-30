const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetToDos = require("./getToDos");
const getToDos = new GetToDos(dbService);
const UpdateToDo = require("./updateToDo");
const updateToDo = new UpdateToDo(dbService);
const CreateToDo = require("./createToDo");
const createToDo = new CreateToDo(dbService);
const DeleteToDo = require("./deleteToDo");
const deleteToDo = new DeleteToDo(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const toDoID = event.pathParameters?.toDoID;
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
    response = await getToDos.getToDos(user, event.queryStringParameters);
  } else if (event.httpMethod == "PUT") {
    response = await updateToDo.updateToDo(
      user,
      toDoID,
      JSON.parse(event.body)
    );
  } else if (event.httpMethod == "POST") {
    response = await createToDo.createToDo(user, JSON.parse(event.body));
  } else if (event.httpMethod == "DELETE") {
    response = await deleteToDo.deleteToDo(user, toDoID);
  }

  callback(null, response);
};
