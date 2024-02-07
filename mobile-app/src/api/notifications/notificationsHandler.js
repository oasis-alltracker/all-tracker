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
      if(notification.SK !== "notifications"){
        await this.turnOnNotification(
          token,
          notification.sk,
          notification.title,
          notification.body,
          [notification.trigger]
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
    triggers
  ) {
    try{
      var expoIDs = [];
      for (var trigger of triggers) {
        try{
          const expoID = await this.schedulePushNotification(title, body, trigger);
          expoIDs.push(expoID);
        }
        catch(e){
          return false
        }
      }
      await this.updateNotification(
        token,
        notificationID,
        expoIDs,
        title,
        body,
        triggers,
        "on"
      );
      return true;

    }
    catch(e){
      console.log(e)
      return false
    }
  }
  static async turnOffNotification(token, notificationID, expoIDs) {
    
    await this.deleteNotification(token, notificationID);
    for (var expoID of expoIDs) {
      await this.cancelPushNotification(expoID);
    }
  }

  static async turnOnGroupNotifications(token, group) {
    notifications = await this.getNotificationsForGroup(token, group);
    for (notification of notificaions) {
      for (expoID of notification.expoIDs) {
        await turnOnNotification(
          token,
          notification.sk,
          notification.title,
          notification.body,
          notification.triggers
        );
      }
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
    trigger,
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
      trigger: trigger,
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

    console.log(headers);
    console.log(url);


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
