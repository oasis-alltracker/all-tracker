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
import EmotionalItem from "./emotionalItem";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../../user/keychain";
import DateTimePicker from "@react-native-community/datetimepicker";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import UserAPI from "../../../api/user/userAPI";

const physicalData = [
  {
    title: "Breakfast",
    time: "8:00 AM",
  },
  {
    title: "Lunch",
    time: "8:00 AM",
  },
  {
    title: "Dinner",
    time: "8:00 AM",
  },
];

const emotionalData = [
  "Wellness check-in",
  "Bedtime reminder",
  "Morning alarm",
];

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trackingPreferences, setTrackingPreferences] = useState({});

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isHabitsEnabled, setIsHabitsEnabled] = useState(false);
  const [habitExpoIDs, setHabitExpoIDs] = useState([]);
  const [habitTime, setHabitTime] = useState(new Date("1995-12-17T12:00:00"));
  const [show, setShow] = useState(false);
  const [isTasksEnabled, setIsTasksEnabled] = useState(false);

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
          habitExpoIDs,
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
            habitExpoIDs,
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
            },
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
          await NotificationsHandler.turnOffAllTaskNotifications(token);
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
            await NotificationsHandler.turnOnTaskNotifications(token);
          } else {
            Toast.show(
              "To get reminders, you need to turn on notifications in your phone's settings.",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
              },
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

  const allNotificationsToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      await NotificationsHandler.turnOffAllNotifications(token);
      setIsNotificationsEnabled(false);
      setIsHabitsEnabled(false);
      setIsTasksEnabled(false);
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
          },
        );
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

  const onChange = async (event, selectedDate) => {
    setIsLoading(true);
    setIsHabitsEnabled(false);
    if (Platform.OS === "android") {
      setShow(false);
    }

    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(selectedDate).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isHabitsEnabled) {
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
          habitExpoIDs,
        );
        if (expoIDs) {
          setHabitExpoIDs(expoIDs);
        }
      } else {
        Toast.show(
          "To get reminders, you need to turn on notifications in your phone's settings.",
          {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          },
        );
      }
    }

    setHabitTime(selectedDate);
    setIsLoading(false);
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
            "notifications",
          );
        var habitNotifications =
          await NotificationsHandler.getNotificationsForGroup(token, "habit");
        var taskNotificationsIsOn =
          await NotificationsHandler.getTaskPreferenceNotificationsState(token);

        setIsNotificationsEnabled(allNotifications[0]?.preference === "on");
        setIsHabitsEnabled(habitNotifications[0]?.preference === "on");
        setHabitExpoIDs(habitNotifications[0]?.expoIDs);
        setIsTasksEnabled(taskNotificationsIsOn == "on");

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
                        onChange={onChange}
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
                          onChange={onChange}
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
            {physicalData.map((val, key) => {
              return (
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
              );
            })}
          </>
        )}

        {(trackingPreferences.fitnessSelected ||
          trackingPreferences.dietSelected) && (
          <>
            <Text style={styles.sectionTitle}>Emotional</Text>
            {emotionalData.map((val, key) => {
              return <EmotionalItem item={val} key={key} />;
            })}
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
    borderWidth: 2,
    borderColor: "#ccc",
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
    fontSize: 32,
    fontFamily: "Sego-Bold",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 35,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 30,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  itemTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
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
