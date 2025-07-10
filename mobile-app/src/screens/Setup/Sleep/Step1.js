import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";
import Spinner from "react-native-loading-spinner-overlay";
import Soultification from "../../Settings/Notifications/soultification";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { ValueSheet } from "../../../ValueSheet";

const SleepStep1 = (props) => {
  const { selectedTrackers } = props.route.params;

  const [isMorningAlarmToggled, setIsMorningAlarmToggled] = useState(false);
  const [morningNotifications, setMorningNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const morningAlarmToggled = async (notificationTriggers, turnOn = false) => {
    setIsLoading(true);
    const token = await getAccessToken();

    var systemNotificationsStatus = true;
    systemNotificationsStatus =
      await NotificationsHandler.checkNotificationsStatus(token);

    if (systemNotificationsStatus) {
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
                true,
                notificationTriggers.expoIDs
              );
              listOfExpoIDs.push(expoIDs);
            }
            setIsLoading(false);
            return listOfExpoIDs;
          } else {
            if (Platform.OS === "ios") {
              Toast.show(
                "To get reminders, you need to turn on notifications in your phone's settings.",
                {
                  ...styles.errorToast,
                  duration: Toast.durations.LONG,
                  position: Toast.positions.BOTTOM,
                }
              );
            } else {
              Toast.show(
                "To get reminders, you need to turn on notifications in your phone's settings.",
                {
                  ...styles.errorToast,
                  duration: Toast.durations.LONG,
                  position: Toast.positions.TOP,
                }
              );
            }
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        }
      }
    } else {
      if (Platform.OS === "ios") {
        Toast.show(
          "To get reminders, you need to turn on notifications in your phone's settings.",
          {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          }
        );
      } else {
        Toast.show(
          "To get reminders, you need to turn on notifications in your phone's settings.",
          {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
          }
        );
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true);
      var token = await getAccessToken();

      var morningNotificationsIsOn =
        await NotificationsHandler.getGroupPreferenceNotificationsState(
          token,
          "morningPreference"
        );
      var newMorningNotifications = await NotificationsHandler.getNotifications(
        token,
        "morning-"
      );

      setIsMorningAlarmToggled(morningNotificationsIsOn == "on");
      setMorningNotifications(newMorningNotifications);

      setIsLoading(false);
    };
    onLoad();
  }, []);

  const onNext = async () => {
    setIsLoading(true);
    try {
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
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading}></Spinner>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.center}
      >
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/sleep.png")}
          />
          <Text style={styles.imageText}>sleep</Text>
        </View>
        <View style={{ marginTop: 65 }}>
          <Soultification
            title="Sleep review"
            body="Time to wake up and review your sleep"
            notifications={morningNotifications}
            isToggled={isMorningAlarmToggled}
            toggled={morningAlarmToggled}
            setIsToggled={setIsMorningAlarmToggled}
            group="morning"
          />
        </View>
      </ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#FFEFBD",
    borderWidth: 2,
    borderColor: "#ffe8a1",
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
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
  },
  center: {},
});

export default SleepStep1;
