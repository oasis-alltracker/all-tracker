import * as SecureStore from "expo-secure-store";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import axios from "axios";

import { BASE_URL } from "@env";
const API = BASE_URL + "notifications/";

class NotificationsHandler {
  static async getAllNotificationsState(token) {
    return await this.getNotificationsForGroup("notifications", token);
  }
  static async turnOnAllNotifications(token) {
    await this.cancelAllPushNotifications();
    await this.updateNotification(
      token,
      "notifications",
      "undefined",
      "undefined",
      "undefined",
      "undefined",
      "on"
    );
    notifications = await this.getAllNotifications(token);
    for (var notification of notifications) {
      if(notification.SK !== "notifications" && notification.preference === "on"){
        await this.turnOnNotification(
          token,
          notification.SK,
          notification.title,
          notification.body,
          notification.triggers,
          true,
          notification.expoIDs
        );
      }
    }
  }
  static async turnOffAllNotifications(token) {
    await this.cancelAllPushNotifications();
    await this.updateNotification(
      token,
      "notifications",
      "undefined",
      "undefined",
      "undefined",
      "undefined",
      "off"
    );

    const notifications = await this.getAllNotifications(token);
    for (var notification of notifications) {
      if(notification.SK !== "notifications" && notification.preference === "on") {
        await this.turnOffNotification(token, notification.SK, notification.expoIDs);
      }
    }
  }
  static async checkNotificationsStatus(token) {
    const pushToken = await this.registerForPushNotificationsAsync();

    if(pushToken !== false){
      const oldPushToken = await SecureStore.getItemAsync("pushToken");

      if (pushToken && pushToken != oldPushToken) {
        await SecureStore.setItemAsync("pushToken", pushToken);
        await this.turnOnAllNotifications(token);
      }
      return pushToken;
    }
    else {
      return false;
    }

  }

  static async turnOnNotification(
    token,
    notificationID,
    title,
    body,
    triggers,
    notifications,
    prevExpoIDs = false
  ) {
    var expoIDs = [];
    if(notifications){
      for (var trigger of triggers) { 
        try{
          const expoID = await this.schedulePushNotification(title, body, trigger);
          expoIDs.push(expoID);
        }
        catch(e){
          return false
        }
      }
    }

    if(prevExpoIDs) {
      for (var prevExpoID of prevExpoIDs) {
        await this.cancelPushNotification(prevExpoID);
      }
    }

    try{
      await this.updateNotification(
        token,
        notificationID,
        expoIDs,
        title,
        body,
        triggers,
        "on"
      );
      return expoIDs;

    }
    catch(e){
      console.log(e)
      return false
    }

  }
  static async turnOffNotification(token, notificationID, expoIDs) {

    var notifications = await this.getNotificationsForGroup(token, notificationID)

    for(notification of notifications){
      await this.updateNotification(token, notificationID, notification.expoIDs, notification.title, notification.body, notification.triggers, "off");
    }
    
    for (var expoID of expoIDs) {
      await this.cancelPushNotification(expoID);
    }
  }

  static async turnOnGroupNotifications(token, group, isAllNotificationsOn) {
    notifications = await this.getNotificationsForGroup(token, group);
    for (notification of notificaions) {
        await turnOnNotification(
          token,
          notification.SK,
          notification.title,
          notification.body,
          notification.triggers,
          isAllNotificationsOn,
          [expoID]
        );
    }

  }

  static async turnOffGroupNotifications(token) {
    notifications = await this.getNotificationsForGroup(token, group);
    for (notification of notificaions) {
      for (expoID of notification.expoIDs) {
        await cancelPushNotification(expoID);
      }
    }
  }

  //notification handlers
  static async updateNotification(
    token,
    notificationID,
    expoIDs,
    title,
    body,
    triggers,
    preference
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + notificationID;

    const httpBody = {
      expoIDs: expoIDs,
      title: title,
      body: body,
      triggers: triggers,
      preference: preference,
    };

    try {
      await axios.put(url, httpBody, { headers: headers });
    } catch (e) {
      console.log(e);
    }
  }



  static async deleteNotification(notificationID, token) {

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + notificationID;

    try {
      await axios.delete(url, { headers: headers });
    } catch (e) {
      console.log(e);
    }

  }
  static async getAllNotifications(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(API, { headers: headers });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getNotificationsForGroup(token, notificationID) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = API + notificationID;

    try {
      const response = await axios.get(url, { headers: headers });
      return response?.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async schedulePushNotification(title, body, trigger) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: trigger
    });
  }

  static async registerForPushNotificationsAsync() {
    let token;
    
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return false;
      }
      token = (await Notifications.getExpoPushTokenAsync({projectId:"a8f7cc7a-8ef8-4fc9-af87-b5c9c06a57ed"})).data;
    } else {
      return false;
    }

    return token;
  }

  static async cancelPushNotification(identifier) {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  static async cancelAllPushNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

}
export default NotificationsHandler;
