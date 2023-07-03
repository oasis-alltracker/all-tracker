const DynamoDB = require('aws-sdk/clients/dynamodb');
const DbUtils = require('../../utils/databaseManager');

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const { isEmptyObject } = require('../../utils/objectUtils');


module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const userCredentials = JSON.parse(event.body);
  
    const emailKey = {PK: userCredentials.email, SK: userCredentials.email};
    const existingEmail = await dbService.getItem(emailKey);
    
    if(!isEmptyObject(existingEmail)) {
      callback( null, {
        statusCode: 200,
        body: JSON.stringify({
            exists: true
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }
      });
    }
    else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            exists: false
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }
      });
    }
  }

  catch (e) {
    console.log(e);
    return {
        statusCode: 500,
        body: JSON.stringify("Request failed"),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }
    }
  }
};
