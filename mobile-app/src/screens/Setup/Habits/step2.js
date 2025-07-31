import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Switch } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";
import Toast from "react-native-toast-message";

const HabitsNotifications = (props) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [systemNotificationsEnabled, setSystemNotificationsEnabled] =
    useState(false);
  const [habitExpoIDs, setHabitExpoIDs] = useState(false);

  const { selectedTrackers } = props.route.params;

  const [time, setTime] = useState(new Date("1995-12-17T12:00:00"));
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onNext = async () => {
    setIsLoading(true);
    var systemNotificationsStatus = true;
    const token = await getAccessToken();

    if (isNotificationsEnabled) {
      timeArray = formatDateObjectBackend(time).split(":");
      hour = timeArray[0];
      minute = timeArray[1];

      systemNotificationsStatus =
        await NotificationsHandler.checkNotificationsStatus(token);

      if (systemNotificationsStatus) {
        await NotificationsHandler.turnOnNotification(
          token,
          "habit",
          "Habit Journal",
          "Don't forget to update your habit progress",
          [{ hour: Number(hour), minute: Number(minute), repeats: true }],
          true,
          habitExpoIDs
        );
      }
    } else {
      await NotificationsHandler.updateNotification(
        token,
        "habit",
        "undefined",
        "undefined",
        "undefined",
        "undefined",
        "off"
      );
    }

    if (systemNotificationsStatus) {
      if (selectedTrackers.toDosSelected) {
        setIsLoading(false);
        navigationService.navigate("todos", { selectedTrackers });
      } else if (selectedTrackers.dietSelected) {
        setIsLoading(false);
        navigationService.navigate("goalSelection", { selectedTrackers });
      } else if (selectedTrackers.fitnessSelected) {
        setIsLoading(false);
        navigationService.navigate("fitness", { selectedTrackers });
      } else if (selectedTrackers.moodSelected) {
        setIsLoading(false);
        navigationService.navigate("mood", { selectedTrackers });
      } else if (selectedTrackers.sleepSelected) {
        setIsLoading(false);
        navigationService.navigate("sleep", { selectedTrackers });
      } else {
        setIsLoading(true);
        const accessToken = await getAccessToken();

        const { status: status, data: userData } = await UserAPI.getUser(
          accessToken
        );

        if (userData && !userData["isSetupComplete"]) {
          const { status, data } = await UserAPI.updateUser(
            true,
            selectedTrackers,
            accessToken
          );
          navigationService.reset("main", 0);
        } else {
          setIsLoading(true);
          if (!selectedTrackers.toDosSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "task"
            );
          }
          if (!selectedTrackers.habitsSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "habit"
            );
          }
          if (!selectedTrackers.moodSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "mood"
            );
          }
          if (!selectedTrackers.sleepSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "morning"
            );
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "sleep"
            );
          }
          setIsLoading(false);
          navigationService.reset("main", 0);
        }
        setIsLoading(false);
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Reminders are disabled",
        text2:
          "Turn on notifications in your device settings to get reminders.",
      });
    }

    setIsLoading(false);
  };
  const toggleSwitch = (turnOn = false) => {
    if (!isNotificationsEnabled || turnOn) {
      if (systemNotificationsEnabled) {
        setIsNotificationsEnabled(true);
      } else {
        setIsNotificationsEnabled(false);
        Toast.show({
          type: "info",
          text1: "Notifications are disabled",
          text2: "To get reminders, you need to enable them.",
        });
      }
    } else {
      setIsNotificationsEnabled(false);
    }
  };

  const onChange = (event, selectedDate) => {
    setTime(selectedDate);
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      toggleSwitch(true);
    }
    if (Platform.OS === "android" && event.type === "dismissed") {
      setIsToggled(false);
    }
  };

  const formatDateObject = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return dateObject.toLocaleString("en-US", options);
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
    const getSystemNotificationPreference = async () => {
      setIsLoading(true);
      token = await getAccessToken();
      allNotificationsIsOn =
        await NotificationsHandler.getAllNotificationsState(token);
      setSystemNotificationsEnabled(allNotificationsIsOn == "on");

      var allNotifications = await NotificationsHandler.getNotifications(
        token,
        "notifications"
      );
      var habitNotifications = await NotificationsHandler.getNotifications(
        token,
        "habit"
      );

      if (habitNotifications.length > 0) {
        setIsNotificationsEnabled(habitNotifications[0]?.preference === "on");
        setHabitExpoIDs(habitNotifications[0]?.expoIDs);

        var hour = habitNotifications[0]?.triggers[0]?.hour;
        if (hour == 0 || hour === undefined) {
          hour = "00";
        }
        var minute = habitNotifications[0]?.triggers[0]?.minute;
        if (minute == 0 || minute === undefined) {
          minute = "00";
        }
        var newTime = `1995-12-17T${hour}:${minute}:00`;

        setTime(new Date(newTime));
      }
      setIsLoading(false);
    };

    getSystemNotificationPreference();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/habits512.png")}
        />
        <Text style={styles.imageText}>habits</Text>
      </View>
      <View style={styles.notification}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.title]}>Notifications:</Text>
          <View>
            <Switch
              width={55}
              height={32}
              onValueChange={toggleSwitch}
              value={isNotificationsEnabled}
              trackColor={{ true: "#d7f6ff", false: "#D5CBFF" }}
              thumbColor={isNotificationsEnabled ? "#d7f6ff" : "#D5CBFF"}
            />
          </View>
        </View>
        <Text style={[styles.text, styles.minitext]}>
          Get a daily reminder to update your habit progress.
        </Text>

        <View style={styles.timeRow}>
          {Platform.OS === "ios" ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
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
              <Text style={styles.timeText}>{formatDateObject(time)}</Text>
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={"time"}
                is24Hour={false}
                onChange={onChange}
              />
            )}
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button onPress={() => onNext()} style={styles.button}>
          Next
        </Button>
      </View>
      <Toast position="bottom" bottomOffset={140} visibilityTime={2500} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(255, 207, 245, 0.70)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  title: {
    fontFamily: "Sego-Bold",
    fontSize: 26,
  },
  boldText: {
    fontFamily: "Sego-Bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 60,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  notification: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 200,
    borderRadius: 40,
    paddingHorizontal: 25,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  center: {},
  selectImage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 25,
  },
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#25436B",
    fontSize: 30,
    fontFamily: "Sego",
  },
  minitext: {
    fontSize: 15,
    marginTop: 10,
  },
  timeButton: {
    borderWidth: 1.5,
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 40,
    borderRadius: 20,
    width: 130,
  },
  timeText: {
    fontFamily: "Sego",
    fontSize: 18,
    color: "#25436B",
    textAlign: "center",
    alignItems: "center",
    marginTop: 5,
  },
});

export default HabitsNotifications;
