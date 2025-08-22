import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";
import Spinner from "react-native-loading-spinner-overlay";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import ThemedSwitch from "../../../components/ThemedSwitch";

const DietNotifications = (props) => {
  const theme = useContext(ThemeContext).value;
  const { selectedTrackers } = props.route.params;
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

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

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

  const breakfastToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(breakfastTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isBreakfastEnabled) {
      await NotificationsHandler.turnOffNotification(
        token,
        "breakfast",
        breakfastExpoIDs
      );
      setIsBreakfastEnabled((previousState) => !previousState);
    } else {
      var systemNotificationsStatus = true;
      systemNotificationsStatus =
        await NotificationsHandler.checkNotificationsStatus(token);
      if (systemNotificationsStatus || !isNotificationsEnabled) {
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
          setIsBreakfastEnabled((previousState) => !previousState);
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

    setIsLoading(false);
  };

  const lunchToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(lunchTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isLunchEnabled) {
      await NotificationsHandler.turnOffNotification(
        token,
        "lunch",
        lunchExpoIDs
      );
      setIsLunchEnabled((previousState) => !previousState);
    } else {
      var systemNotificationsStatus = true;
      systemNotificationsStatus =
        await NotificationsHandler.checkNotificationsStatus(token);
      if (systemNotificationsStatus || !isNotificationsEnabled) {
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
          setIsLunchEnabled((previousState) => !previousState);
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

    setIsLoading(false);
  };

  const dinnerToggled = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(dinnerTime).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isDinnerEnabled) {
      await NotificationsHandler.turnOffNotification(
        token,
        "dinner",
        dinnerExpoIDs
      );
      setIsDinnerEnabled((previousState) => !previousState);
    } else {
      var systemNotificationsStatus = true;
      systemNotificationsStatus =
        await NotificationsHandler.checkNotificationsStatus(token);
      if (systemNotificationsStatus || !isNotificationsEnabled) {
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
          setIsDinnerEnabled((previousState) => !previousState);
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

    setIsLoading(false);
  };

  const onChangeBreakfastTime = async (event, selectedDate) => {
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
    if (Platform.OS === "android") {
      setShow(false);
    }
    setBreakfastTime(selectedDate);
  };

  const onChangeLunchTime = async (event, selectedDate) => {
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
    if (Platform.OS === "android") {
      setShow(false);
    }
    setLunchTime(selectedDate);
  };

  const onChangeDinnerTime = async (event, selectedDate) => {
    if (isDinnerEnabled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(
        token,
        "dinner",
        dinnerExpoIDs
      );
      setIsDinnerEnabled(false);
      setDinnerExpoIDs([]);
    }
    if (Platform.OS === "android") {
      setShow(false);
    }
    setDinnerTime(selectedDate);
  };

  const onNext = async () => {
    try {
      if (selectedTrackers.fitnessSelected) {
        navigationService.navigate("fitness", { selectedTrackers });
      } else if (selectedTrackers.moodSelected) {
        navigationService.navigate("mood", { selectedTrackers });
      } else if (selectedTrackers.sleepSelected) {
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
          const { status, data } = await UserAPI.updateUser(
            true,
            selectedTrackers,
            accessToken
          );
          navigationService.reset("main", 0);
        }
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Toast.show({
        type: "info",
        text1: "Something went wrong",
        text2: "Please try again.",
      });
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true);
      var token = await getAccessToken();

      var allNotifications = await NotificationsHandler.getNotifications(
        token,
        "notifications"
      );

      var breakfastNotifications = await NotificationsHandler.getNotifications(
        token,
        "breakfast"
      );

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
    };
    onLoad();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <Spinner visible={isLoading}></Spinner>

      <View style={styles.center}>
        <View
          style={[styles.imageCon, sharedStyles["purpleContainer_" + theme]]}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/diet.png")}
          />
          <Text style={[styles.imageText, sharedStyles["textColour_light"]]}>
            diet
          </Text>
        </View>

        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          Notifications:
        </Text>

        <Text
          style={[
            styles.text,
            styles.minitext,
            sharedStyles["textColour_" + theme],
          ]}
        >
          Get personalized reminders to stay on track
        </Text>
        <View
          style={[
            styles.mealContainer,
            styles.itemContainer4,
            sharedStyles["borderedContainer_" + theme],
          ]}
        >
          <ThemedSwitch
            width={55}
            height={32}
            onValueChange={breakfastToggled}
            value={isBreakfastEnabled}
          />
          <Text style={[styles.itemTitle, sharedStyles["textColour_" + theme]]}>
            Breakfast
          </Text>
          <View
            style={[
              styles.mealTimeContainer,
              styles.itemContainer3,
              sharedStyles["timePicker_" + theme],
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
                  <Text
                    style={[styles.timeText, sharedStyles["textColour_light"]]}
                  >
                    {formatDateObject(breakfastTime)}
                  </Text>
                </TouchableOpacity>
              )}
            </>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View
          style={[
            styles.mealContainer,
            styles.itemContainer4,
            sharedStyles["borderedContainer_" + theme],
          ]}
        >
          <ThemedSwitch
            width={55}
            height={32}
            onValueChange={lunchToggled}
            value={isLunchEnabled}
          />
          <Text style={[styles.itemTitle, sharedStyles["textColour_" + theme]]}>
            Lunch
          </Text>
          <View
            style={[
              styles.mealTimeContainer,
              styles.itemContainer3,
              sharedStyles["timePicker_" + theme],
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
                  <Text
                    style={[styles.timeText, sharedStyles["textColour_light"]]}
                  >
                    {formatDateObject(lunchTime)}
                  </Text>
                </TouchableOpacity>
              )}
            </>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View
          style={[
            styles.mealContainer,
            styles.itemContainer4,
            sharedStyles["borderedContainer_" + theme],
          ]}
        >
          <ThemedSwitch
            width={55}
            height={32}
            onValueChange={dinnerToggled}
            value={isDinnerEnabled}
          />
          <Text style={[styles.itemTitle, sharedStyles["textColour_" + theme]]}>
            Dinner
          </Text>
          <View
            style={[
              styles.mealTimeContainer,
              styles.itemContainer3,
              sharedStyles["timePicker_" + theme],
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
                  <Text
                    style={[styles.timeText, sharedStyles["textColour_light"]]}
                  >
                    {formatDateObject(dinnerTime)}
                  </Text>
                </TouchableOpacity>
              )}
            </>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      </View>
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
  center: { alignItems: "center" },
  text: {
    fontSize: 24,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  minitext: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 35,
  },
  title: {
    fontSize: 28,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 25,
    textAlign: "center",
  },
  timeText: {
    fontSize: 16,
  },
  mealContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
  },
  mealTimeContainer: {
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
  itemTitle: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginLeft: 15,
    flex: 1,
  },
});

export default DietNotifications;
