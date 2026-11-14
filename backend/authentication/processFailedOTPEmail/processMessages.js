// Handles SES bounce and complaint notifications for OTP emails. Only a
// permanent bounce (the address doesn't exist) stops future OTP emails to
// that address. Transient/undetermined bounces (e.g. mailbox full) and
// complaints are logged but don't block, so nobody is locked out of login.
class ProcessMessages {
  constructor(emailDB) {
    this.emailDB = emailDB;
  }

  async process(messages) {
    try {
      for (const message of messages) {
        if (message.bounce) {
          await this.handleBounce(message.bounce);
        } else if (message.complaint) {
          this.handleComplaint(message.complaint);
        } else {
          throw new Error("Invalid failed message type.");
        }
      }
    } catch (e) {
      console.error(e);
      throw new Error("Something went processing the failed email.", {
        cause: e,
      });
    }
  }

  async handleBounce(bounce) {
    const failedReason = `bounce-${bounce.bounceType}`;

    for (const recipient of bounce.bouncedRecipients) {
      const emailAddress = recipient.emailAddress;
      if (bounce.bounceType === "Permanent") {
        await this.emailDB.addFailedEmail(emailAddress, failedReason);
      } else {
        console.log(`OTP email ${failedReason} for ${emailAddress}; not blocked.`);
      }
    }
  }

  handleComplaint(complaint) {
    for (const recipient of complaint.complainedRecipients) {
      console.log(`OTP email complaint for ${recipient.emailAddress}; not blocked.`);
    }
  }
}
module.exports = ProcessMessages;
