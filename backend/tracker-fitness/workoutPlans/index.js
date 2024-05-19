const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetWorkoutPlans = require("./getWorkoutPlans");
const getWorkoutPlans = new GetWorkoutPlans(dbService);
const UpdateWorkoutPlan = require("./updateWorkoutPlan");
const updateWorkoutPlan = new UpdateWorkoutPlan(dbService);
const CreateWorkoutPlan = require("./createWorkoutPlan");
const createWorkoutPlan = new CreateWorkoutPlan(dbService);
const DeleteWorkoutPlan = require("./deleteWorkoutPlan");
const deleteWorkoutPlan = new DeleteWorkoutPlan(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const workoutPlanID = event.pathParameters?.workoutPlanID;
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
    response = await getWorkoutPlans.getWorkoutPlans(user);
  } else if (event.httpMethod == "PUT") {
    response = await updateWorkoutPlan.updateWorkoutPlan(
      user,
      workoutPlanID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createWorkoutPlan.createWorkoutPlan(
      user,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "DELETE") {
    response = await deleteWorkoutPlan.deleteWorkoutPlan(user, workoutPlanID);
  }

  callback(null, response);
};
