import { registerForPushNotificationsAsync } from '../../../App.js';
import { schedulePushNotification } from '../../../App.js';
import { cancelPushNotification } from '../../../App.js';
import { cancelAllPushNotifications } from '../../../App.js';
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env['REACT_APP_BASE_URL'];
const API = baseURL + '/notifications/';



class NotificationHandler {

    static async getAllNotificationsState(token) { 
        return await this.getNotificationsForGroup("notifications", token);
    }
    static async turnOnAllNotifications(token) { 
        await cancelAllPushNotifications();
        await this.updateNotification(tokem, "notifications", undefined, undefined, undefined, undefined, undefined, "on");
        notifications = await this.getAllNotifications(token);
        for(var notification of notifications) {
            await turnOnNotification(token, notification.sk, notification.title, notification.body, notification.triggers)
        }
    }
    static async turnOffAllNotifications(token) { 
        await cancelAllPushNotifications();
        await this.updateNotification("notifications", undefined, undefined, undefined, undefined, undefined, "off");
    }
    static async refreshNotificationsStatus(token) {
        const pushToken = await registerForPushNotificationsAsync();
        const oldPushToken = await SecureStore.getItemAsync("pushToken");

        if(pushToken && pushToken != oldPushToken) {
            await this.resetAllNotifications(token);
        }
        return pushToken;
    }



    static async turnOnNotification(token, notificationID, title, body, triggers) { 
        var expoIDs
        if(await this.checkNotificationsStatus(token)){
            for (var trigger of triggers){
                const expoID = await schedulePushNotification(title, body, trigger);
                expoIDs.push(expoID);
            }

            await this.updateNotification(token, notificationID, expoIDs, title, body, triggers, undefined);
            return true
        }
        else{
            return false;
        }
    }
    static async turnOffNotification(token, notificationID, expoIDs) {
        await this.deleteNotification(token, notificationID);
        for (var expoID of expoIDs) {
            await cancelPushNotification(expoID);
        }
    }


    static async turnOnGroupNotifications(token, group) { 
        if(await this.checkNotificationsStatus(token)){
            notifications = await this.getNotificationsForGroup(token, group);
            for(notification of notificaions){
                for(expoID of notification.expoIDs){
                    await turnOnNotification(token, notification.sk, notification.title, notification.body, notification.triggers)
                }
            }
        }
    }
    static async turnOffGroupNotifications(token) { 
        if(await this.checkNotificationsStatus(token)){
            notifications = await this.getNotificationsForGroup(token, group);
            for(notification of notificaions){
                for(expoID of notification.expoIDs){
                    await cancelPushNotification(expoID);
                }
            }
        }
    }







    //notification handlers
    static async updateNotification(token, notificationID, expoIDs, title, body, trigger, preference){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + notificationID;

        const body = {
            expoIDs: expoIDs,
            title: title,
            body: body,
            trigger: trigger,
            preference: preference
        }

        try{
            await axios.put(url, body, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }
    static async deleteNotification(notificationID, token){
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + notificationID;

        try {
            await axios.delete(url, {headers: headers});
        }
        catch(e){
            console.log(e);
        }
    }
    static async getAllNotifications(token) {
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await axios.get(API, {headers: headers});
            return (response?.data);
        }
        catch(e) {
            console.log(e);
        }
    }
    static async getNotificationsForGroup(token, notificationID) {

        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const url = API + notificationID;

        try {
            const response = await axios.get(url, {headers: headers});
            return (response?.data);
        }
        catch(e) {
            console.log(e);
        }
    }
}
export default NotificationHandler;