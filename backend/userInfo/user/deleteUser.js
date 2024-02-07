
class DeleteUser {
    constructor(db) {
      this.DB = db;
    }

    async deleteUser(user) {
        try {
            await this.deleteUserAndData(user.email);
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            };
        }
        catch (e) {
            return {
                statusCode: 500,
                body: JSON.stringify("Request failed"),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            };
        }
    }


    async deleteUserAndData(email) {
        await this.DB.batchDeleteItems(email);
        await this.DB.batchDeleteItems(`${email}-healthInfo`);
        await this.DB.batchDeleteItems(`${email}-taskInfo`);
        await this.DB.batchDeleteItems(`${email}-foodEntry`);
        await this.DB.batchDeleteItems(`${email}-foodItem`);
        await this.DB.batchDeleteItems(`${email}-exercise`);
        await this.DB.batchDeleteItems(`${email}-workoutEntry`);
        await this.DB.batchDeleteItems(`${email}-exerciseEntry`);
        await this.DB.batchDeleteItems(`${email}-habit`);
        await this.DB.batchDeleteItems(`${email}-habitStatus`);
        await this.DB.batchDeleteItems(`${email}-wellnessReport`);
        await this.DB.batchDeleteItems(`${email}-sleepReport`);
        await this.DB.batchDeleteItems(`${email}-task`);
        await this.DB.batchDeleteItems(`${email}-taskStatus`);
        await this.DB.batchDeleteItems(`${email}-notification`);
    }
}
module.exports = DeleteUser;