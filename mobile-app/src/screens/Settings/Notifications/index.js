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

  const habitsToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(habitTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isNotificationsEnabled) {
      if (isHabitsEnabled) {
        await NotificationsHandler.turnOffNotification(
          token,
          "habit",
          habitExpoIDs
        );
        setIsHabitsEnabled((previousState) => !previousState);
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
            setIsHabitsEnabled((previousState) => !previousState);
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
              "task"
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

    setIsLoading(false);
  };

  const morningAlarmToggled = async (notificationTriggers) => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      if (isMorningAlarmToggled) {
        setIsMorningAlarmToggled((previousState) => !previousState);
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
            setIsMorningAlarmToggled((previousState) => !previousState);
            await NotificationsHandler.turnOnGroupPreferenceNotifications(
              token,
              "morning"
            );
            var listOfExpoIDs = [];
            for (var i = 0; i < notificationTriggers.length; i++) {
              const expoIDs = await NotificationsHandler.turnOnNotification(
                token,
                "morning-" + (i + 1),
                "Morning alarm",
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

    setIsLoading(false);
  };

  const bedTimeReminderToggled = async (notificationTriggers) => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      if (isBedTimeReminderToggled) {
        setIsBedTimeReminderToggled((previousState) => !previousState);
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
            setIsBedTimeReminderToggled((previousState) => !previousState);
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

    setIsLoading(false);
  };

  const wellnessCheckinToggled = async (notificationTriggers) => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      if (isWellnessCheckinToggled) {
        setIsWellnessCheckinToggled((previousState) => !previousState);
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
            setIsWellnessCheckinToggled((previousState) => !previousState);
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
    setIsHabitsEnabled(false);
    if (Platform.OS === "android") {
      setShow(false);
    }

    setHabitTime(selectedDate);
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
            <Text style={styles.sectionTitle}>Mental</Text>

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
            <View
              key={key.toString()}
              style={[styles.itemContainer, styles.itemContainer4]}
            >
              <Switch />
              <Text style={styles.itemTitle}>{val.title}</Text>
              <View
                style={[
                  styles.itemContainer,
                  styles.itemContainer3,
                  { backgroundColor: "#D7F6FF" },
                ]}
              >
                <Text style={styles.smallText}>{val.time}</Text>
              </View>
            </View>
          </>
        )}

        {(trackingPreferences.moodSelected ||
          trackingPreferences.sleepSelected) && (
          <>
            <Text style={styles.sectionTitle}>Spiritual</Text>

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
                  title="Bedtime reminder"
                  body="It's time for bed"
                  notifications={sleepNotifications}
                  isToggled={isBedTimeReminderToggled}
                  toggled={bedTimeReminderToggled}
                  setIsToggled={setIsBedTimeReminderToggled}
                  group="sleep"
                />
                <Soultification
                  title="Morning alarm"
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
