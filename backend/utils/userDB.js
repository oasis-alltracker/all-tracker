const { isEmptyObject } = require('./objectUtils');

class UserDB {
    constructor(dbService) {
      this.dbService = dbService;
    }
  
    async userExistsOrCreateUser(email, hashedPassword){
        const emailKey = {PK: email, SK: email};
        const existingUser = await this.dbService.getItem(emailKey);
          
        if(!isEmptyObject(existingEmail)) {
          return existingUser;
        }
        else {
          await this.createUser(email, hashedPassword)
          return false;
        }
    };
      
      
    async createUser(email) {
        const data = {
          PK: `${email}`, 
          SK: `${email}`,
          isSetupComplete: false,
          hashedPassword: hashedPassword
        };
      
        await this.dbService.putItem(data);
        return {ID: data.SK};
    };
      
  }
  module.exports = UserDB;