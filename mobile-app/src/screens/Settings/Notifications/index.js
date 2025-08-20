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
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../../user/keychain";
import DateTimePicker from "@react-native-community/datetimepicker";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import UserAPI from "../../../api/user/userAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValueSheet } from "../../../ValueSheet";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [trackingPreferences, setTrackingPreferences] = useState({});

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const [isHabitsEnabled, setIsHabitsEnabled] = useState(false);

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
  const [isSystemNotificationsEnabled, setIsSystemNotificationsEnabled] =
    useState(false);
  const [morningNotifications, setMorningNotifications] = useState(false);
  const [isBedTimeReminderToggled, setIsBedTimeReminderToggled] =
    useState(false);
  const [sleepNotifications, setSleepNotifications] = useState(false);

  const allNotificationsToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled && isSystemNotificationsEnabled) {
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
      setIsSystemNotificationsEnabled(systemNotificationsStatus ? true : false);
      if (systemNotificationsStatus) {
        await NotificationsHandler.turnOnAllNotifications(token);
        setIsNotificationsEnabled(true);
      } else {
        Toast.show({
          type: "info",
          text1: "Reminders are disabled",
          text2:
            "Turn on notifications in your device settings to get reminders.",
        });
      }
    }
    setIsLoading(false);
  };

  const habitsToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      if (isHabitsEnabled) {
        setIsHabitsEnabled(false);
        try {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "habit"
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
            setIsHabitsEnabled(true);
            await NotificationsHandler.turnOnGroupPreferenceNotifications(
              token,
              "habit",
              true
            );
          } else {
            Toast.show({
              type: "info",
              text1: "Reminders are disabled",
              text2:
                "Turn on notifications in your device settings to get reminders.",
            });
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications are disabled",
        text2: "To get reminders, you need to enable them.",
      });
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
            Toast.show({
              type: "info",
              text1: "Reminders are disabled",
              text2:
                "Turn on notifications in your device settings to get reminders.",
            });
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications are disabled",
        text2: "To get reminders, you need to enable them.",
      });
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
          Toast.show({
            type: "info",
            text1: "Reminders are disabled",
            text2:
              "Turn on notifications in your device settings to get reminders.",
          });
        }
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications are disabled",
        text2: "To get reminders, you need to enable them.",
      });
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
          Toast.show({
            type: "info",
            text1: "Reminders are disabled",
            text2:
              "Turn on notifications in your device settings to get reminders.",
          });
        }
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications are disabled",
        text2: "To get reminders, you need to enable them.",
      });
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
          Toast.show({
            type: "info",
            text1: "Reminders are disabled",
            text2:
              "Turn on notifications in your device settings to get reminders.",
          });
        }
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications are disabled",
        text2: "To get reminders, you need to enable them.",
      });
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
            Toast.show({
              type: "info",
              text1: "Reminders are disabled",
              text2:
                "Turn on notifications in your device settings to get reminders.",
            });
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications are disabled",
        text2: "To get reminders, you need to enable them.",
      });
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
            Toast.show({
              type: "info",
              text1: "Reminders are disabled",
              text2:
                "Turn on notifications in your device settings to get reminders.",
            });
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Notifications are disabled",
        text2: "To get reminders, you need to enable them.",
      });
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
        try {
          var token = await getAccessToken();
          var user = await UserAPI.getUser(token);

          setTrackingPreferences(user.data.trackingPreferences);

          var allNotifications = await NotificationsHandler.getNotifications(
            token,
            "notifications"
          );

          var systemNotifications =
            await NotificationsHandler.checkNotificationsStatus(token);

          var habitNotifications =
            await NotificationsHandler.getGroupPreferenceNotificationsState(
              token,
              "habitPreference"
            );

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
            await NotificationsHandler.getNotifications(token, "mood-");

          var morningNotificationsIsOn =
            await NotificationsHandler.getGroupPreferenceNotificationsState(
              token,
              "morningPreference"
            );
          var newMorningNotifications =
            await NotificationsHandler.getNotifications(token, "morning-");

          var sleepNotificationsIsOn =
            await NotificationsHandler.getGroupPreferenceNotificationsState(
              token,
              "sleepPreference"
            );
          var newSleepNotifications =
            await NotificationsHandler.getNotifications(token, "sleep-");

          setIsSystemNotificationsEnabled(systemNotifications ? true : false);
          setIsNotificationsEnabled(allNotifications[0]?.preference === "on");
          setIsHabitsEnabled(habitNotifications == "on");
          setIsTasksEnabled(taskNotificationsIsOn == "on");

          setIsWellnessCheckinToggled(moodNotificationsIsOn == "on");
          setMoodNotifications(newMoodNotifications);

          setIsMorningAlarmToggled(morningNotificationsIsOn == "on");
          setMorningNotifications(newMorningNotifications);
          setIsBedTimeReminderToggled(sleepNotificationsIsOn == "on");
          setSleepNotifications(newSleepNotifications);

          var breakfastNotifications =
            await NotificationsHandler.getNotifications(token, "breakfast");

          var lunchNotifications = await NotificationsHandler.getNotifications(
            token,
            "lunch"
          );

          var dinnerNotifications = await NotificationsHandler.getNotifications(
            token,
            "dinner"
          );

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
        } catch (e) {
          setIsLoading(false);
          console.log(e);
        }
      }
    };
    onLoad();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header showCenter={false} />
      <Spinner visible={isLoading}></Spinner>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screenNameContainer}>
          <Text style={styles.screenName}>Notifications</Text>
          <Switch
            width={55}
            height={32}
            onValueChange={allNotificationsToggled}
            value={isNotificationsEnabled && isSystemNotificationsEnabled}
            trackColor={{
              true: ValueSheet.colours.secondaryColour,
              false: ValueSheet.colours.purple,
            }}
            thumbColor={
              isNotificationsEnabled && isSystemNotificationsEnabled
                ? ValueSheet.colours.secondaryColour
                : ValueSheet.colours.purple
            }
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
                  disabled={
                    !isNotificationsEnabled || !isSystemNotificationsEnabled
                  }
                  value={isHabitsEnabled}
                  trackColor={{
                    true: ValueSheet.colours.secondaryColour,
                    false: ValueSheet.colours.purple,
                  }}
                  thumbColor={
                    isHabitsEnabled && isSystemNotificationsEnabled
                      ? ValueSheet.colours.secondaryColour
                      : ValueSheet.colours.purple
                  }
                />
                <Text style={styles.itemTitle}>Habits</Text>
              </View>
            )}
            {trackingPreferences.toDosSelected && (
              <View style={[styles.habitContainer, styles.itemContainer4]}>
                <Switch
                  width={55}
                  height={32}
                  onValueChange={tasksToggled}
                  disabled={
                    !isNotificationsEnabled || !isSystemNotificationsEnabled
                  }
                  value={isTasksEnabled}
                  trackColor={{
                    true: ValueSheet.colours.secondaryColour,
                    false: ValueSheet.colours.purple,
                  }}
                  thumbColor={
                    isTasksEnabled && isSystemNotificationsEnabled
                      ? ValueSheet.colours.secondaryColour
                      : ValueSheet.colours.purple
                  }
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
                    trackColor={{
                      true: ValueSheet.colours.secondaryColour,
                      false: ValueSheet.colours.purple,
                    }}
                    disabled={
                      !isNotificationsEnabled || !isSystemNotificationsEnabled
                    }
                    thumbColor={
                      isBreakfastEnabled && isSystemNotificationsEnabled
                        ? ValueSheet.colours.secondaryColour
                        : ValueSheet.colours.purple
                    }
                  />
                  <Text style={styles.itemTitle}>Breakfast</Text>
                  <View
                    style={[
                      styles.habitTimeContainer,
                      styles.itemContainer3,
                      { backgroundColor: ValueSheet.colours.secondaryColour },
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
                            is24Hour={false}
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
                    disabled={
                      !isNotificationsEnabled || !isSystemNotificationsEnabled
                    }
                    trackColor={{
                      true: ValueSheet.colours.secondaryColour,
                      false: ValueSheet.colours.purple,
                    }}
                    thumbColor={
                      isLunchEnabled && isSystemNotificationsEnabled
                        ? ValueSheet.colours.secondaryColour
                        : ValueSheet.colours.purple
                    }
                  />
                  <Text style={styles.itemTitle}>Lunch</Text>
                  <View
                    style={[
                      styles.habitTimeContainer,
                      styles.itemContainer3,
                      { backgroundColor: ValueSheet.colours.secondaryColour },
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
                            is24Hour={false}
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
                    disabled={
                      !isNotificationsEnabled || !isSystemNotificationsEnabled
                    }
                    value={isDinnerEnabled}
                    trackColor={{
                      true: ValueSheet.colours.secondaryColour,
                      false: ValueSheet.colours.purple,
                    }}
                    thumbColor={
                      isDinnerEnabled && isSystemNotificationsEnabled
                        ? ValueSheet.colours.secondaryColour
                        : ValueSheet.colours.purple
                    }
                  />
                  <Text style={styles.itemTitle}>Dinner</Text>
                  <View
                    style={[
                      styles.habitTimeContainer,
                      styles.itemContainer3,
                      { backgroundColor: ValueSheet.colours.secondaryColour },
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
                            is24Hour={false}
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
                toggledHandler={wellnessCheckinToggled}
                setIsToggled={setIsWellnessCheckinToggled}
                disabled={
                  !isNotificationsEnabled || !isSystemNotificationsEnabled
                }
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
                  toggledHandler={morningAlarmToggled}
                  setIsToggled={setIsMorningAlarmToggled}
                  disabled={
                    !isNotificationsEnabled || !isSystemNotificationsEnabled
                  }
                  group="morning"
                />
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  screenNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
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
    borderColor: ValueSheet.colours.grey,
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
  screenName: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 34,
    fontFamily: ValueSheet.fonts.primaryBold,
    flex: 1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 32,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 35,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontSize: 22,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginLeft: 15,
    flex: 1,
  },
  timeText: {
    fontSize: 17,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
});

export default Notifications;
