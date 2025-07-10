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

const Mood = (props) => {
  const { selectedTrackers } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);

  const [isWellnessCheckinToggled, setIsWellnessCheckinToggled] =
    useState(false);
  const [moodNotifications, setMoodNotifications] = useState(false);

  const wellnessCheckinToggled = async (
    notificationTriggers,
    turnOn = false
  ) => {
    setIsLoading(true);
    const token = await getAccessToken();

    var systemNotificationsStatus = true;
    systemNotificationsStatus =
      await NotificationsHandler.checkNotificationsStatus(token);

    if (systemNotificationsStatus) {
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
                true,
                notificationTriggers[i].expoIDs
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

  const onNext = async () => {
    try {
      if (selectedTrackers.sleepSelected) {
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
    } catch (e) {
      console.log(e);
      setIsLoading(false);
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

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true);
      var token = await getAccessToken();
      var moodNotificationsIsOn =
        await NotificationsHandler.getGroupPreferenceNotificationsState(
          token,
          "moodPreference"
        );
      var newMoodNotifications = await NotificationsHandler.getNotifications(
        token,
        "mood-"
      );
      setIsWellnessCheckinToggled(moodNotificationsIsOn == "on");
      setMoodNotifications(newMoodNotifications);

      setIsLoading(false);
    };
    onLoad();
  }, []);

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
            source={require("../../../assets/images/mood.png")}
          />
          <Text style={styles.imageText}>mood</Text>
        </View>
        <View style={{ marginTop: 65 }}>
          <Soultification
            title="Wellness check-in"
            body="It's time to check in with yourself"
            notifications={moodNotifications}
            isToggled={isWellnessCheckinToggled}
            toggled={wellnessCheckinToggled}
            setIsToggled={setIsWellnessCheckinToggled}
            group="mood"
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

export default Mood;
