const SQS = require('aws-sdk/clients/sqs');
const sqs = new SQS();
const queueUrl = process.env.INTEGRATE_URL;
const JSEncrypt = require('node-jsencrypt');

const { authenticateToken } = require('../../utils/authenticateToken');

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const encodedUser = JSON.parse(event.body).user;
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(process.env.DECRYPTER);
  var decodedUser = decrypt.decrypt(encodedUser);
  
  const user = authenticateToken({Authorization: "Bearer " + decodedUser});
  const code = JSON.parse(event.body).code;

  try {
    const params = {
      MessageBody: JSON.stringify({code: code, user: user}),
      QueueUrl: queueUrl,
    };
    await sqs.sendMessage(params).promise();
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    });
  }
  catch (e) {
    console.log(e);
    callback(null, {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    });
  }
};