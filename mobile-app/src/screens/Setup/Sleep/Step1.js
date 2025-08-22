import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";
import Spinner from "react-native-loading-spinner-overlay";
import Soultification from "../../Settings/Notifications/soultification";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const SleepStep1 = (props) => {
  const theme = useContext(ThemeContext).value;
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
        text1: "Reminders are disabled",
        text2:
          "Turn on notifications in your device settings to get reminders.",
      });
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
      Toast.show({
        type: "info",
        text1: "Something went wrong",
        text2: "Please try again.",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <Spinner visible={isLoading}></Spinner>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.center}
      >
        <View
          style={[styles.imageCon, sharedStyles["yellowContainer_" + theme]]}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/sleep.png")}
          />
          <Text style={[styles.imageText, sharedStyles["textColour_light"]]}>
            sleep
          </Text>
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
          style={styles.button}
        >
          Back
        </Button>
        <Button
          onPress={() => onNext()}
          style={styles.button}
          positiveSelect={true}
        >
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
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
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
  center: {},
});

export default SleepStep1;
