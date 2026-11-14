// Delivery status for an email address, stored as its own item next to the
// user's otp and tempPassword items: { PK: email, SK: "emailStatus" }.
// It must never be written at SK: email, which is the user's account row.
const EMAIL_STATUS_SK = "emailStatus";

class EmailDB {
  constructor(dbService) {
    this.dbService = dbService;
  }

  async addFailedEmail(emailAddress, failedReason) {
    if (!emailAddress) {
      throw new Error("Invalid input");
    }

    try {
      const recordToInsert = this.getEmailRecord(emailAddress, failedReason);
      await this.dbService.putItem(recordToInsert);
    } catch (e) {
      throw new Error("Something went wrong sending adding the failed email.", {
        cause: e,
      });
    }
  }

  getEmailRecord(emailAddress, failedReason) {
    return {
      PK: emailAddress,
      SK: EMAIL_STATUS_SK,
      failedReason: failedReason,
      updatedAt: new Date().toISOString(),
    };
  }

  // false if OTP emails to this address should be skipped.
  async verifyEmailAddress(emailAddress) {
    try {
      const response = await this.dbService.getItem({
        PK: emailAddress,
        SK: EMAIL_STATUS_SK,
      });

      if (response?.Item?.failedReason) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log(e);
      throw new Error("Something went wrong verifying the email address.", {
        cause: e,
      });
    }
  }
}
module.exports = EmailDB;
module.exports.EMAIL_STATUS_SK = EMAIL_STATUS_SK;
