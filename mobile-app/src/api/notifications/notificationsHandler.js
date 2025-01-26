import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";

const EXPO_PUBLIC_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API = EXPO_PUBLIC_BASE_URL + "notifications/";

class NotificationsHandler {
  static async getAllNotificationsState(token) {
    notificationsState = await this.getNotifications(token, "notifications");
    return notificationsState[0].preference;
  }
  static async getGroupPreferenceNotificationsState(token, group) {
    notificationsState = await this.getNotifications(token, group);
    return notificationsState[0].preference;
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
      if (
        notification.SK !== "notifications" &&
        notification.preference === "on"
      ) {
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
      if (
        notification.SK !== "notifications" &&
        notification.preference === "on"
      ) {
        await this.turnOffNotification(
          token,
          notification.SK,
          notification.expoIDs
        );
      }
    }
  }

  static async turnOnGroupPreferenceNotifications(
    token,
    group,
    turnOnIndividuals = false
  ) {
    var preferenceKey = group + "Preference";
    await this.updateNotification(
      token,
      preferenceKey,
      "undefined",
      "undefined",
      "undefined",
      "undefined",
      "on"
    );
    if (turnOnIndividuals) {
      notifications = await this.getNotifications(token, group);
      for (var notification of notifications) {
        if (notification.SK !== preferenceKey) {
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
  }

  static async turnOffGroupPreferenceNotifications(
    token,
    group,
    prevExpoIDs = false
  ) {
    var preferenceKey = group + "Preference";
    await this.updateNotification(
      token,
      preferenceKey,
      "undefined",
      "undefined",
      "undefined",
      "undefined",
      "off"
    );
    await this.turnOffGroupNotifications(token, group, prevExpoIDs);
  }
  static async checkNotificationsStatus(token) {
    const pushToken = await this.registerForPushNotificationsAsync();

    if (pushToken !== false) {
      const oldPushToken = await SecureStore.getItemAsync("pushToken");

      if (pushToken && pushToken != oldPushToken) {
        await SecureStore.setItemAsync("pushToken", pushToken);
        await this.turnOnAllNotifications(token);
      }
      return pushToken;
    } else {
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
    if (notifications) {
      for (var trigger of triggers) {
        if (Platform.OS === "android" && trigger.month && trigger.day) {
          trigger = {
            seconds: this.getSecondsUntilDate(trigger),
          };
        }
        try {
          const expoID = await this.schedulePushNotification(
            title,
            body,
            trigger
          );
          expoIDs.push(expoID);
        } catch (e) {
          console.log(e);
        }
      }
    }

    if (prevExpoIDs) {
      for (var prevExpoID of prevExpoIDs) {
        await this.cancelPushNotification(prevExpoID);
      }
    }

    try {
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
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  static async turnOffNotification(token, notificationID, expoIDs) {
    var notifications = await this.getNotifications(token, notificationID);

    for (notification of notifications) {
      await this.updateNotification(
        token,
        notificationID,
        notification.expoIDs,
        notification.title,
        notification.body,
        notification.triggers,
        "off"
      );
    }
    if (expoIDs) {
      for (var expoID of expoIDs) {
        await this.cancelPushNotification(expoID);
      }
    }
  }

  static async turnOnGroupNotifications(token, group, isAllNotificationsOn) {
    notifications = await this.getNotifications(token, group);
    for (notification of notificaions) {
      await this.turnOnNotification(
        token,
        notification.SK,
        notification.title,
        notification.body,
        notification.triggers,
        isAllNotificationsOn,
        notification.expoIDs
      );
    }
  }

  static async turnOffGroupNotifications(token, group, prevExpoIDs = false) {
    notifications = await this.getNotifications(token, group);

    for (notification of notifications) {
      if (notification.SK !== group + "Preference") {
        await this.turnOffNotification(
          token,
          notification.SK,
          notification.expoIDs
        );
      }
    }
    if (prevExpoIDs) {
      for (var prevExpoID of prevExpoIDs) {
        await this.cancelPushNotification(prevExpoID);
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

  static async deleteNotification(token, notificationID) {
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

  static async getNotifications(token, notificationID) {
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
        sound: "vibratone_e.wav",
      },
      trigger: trigger,
    });
  }

  static async registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return false;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "a8f7cc7a-8ef8-4fc9-af87-b5c9c06a57ed",
        })
      ).data;
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

  static getSecondsUntilDate({ day, month, hour, minute }) {
    const now = new Date();
    let date = new Date(now.getFullYear(), month, day, hour, minute, 0);
    let diff = date.getTime() - now.getTime();
    if (diff > 0) {
      return Math.floor(diff / 1000);
    } else {
      date = new Date(now.getFullYear() + 1, month, day, hour, minute);
      diff = date.getTime() - now.getTime();
      return Math.floor(diff / 1000);
    }
  }
}
export default NotificationsHandler;
