class UpdateNotifications {
    constructor(db) {
      this.DB = db;
    }

    async updateNotifications(user, notificationID, body) {
        try {
            await this.updateEntry(user.email, notificationID, body);

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            };
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
            };
        }
    }

    async updateEntry(email, notificationID, notification) {
        const key = {PK: `${email}-notification`, SK: notificationID};
        const expression =  'SET #schedule = :schedule, #message = :message, #isOn = :isOn' ;
        const names = {
            '#schedule': 'schedule',
            '#message': 'message',
            '#isOn': 'isOn',
        };
        const values = {
            ':schedule': notification.schedule,
            ':message': notification.message,
            ':isOn': notification.isOn,     
        };

        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateFoodEntry;