const { isEmptyObject } = require("./objectUtils");

class UserDB {
  constructor(dbService) {
    this.dbService = dbService;
  }

  async userExistsOrCreateUser(email, hashedPassword) {
    const emailKey = { PK: email, SK: email };
    const existingUser = await this.dbService.getItem(emailKey);
    if (!isEmptyObject(existingUser)) {
      return existingUser.Item;
    } else {
      await this.createUser(email, hashedPassword);
      return false;
    }
  }

  async createUser(email, hashedPassword) {
    const data = {
      PK: `${email}`,
      SK: `${email}`,
      isSetupComplete: false,
      hashedPassword: hashedPassword,
    };

    await this.dbService.putItem(data);
    return { ID: data.SK };
  }
}
module.exports = UserDB;
