class UpdateNotification {
    constructor(db) {
      this.DB = db;
    }

    async updateNotification(user, notificationID, body) {
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
        const expression =  'SET #triggers = :triggers, #expoIDs = :expoIDs, #title = :title, #body = :body, #preference = :preference' ;
        const names = {
            '#triggers': 'triggers',
            '#expoIDs': 'expoIDs',
            '#title': 'title',
            '#body': 'body',
            '#preference': 'preference',
        };
        const values = {
            ':triggers': notification.triggers,
            ':expoIDs': notification.expoIDs,
            ':title': notification.title,
            ':body': notification.body,   
            ':preference': notification.preference,  
        };

        await this.DB.updateItem(expression, key, names, values);
    }
};
module.exports = UpdateNotification;