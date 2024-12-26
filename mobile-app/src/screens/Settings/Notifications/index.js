import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";

import { Header } from "../../../components";
import Soultification from "./soultification";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../../user/keychain";
import DateTimePicker from "@react-native-community/datetimepicker";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import UserAPI from "../../../api/user/userAPI";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [trackingPreferences, setTrackingPreferences] = useState({});

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const [isHabitsEnabled, setIsHabitsEnabled] = useState(false);
  const [habitExpoIDs, setHabitExpoIDs] = useState([]);
  const [habitTime, setHabitTime] = useState(new Date("1995-12-17T12:00:00"));

  const [isTasksEnabled, setIsTasksEnabled] = useState(false);

  const [isBreakfastEnabled, setIsBreakfastEnabled] = useState(false);
  const [breakfastTime, setBreakfastTime] = useState(
    new Date("1995-12-17T12:00:00")
  );
  const [breakfastExpoIDs, setBreakfastExpoIDs] = useState([]);
  const [isLunchEnabled, setIsLunchEnabled] = useState(false);
  const [lunchTime, setLunchTime] = useState(new Date("1995-12-17T12:00:00"));
  const [lunchExpoIDs, setLunchExpoIDs] = useState([]);
  const [isDinnerEnabled, setIsDinnerEnabled] = useState(false);
  const [dinnerTime, setDinnerTime] = useState(new Date("1995-12-17T12:00:00"));
  const [dinnerExpoIDs, setDinnerExpoIDs] = useState([]);

  const [isWellnessCheckinToggled, setIsWellnessCheckinToggled] =
    useState(false);
  const [moodNotifications, setMoodNotifications] = useState(false);

  const [isMorningAlarmToggled, setIsMorningAlarmToggled] = useState(false);
  const [morningNotifications, setMorningNotifications] = useState(false);
  const [isBedTimeReminderToggled, setIsBedTimeReminderToggled] =
    useState(false);
  const [sleepNotifications, setSleepNotifications] = useState(false);

  const allNotificationsToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      await NotificationsHandler.turnOffAllNotifications(token);
      setIsNotificationsEnabled(false);
      setIsHabitsEnabled(false);
      setIsTasksEnabled(false);
      setIsBreakfastEnabled(false);
      setIsLunchEnabled(false);
      setIsDinnerEnabled(false);
      setIsBedTimeReminderToggled(false);
      setIsMorningAlarmToggled(false);
      setIsWellnessCheckinToggled(false);
    } else {
      var systemNotificationsStatus = true;
      systemNotificationsStatus =
        await NotificationsHandler.checkNotificationsStatus(token);
      if (systemNotificationsStatus) {
        await NotificationsHandler.turnOnAllNotifications(token);
        setIsNotificationsEnabled((previousState) => !previousState);
      } else {
        Toast.show(
          "To get reminders, you need to turn on notifications in your phone's settings.",
          {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          }
        );
      }
    }

    setIsLoading(false);
  };

  const habitsToggled = async (turnOn = false) => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(habitTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isNotificationsEnabled) {
      if (isHabitsEnabled && !turnOn) {
        await NotificationsHandler.turnOffNotification(
          token,
          "habit",
          habitExpoIDs
        );
        setIsHabitsEnabled(false);
      } else {
        var systemNotificationsStatus = true;
        systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);
        if (systemNotificationsStatus) {
          const expoIDs = await NotificationsHandler.turnOnNotification(
            token,
            "habit",
            "Habit Journal",
            "Don't forget to update your habit progress",
            [{ hour: Number(hour), minute: Number(minute), repeats: true }],
            isNotificationsEnabled,
            habitExpoIDs
          );
          if (expoIDs) {
            setIsHabitsEnabled(true);
            setHabitExpoIDs(expoIDs);
          }
        } else {
          Toast.show(
            "To get reminders, you need to turn on notifications in your phone's settings.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            }
          );
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const tasksToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      if (isTasksEnabled) {
        setIsTasksEnabled((previousState) => !previousState);
        try {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "task"
          );
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      } else {
        try {
          var systemNotificationsStatus = true;
          systemNotificationsStatus =
            await NotificationsHandler.checkNotificationsStatus(token);
          if (systemNotificationsStatus) {
            setIsTasksEnabled((previousState) => !previousState);
            await NotificationsHandler.turnOnGroupPreferenceNotifications(
              token,
              "task",
              true
            );
          } else {
            Toast.show(
              "To get reminders, you need to turn on notifications in your phone's settings.",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
              }
            );
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const breakfastToggled = async (turnOn = false) => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(breakfastTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isNotificationsEnabled) {
      if (isBreakfastEnabled && !turnOn) {
        await NotificationsHandler.turnOffNotification(
          token,
          "breakfast",
          breakfastExpoIDs
        );
        setIsBreakfastEnabled(false);
      } else {
        var systemNotificationsStatus = true;
        systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);
        if (systemNotificationsStatus) {
          const expoIDs = await NotificationsHandler.turnOnNotification(
            token,
            "breakfast",
            "Breakfast time!",
            "Don't forget to update your diet journal.",
            [{ hour: Number(hour), minute: Number(minute), repeats: true }],
            true,
            breakfastExpoIDs
          );
          if (expoIDs) {
            setIsBreakfastEnabled(true);
            setBreakfastExpoIDs(expoIDs);
          }
        } else {
          Toast.show(
            "To get reminders, you need to turn on notifications in your phone's settings.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            }
          );
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const lunchToggled = async (turnOn = false) => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(lunchTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isNotificationsEnabled) {
      if (isLunchEnabled && !turnOn) {
        await NotificationsHandler.turnOffNotification(
          token,
          "lunch",
          lunchExpoIDs
        );
        setIsLunchEnabled(false);
      } else {
        var systemNotificationsStatus = true;
        systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);
        if (systemNotificationsStatus) {
          const expoIDs = await NotificationsHandler.turnOnNotification(
            token,
            "lunch",
            "Lunch time!",
            "Don't forget to update your diet journal.",
            [{ hour: Number(hour), minute: Number(minute), repeats: true }],
            true,
            lunchExpoIDs
          );
          if (expoIDs) {
            setIsLunchEnabled(true);
            setLunchExpoIDs(expoIDs);
          }
        } else {
          Toast.show(
            "To get reminders, you need to turn on notifications in your phone's settings.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            }
          );
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const dinnerToggled = async (turnOn = false) => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(dinnerTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isNotificationsEnabled) {
      if (isDinnerEnabled && !turnOn) {
        await NotificationsHandler.turnOffNotification(
          token,
          "dinner",
          dinnerExpoIDs
        );
        setIsDinnerEnabled(false);
      } else {
        var systemNotificationsStatus = true;
        systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);
        if (systemNotificationsStatus) {
          const expoIDs = await NotificationsHandler.turnOnNotification(
            token,
            "dinner",
            "Dinner time!",
            "Don't forget to update your diet journal.",
            [{ hour: Number(hour), minute: Number(minute), repeats: true }],
            true,
            dinnerExpoIDs
          );
          if (expoIDs) {
            setIsDinnerEnabled(true);
            setDinnerExpoIDs(expoIDs);
          }
        } else {
          Toast.show(
            "To get reminders, you need to turn on notifications in your phone's settings.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            }
          );
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const morningAlarmToggled = async (notificationTriggers, turnOn) => {
    setIsLoading(true);
    const token = await getAccessToken();
    if (isNotificationsEnabled) {
      if (isMorningAlarmToggled && !turnOn) {
        setIsMorningAlarmToggled(false);
        try {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "morning"
          );
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      } else {
        try {
          var systemNotificationsStatus = true;
          systemNotificationsStatus =
            await NotificationsHandler.checkNotificationsStatus(token);
          if (systemNotificationsStatus) {
            setIsMorningAlarmToggled(true);
            await NotificationsHandler.turnOnGroupPreferenceNotifications(
              token,
              "morning"
            );
            var listOfExpoIDs = [];
            for (var i = 0; i < notificationTriggers.length; i++) {
              const expoIDs = await NotificationsHandler.turnOnNotification(
                token,
                "morning-" + (i + 1),
                "Sleep review",
                "Time to wake up and review your sleep",
                notificationTriggers[i].triggers,
                isNotificationsEnabled,
                notificationTriggers.expoIDs
              );
              listOfExpoIDs.push(expoIDs);
            }
            setIsLoading(false);
            return listOfExpoIDs;
          } else {
            Toast.show(
              "To get reminders, you need to turn on notifications in your phone's settings.",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
              }
            );
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const bedTimeReminderToggled = async (
    notificationTriggers,
    turnOn = false
  ) => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      if (isBedTimeReminderToggled && !turnOn) {
        setIsBedTimeReminderToggled(false);
        try {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "sleep"
          );
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      } else {
        try {
          var systemNotificationsStatus = true;
          systemNotificationsStatus =
            await NotificationsHandler.checkNotificationsStatus(token);
          if (systemNotificationsStatus) {
            setIsBedTimeReminderToggled(true);
            await NotificationsHandler.turnOnGroupPreferenceNotifications(
              token,
              "sleep"
            );
            var listOfExpoIDs = [];
            for (var i = 0; i < notificationTriggers.length; i++) {
              const expoIDs = await NotificationsHandler.turnOnNotification(
                token,
                "sleep-" + (i + 1),
                "Bedtime reminder",
                "It's time for bed",
                notificationTriggers[i].triggers,
                isNotificationsEnabled,
                notificationTriggers[i].expoIDs
              );
              listOfExpoIDs.push(expoIDs);
            }
            setIsLoading(false);
            return listOfExpoIDs;
          } else {
            Toast.show(
              "To get reminders, you need to turn on notifications in your phone's settings.",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
              }
            );
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const wellnessCheckinToggled = async (
    notificationTriggers,
    turnOn = false
  ) => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      if (isWellnessCheckinToggled && !turnOn) {
        setIsWellnessCheckinToggled(false);
        try {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "mood"
          );
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      } else {
        try {
          var systemNotificationsStatus = true;
          systemNotificationsStatus =
            await NotificationsHandler.checkNotificationsStatus(token);
          if (systemNotificationsStatus) {
            setIsWellnessCheckinToggled(true);
            await NotificationsHandler.turnOnGroupPreferenceNotifications(
              token,
              "mood"
            );
            var listOfExpoIDs = [];
            for (var i = 0; i < notificationTriggers.length; i++) {
              const expoIDs = await NotificationsHandler.turnOnNotification(
                token,
                "mood-" + (i + 1),
                "Wellness check-in",
                "It's time to check in with yourself",
                notificationTriggers[i].triggers,
                isNotificationsEnabled,
                notificationTriggers[i].expoIDs
              );
              listOfExpoIDs.push(expoIDs);
            }
            setIsLoading(false);
            return listOfExpoIDs;
          } else {
            Toast.show(
              "To get reminders, you need to turn on notifications in your phone's settings.",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
              }
            );
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    }
    else{
      Toast.show(
        "Notifications are disabled. To get reminders, you need to enable them.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
    }

    setIsLoading(false);
  };

  const formatDateObject = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return dateObject.toLocaleString("en-US", options);
  };

  const onChangeHabitTime = async (event, selectedDate) => {
    setHabitTime(selectedDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (isHabitsEnabled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(
        token,
        "habit",
        habitExpoIDs
      );
      setHabitExpoIDs([]);
    }

    setHabitTime(selectedDate);

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      habitsToggled();
    }
    if (Platform.OS === "android" && event.type === "dismissed") {
      setIsToggled(false);
    }
  };

  const onChangeBreakfastTime = async (event, selectedDate) => {
    setBreakfastTime(selectedDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (isBreakfastEnabled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(
        token,
        "breakfast",
        breakfastExpoIDs
      );
      setIsBreakfastEnabled(false);
      setBreakfastExpoIDs([]);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      breakfastToggled(true);
    }
    if (Platform.OS === "android" && event.type === "dismissed") {
      setIsToggled(false);
    }
  };

  const onChangeLunchTime = async (event, selectedDate) => {
    setLunchTime(selectedDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (isLunchEnabled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(
        token,
        "lunch",
        lunchExpoIDs
      );
      setIsLunchEnabled(false);
      setLunchExpoIDs([]);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      lunchToggled(true);
    }
    if (Platform.OS === "android" && event.type === "dismissed") {
      setIsToggled(false);
    }
  };

  const onChangeDinnerTime = async (event, selectedDate) => {
    setDinnerTime(selectedDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (isDinnerEnabled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(
        token,
        "dinner",
        dinnerExpoIDs
      );
      setDinnerExpoIDs([]);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      dinnerToggled(true);
    }
    if (Platform.OS === "android" && event.type === "dismissed") {
      setIsToggled(false);
    }
  };

  const formatDateObjectBackend = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return dateObject.toLocaleString("en-US", options);
  };

  useEffect(() => {
    const onLoad = async () => {
      if (isLoading) {
        var token = await getAccessToken();
        var user = await UserAPI.getUser(token);

        setTrackingPreferences(user.data.trackingPreferences);

        var allNotifications =
          await NotificationsHandler.getNotificationsForGroup(
            token,
            "notifications"
          );

        var habitNotifications =
          await NotificationsHandler.getNotificationsForGroup(token, "habit");

        var taskNotificationsIsOn =
          await NotificationsHandler.getGroupPreferenceNotificationsState(
            token,
            "taskPreference"
          );

        var moodNotificationsIsOn =
          await NotificationsHandler.getGroupPreferenceNotificationsState(
            token,
            "moodPreference"
          );
        var newMoodNotifications =
          await NotificationsHandler.getNotificationsForGroup(token, "mood-");

        var morningNotificationsIsOn =
          await NotificationsHandler.getGroupPreferenceNotificationsState(
            token,
            "morningPreference"
          );
        var newMorningNotifications =
          await NotificationsHandler.getNotificationsForGroup(
            token,
            "morning-"
          );

        var sleepNotificationsIsOn =
          await NotificationsHandler.getGroupPreferenceNotificationsState(
            token,
            "sleepPreference"
          );
        var newSleepNotifications =
          await NotificationsHandler.getNotificationsForGroup(token, "sleep-");

        setIsNotificationsEnabled(allNotifications[0]?.preference === "on");
        setIsHabitsEnabled(habitNotifications[0]?.preference === "on");
        setHabitExpoIDs(habitNotifications[0]?.expoIDs);
        setIsTasksEnabled(taskNotificationsIsOn == "on");

        setIsWellnessCheckinToggled(moodNotificationsIsOn == "on");
        setMoodNotifications(newMoodNotifications);

        setIsMorningAlarmToggled(morningNotificationsIsOn == "on");
        setMorningNotifications(newMorningNotifications);
        setIsBedTimeReminderToggled(sleepNotificationsIsOn == "on");
        setSleepNotifications(newSleepNotifications);

        var hour = habitNotifications[0]?.triggers[0]?.hour;
        if (hour == 0 || hour === undefined) {
          hour = "00";
        }
        var minute = habitNotifications[0]?.triggers[0]?.minute;
        if (minute == 0 || minute === undefined) {
          minute = "00";
        }
        var newTime = `1995-12-17T${hour}:${minute}:00`;

        setHabitTime(new Date(newTime));

        var breakfastNotifications =
          await NotificationsHandler.getNotificationsForGroup(
            token,
            "breakfast"
          );

        var lunchNotifications =
          await NotificationsHandler.getNotificationsForGroup(token, "lunch");

        var dinnerNotifications =
          await NotificationsHandler.getNotificationsForGroup(token, "dinner");

        setIsNotificationsEnabled(allNotifications[0]?.preference === "on");
        setIsBreakfastEnabled(breakfastNotifications[0]?.preference === "on");
        setIsLunchEnabled(lunchNotifications[0]?.preference === "on");
        setIsDinnerEnabled(dinnerNotifications[0]?.preference === "on");
        setBreakfastExpoIDs(breakfastNotifications[0]?.expoIDs);
        setLunchExpoIDs(lunchNotifications[0]?.expoIDs);
        setDinnerExpoIDs(dinnerNotifications[0]?.expoIDs);

        var breakfastHour = breakfastNotifications[0]?.triggers[0]?.hour;
        if (breakfastHour == 0 || breakfastHour === undefined) {
          breakfastHour = "00";
        }
        var breakfastMinute = breakfastNotifications[0]?.triggers[0]?.minute;
        if (breakfastMinute == 0 || breakfastMinute === undefined) {
          breakfastMinute = "00";
        }
        var newBreakfastTime = `1995-12-17T${breakfastHour}:${breakfastMinute}:00`;
        setBreakfastTime(new Date(newBreakfastTime));

        var lunchHour = lunchNotifications[0]?.triggers[0]?.hour;
        if (lunchHour == 0 || lunchHour === undefined) {
          lunchHour = "00";
        }
        var lunchMinute = lunchNotifications[0]?.triggers[0]?.minute;
        if (lunchMinute == 0 || lunchMinute === undefined) {
          lunchMinute = "00";
        }
        var newLunchTime = `1995-12-17T${lunchHour}:${lunchMinute}:00`;
        setLunchTime(new Date(newLunchTime));

        var dinnerHour = dinnerNotifications[0]?.triggers[0]?.hour;
        if (dinnerHour == 0 || dinnerHour === undefined) {
          dinnerHour = "00";
        }
        var dinnerMinute = dinnerNotifications[0]?.triggers[0]?.minute;
        if (dinnerMinute == 0 || dinnerMinute === undefined) {
          dinnerMinute = "00";
        }
        var newDinnerTime = `1995-12-17T${dinnerHour}:${dinnerMinute}:00`;
        setDinnerTime(new Date(newDinnerTime));

        setIsLoading(false);

        setIsLoading(false);
      }
    };
    onLoad();
  }, []);

  return (
    <View style={styles.container}>
      <Header showCenter={false} />
      <Spinner visible={isLoading}></Spinner>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.screenName}>Notifications</Text>
          <Switch
            width={55}
            height={32}
            onValueChange={allNotificationsToggled}
            value={isNotificationsEnabled}
            trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
            thumbColor={isNotificationsEnabled ? "#d7f6ff" : "#ffd8f7"}
          />
        </View>

        {(trackingPreferences.habitsSelected ||
          trackingPreferences.toDosSelected) && (
          <>
            <Text style={styles.sectionTitle}>Mind</Text>

            {trackingPreferences.habitsSelected && (
              <View style={[styles.habitContainer, styles.itemContainer4]}>
                <Switch
                  width={55}
                  height={32}
                  onValueChange={habitsToggled}
                  value={isHabitsEnabled}
                  trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
                  thumbColor={isHabitsEnabled ? "#d7f6ff" : "#ffd8f7"}
                />
                <Text style={styles.itemTitle}>Habits</Text>
                <View
                  style={[
                    styles.habitTimeContainer,
                    styles.itemContainer3,
                    { backgroundColor: "#D7F6FF" },
                  ]}
                >
                  <>
                    {Platform.OS === "ios" ? (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={habitTime}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onChangeHabitTime}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.timeButton}
                        testID="setMinMax"
                        value="time"
                        onPress={() => {
                          setShow(true);
                        }}
                        title="toggleMinMaxDate"
                      >
                        <Text style={styles.timeText}>
                          {formatDateObject(habitTime)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <>
                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={habitTime}
                          mode={"time"}
                          is24Hour={true}
                          onChange={onChangeHabitTime}
                        />
                      )}
                    </>
                  </View>
                </View>
              </View>
            )}
            {trackingPreferences.toDosSelected && (
              <View style={[styles.habitContainer, styles.itemContainer4]}>
                <Switch
                  width={55}
                  height={32}
                  onValueChange={tasksToggled}
                  value={isTasksEnabled}
                  trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
                  thumbColor={isTasksEnabled ? "#d7f6ff" : "#ffd8f7"}
                />
                <Text style={styles.itemTitle}>To-dos</Text>
              </View>
            )}
          </>
        )}

        {(trackingPreferences.fitnessSelected ||
          trackingPreferences.dietSelected) && (
          <>
            <Text style={styles.sectionTitle}>Physical</Text>
            {trackingPreferences.dietSelected && (
              <>
                <View style={[styles.habitContainer, styles.itemContainer4]}>
                  <Switch
                    width={55}
                    height={32}
                    onValueChange={breakfastToggled}
                    value={isBreakfastEnabled}
                    trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
                    thumbColor={isBreakfastEnabled ? "#d7f6ff" : "#ffd8f7"}
                  />
                  <Text style={styles.itemTitle}>Breakfast</Text>
                  <View
                    style={[
                      styles.habitTimeContainer,
                      styles.itemContainer3,
                      { backgroundColor: "#D7F6FF" },
                    ]}
                  >
                    <>
                      {Platform.OS === "ios" ? (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={breakfastTime}
                          mode={"time"}
                          is24Hour={true}
                          onChange={onChangeBreakfastTime}
                        />
                      ) : (
                        <TouchableOpacity
                          style={styles.timeButton}
                          testID="setMinMax"
                          value="time"
                          onPress={() => {
                            setShow(true);
                          }}
                          title="toggleMinMaxDate"
                        >
                          <Text style={styles.timeText}>
                            {formatDateObject(breakfastTime)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <>
                        {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={breakfastTime}
                            mode={"time"}
                            is24Hour={true}
                            onChange={onChangeBreakfastTime}
                          />
                        )}
                      </>
                    </View>
                  </View>
                </View>
                <View style={[styles.habitContainer, styles.itemContainer4]}>
                  <Switch
                    width={55}
                    height={32}
                    onValueChange={lunchToggled}
                    value={isLunchEnabled}
                    trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
                    thumbColor={isLunchEnabled ? "#d7f6ff" : "#ffd8f7"}
                  />
                  <Text style={styles.itemTitle}>Lunch</Text>
                  <View
                    style={[
                      styles.habitTimeContainer,
                      styles.itemContainer3,
                      { backgroundColor: "#D7F6FF" },
                    ]}
                  >
                    <>
                      {Platform.OS === "ios" ? (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={lunchTime}
                          mode={"time"}
                          is24Hour={true}
                          onChange={onChangeLunchTime}
                        />
                      ) : (
                        <TouchableOpacity
                          style={styles.timeButton}
                          testID="setMinMax"
                          value="time"
                          onPress={() => {
                            setShow(true);
                          }}
                          title="toggleMinMaxDate"
                        >
                          <Text style={styles.timeText}>
                            {formatDateObject(lunchTime)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <>
                        {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={lunchTime}
                            mode={"time"}
                            is24Hour={true}
                            onChange={onChangeLunchTime}
                          />
                        )}
                      </>
                    </View>
                  </View>
                </View>
                <View style={[styles.habitContainer, styles.itemContainer4]}>
                  <Switch
                    width={55}
                    height={32}
                    onValueChange={dinnerToggled}
                    value={isDinnerEnabled}
                    trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
                    thumbColor={isDinnerEnabled ? "#d7f6ff" : "#ffd8f7"}
                  />
                  <Text style={styles.itemTitle}>Dinner</Text>
                  <View
                    style={[
                      styles.habitTimeContainer,
                      styles.itemContainer3,
                      { backgroundColor: "#D7F6FF" },
                    ]}
                  >
                    <>
                      {Platform.OS === "ios" ? (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={dinnerTime}
                          mode={"time"}
                          is24Hour={true}
                          onChange={onChangeDinnerTime}
                        />
                      ) : (
                        <TouchableOpacity
                          style={styles.timeButton}
                          testID="setMinMax"
                          value="time"
                          onPress={() => {
                            setShow(true);
                          }}
                          title="toggleMinMaxDate"
                        >
                          <Text style={styles.timeText}>
                            {formatDateObject(dinnerTime)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <>
                        {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={dinnerTime}
                            mode={"time"}
                            is24Hour={true}
                            onChange={onChangeDinnerTime}
                          />
                        )}
                      </>
                    </View>
                  </View>
                </View>
              </>
            )}
          </>
        )}

        {(trackingPreferences.moodSelected ||
          trackingPreferences.sleepSelected) && (
          <>
            <Text style={styles.sectionTitle}>Spirit</Text>

            {trackingPreferences.moodSelected && (
              <Soultification
                title="Wellness check-in"
                body="It's time to check in with yourself"
                notifications={moodNotifications}
                isToggled={isWellnessCheckinToggled}
                toggled={wellnessCheckinToggled}
                setIsToggled={setIsWellnessCheckinToggled}
                group="mood"
              />
            )}
            {trackingPreferences.sleepSelected && (
              <>
                <Soultification
                  title="Sleep review"
                  body="Time to wake up amd review your sleep"
                  notifications={morningNotifications}
                  isToggled={isMorningAlarmToggled}
                  toggled={morningAlarmToggled}
                  setIsToggled={setIsMorningAlarmToggled}
                  group="morning"
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginTop: 25,
    marginBottom: 10,
  },

  habitContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
  },
  habitTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
  },
  itemContainer3: {
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginBottom: 0,
  },
  itemContainer4: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenName: {
    color: "#25436B",
    fontSize: 34,
    fontFamily: "Sego-Bold",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 32,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 35,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginLeft: 15,
    flex: 1,
  },
  timeText: {
    fontSize: 17,
    color: "#25436B",
    fontFamily: "Sego",
  },
  bottomItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  smallText: {
    color: "#25436B",
    fontSize: 12,
    fontFamily: "Sego",
  },
});

export default Notifications;
