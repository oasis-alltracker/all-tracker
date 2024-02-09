
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
            console.log(e)
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
        await this.DB.deleteItems(email, [{SK: email}]);
        await this.DB.deleteItems(email, [{SK: "otp"}]);
        await this.DB.deleteItems(email, [{SK: "tempPassword"}]);
        await this.DB.deleteItems(`${email}-healthInfo`, [{SK: "healthInfo"}]);
        await this.DB.deleteItems(`${email}-taskInfo`, [{SK: "taskInfo"}]);

        const foodEntries = await this.getAll(email, "foodEntry");
        await this.DB.deleteItems(`${email}-foodEntry`, foodEntries);

        const foodItems = await this.getAll(email, "foodItem");
        await this.DB.deleteItems(`${email}-foodItem`, foodItems);

        const exerciseEntries = await this.getAll(email, "exerciseEntry");
        await this.DB.deleteItems(`${email}-exerciseEntry`, exerciseEntries);

        const exercises = await this.getAll(email, "exercise");
        await this.DB.deleteItems(`${email}-exercise`, exercises);

        const workoutEntries = await this.getAll(email, "workoutEntry");
        await this.DB.deleteItems(`${email}-exerciseEntry`, workoutEntries);

        const workoutPlans = await this.getAll(email, "workoutPlan");
        await this.DB.deleteItems(`${email}-workoutPlan`, workoutPlans);

        const habits = await this.getAll(email, "habit");
        await this.DB.deleteItems(`${email}-habit`, habits);

        const habitStatuses = await this.getAll(email, "habitStatus");
        await this.DB.deleteItems(`${email}-habitStatus`, habitStatuses);

        const wellnessReports = await this.getAll(email, "wellnessReport");
        await this.DB.deleteItems(`${email}-wellnessReport`, wellnessReports);

        const sleepReports = await this.getAll(email, "sleepReport");
        await this.DB.deleteItems(`${email}-sleepReport`, sleepReports);

        const tasks = await this.getAll(email, "task");
        await this.DB.deleteItems(`${email}-task`, tasks);

        const taskStatuses = await this.getAll(email, "taskStatus");
        await this.DB.deleteItems(`${email}-taskStatus`, taskStatuses);

        const notifications = await this.getAll(email, "notification");
        await this.DB.deleteItems(`${email}-notification`, notifications);
    }

    async getAll(user, pkSuffix) {
        const expression =  '#pk = :pk';
        const names = {
            '#pk': 'PK'
        };
            const values = {
            ':pk': `${user}-${pkSuffix}`,

        };
        const response = await this.DB.queryItem(expression, names, values);
        return response?.Items;
    }
}
module.exports = DeleteUser;