const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const GetHabits = require("./getHabits");
const getHabits = new GetHabits(dbService);
const UpdateHabit = require("./updateHabit");
const updateHabit = new UpdateHabit(dbService);
const CreateHabit = require("./createHabit");
const createHabit = new CreateHabit(dbService);
const DeleteHabit = require("./deleteHabit");
const deleteHabit = new DeleteHabit(dbService);

const { authenticateToken } = require("../../utils/authenticateToken");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = authenticateToken(event.headers);
  const habitID = event.pathParameters?.habitID;
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
    response = await getHabits.getHabits(user);
  } else if (event.httpMethod == "PUT") {
    response = await updateHabit.updateHabit(
      user,
      habitID,
      JSON.parse(event.body),
    );
  } else if (event.httpMethod == "POST") {
    response = await createHabit.createHabit(user, JSON.parse(event.body));
  } else if (event.httpMethod == "DELETE") {
    response = await deleteHabit.deleteHabit(user, habitID);
  }

  callback(null, response);
};
