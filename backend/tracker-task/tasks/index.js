const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetTasks = require("./getTasks");
const getTasks = new GetTasks(dbService);
const GetTasksForDay = require("./getTasksForDay");
const getTasksForDay = new GetTasksForDay(dbService);
const UpdateTask = require("./updateTask");
const updateTask = new UpdateTask(dbService);
const CreateTask = require("./createTask");
const createTask = new CreateTask(dbService);
const DeleteTask = require("./deleteTask");
const deleteTask = new DeleteTask(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const taskID = event.pathParameters?.taskID;
  const dateStamp = event.queryStringParameters?.dateStamp;
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
    if (dateStamp) {
      response = await getTasksForDay.getTasksForDay(user, dateStamp);
    } else {
      response = await getTasks.getTasks(user);
    }
  } else if (event.httpMethod == "GET") {
    response = await getTasks.getTasks(user);
  } else if (event.httpMethod == "PUT") {
    response = await updateTask.updateTask(
      user,
      taskID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createTask.createTask(user, JSON.parse(event.body));
  } else if (event.httpMethod == "DELETE") {
    response = await deleteTask.deleteTask(user, taskID);
  }

  callback(null, response);
};
