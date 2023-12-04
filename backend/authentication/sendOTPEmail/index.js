const DynamoDB = require("aws-sdk/clients/dynamodb");
const SES = require("aws-sdk/clients/ses");
const DbUtils = require("../../utils/databaseManager");

const ses = new SES({ apiVersion: "2010-12-01" });
const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const EmailDB = require("../../utils/emailDB");
const emailDB = new EmailDB(dbService);

const EmailService = require("../../utils/emailService");
const source = "no-reply@oasis-alltracker.com";
const configurationSetName = process.env.CONFIGURATION_SET_NAME;
const emailService = new EmailService(ses, source, configurationSetName);

const SendOTPEmail = require("./sendOTPEmail");
const otpSender = new SendOTPEmail(emailDB, emailService);

module.exports.handler = async (event) => {
  const otpRequests = getOTPRequests(event.Records);
  await otpSender.process(otpRequests);
};

function getOTPRequests(records) {
  otpRequests = [];

  records.forEach((record) => {
    otpRequests.push(JSON.parse(record.body));
  });

  return otpRequests;
}
