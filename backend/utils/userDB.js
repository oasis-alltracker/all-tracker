const { isEmptyObject } = require('./objectUtils');

class UserDB {
    constructor(dbService) {
      this.dbService = dbService;
    }
  
    async userExistsOrCreateUser(email){
        const emailKey = {PK: email, SK: email};
        const existingEmail = await this.dbService.getItem(emailKey);
          
        if(!isEmptyObject(existingEmail)) {
          return;
        }
        else {
          await this.createUser(email)
        }
    };
      
      
    async createUser(email) {
        const data = {
          PK: `${email}`, 
          SK: `${email}`,
          isSetupComplete: false
        };
      
        await this.dbService.putItem(data);
        return {ID: data.SK};
    };
      
  }
  module.exports = UserDB;