import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import Soultification from "../../Settings/Notifications/soultification";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";

const SleepStep1 = (props) => {
  const { selectedTrackers } = props.route.params;

  const [isMorningAlarmToggled, setIsMorningAlarmToggled] = useState(false);
  const [morningNotifications, setMorningNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const morningAlarmToggled = async (notificationTriggers) => {
    setIsLoading(true);
    const token = await getAccessToken();

    var systemNotificationsStatus = true;
    systemNotificationsStatus =
      await NotificationsHandler.checkNotificationsStatus(token);

    if (systemNotificationsStatus) {
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
                true,
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
    } else {
      Toast.show(
        "To get reminders, you need to turn on notifications in your phone's settings.",
        {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        }
      );
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
      var newMorningNotifications =
        await NotificationsHandler.getNotificationsForGroup(token, "morning-");

      setIsMorningAlarmToggled(morningNotificationsIsOn == "on");
      setMorningNotifications(newMorningNotifications);

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
            source={require("../../../assets/images/sleep.png")}
          />
          <Text style={styles.imageText}>sleep</Text>
        </View>
        <View style={{ marginTop: 65 }}>
          <Soultification
            title="Morning alarm"
            body="Time to wake up amd review your sleep"
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
        <Button
          onPress={() =>
            navigationService.navigate("sleepStep2", { selectedTrackers })
          }
          style={styles.button}
        >
          Next
        </Button>
      </View>
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
    backgroundColor: "#FFEFBD",
    borderWidth: 2,
    borderColor: "#CCBF98",
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
    fontSize: 24,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 20,
    marginLeft: 10,
  },
  boldText: {
    fontFamily: "Sego-Bold",
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
    borderColor: "#CCCCCC",
  },
  bigButtons: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
    height: 100,
    borderRadius: 40,
    marginTop: 10,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  notification: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 20,
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
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#25436B",
    fontSize: 24,
    fontFamily: "Sego",
  },
  minitext: {
    fontSize: 13,
    marginTop: 10,
  },
  selectText: {
    margin: 20,
    fontSize: 20,
  },
  selectTime: {
    marginBottom: 0,
  },
  timeText: {
    fontSize: 16,
  },
  notificationCon: {
    height: "auto",
    flexDirection: "column",
    paddingHorizontal: 0,
    alignItems: "flex-start",
  },
  inactive: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  dayBt: {
    height: 35,
    borderRadius: 10,
    marginBottom: 0,
  },
  timeCon: {
    paddingHorizontal: 20,
  },
  dayList: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  whatTime: {
    fontSize: 20,
  },
  addButton: {
    alignSelf: "center",
    marginVertical: 15,
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default SleepStep1;
