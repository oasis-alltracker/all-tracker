import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import RNModal from "react-native-modal";
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import Toast from "react-native-toast-message";
import { getAccessToken } from "../../../user/keychain";
import { ValueSheet } from "../../../ValueSheet";

export default function HabitNotificationsModal({ getRef, reopenMain }) {
  const [isVisible, setIsVisible] = useState(false);

  const [systemNotificationsEnabled, setSystemNotificationsEnabled] =
    useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);

  const [isMiniLoading, setIsMiniLoading] = useState(false);

  const [scheduleCount, setScheduleCount] = useState(1);

  const [timeSchedule, setTimeSchedule] = useState([
    new Date("1995-12-17T12:00:00"),
    new Date("1995-12-17T12:00:00"),
    new Date("1995-12-17T12:00:00"),
    new Date("1995-12-17T12:00:00"),
    new Date("1995-12-17T12:00:00"),
  ]);

  const formatDateObjectBackend = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return dateObject.toLocaleString("en-US", options).split(":");
  };
  const formatDateObject = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return dateObject.toLocaleString("en-US", options);
  };

  const addNewSchedule = async () => {
    if (scheduleCount < 5) {
      if (systemNotificationsEnabled) {
        setScheduleCount(scheduleCount + 1);
      } else {
        setIsMiniLoading(true);
        var token = await getAccessToken();
        var allNotificationsIsOn =
          await NotificationsHandler.getAllNotificationsState(token);
        var habitNotificationsIsOn =
          await NotificationsHandler.getGroupPreferenceNotificationsState(
            token,
            "habitPreference"
          );
        var systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);

        if (
          allNotificationsIsOn == "on" &&
          habitNotificationsIsOn == "on" &&
          systemNotificationsStatus
        ) {
          setScheduleCount(scheduleCount + 1);
          setSystemNotificationsEnabled(
            allNotificationsIsOn == "on" &&
              habitNotificationsIsOn == "on" &&
              systemNotificationsStatus
          );
        } else {
          Toast.show({
            type: "info",
            text1: "Reminders are disabled",
            text2:
              "Turn on notifications in your device settings to get reminders.",
          });
        }
        setIsMiniLoading(false);
      }
    }
  };

  const removeSchedule = async () => {
    if (scheduleCount > 1) {
      setScheduleCount(scheduleCount - 1);
    }
  };

  const onToggle = async (turnOn = false) => {
    if (turnOn || !isNotificationsOn) {
      if (systemNotificationsEnabled) {
        setIsNotificationsOn(true);
      } else {
        var token = await getAccessToken();
        var allNotificationsIsOn =
          await NotificationsHandler.getAllNotificationsState(token);
        var habitNotificationsIsOn =
          await NotificationsHandler.getGroupPreferenceNotificationsState(
            token,
            "habitPreference"
          );
        var systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);

        if (
          allNotificationsIsOn == "on" &&
          habitNotificationsIsOn == "on" &&
          systemNotificationsStatus
        ) {
          setIsNotificationsOn(true);
          setSystemNotificationsEnabled(
            allNotificationsIsOn == "on" &&
              habitNotificationsIsOn == "on" &&
              systemNotificationsStatus
          );
        } else {
          setIsNotificationsOn(false);
          Toast.show({
            type: "info",
            text1: "Reminders are disabled",
            text2:
              "Turn on notifications in your device settings to get reminders.",
          });
        }
      }
    } else {
      setIsNotificationsOn(false);
    }
  };

  useEffect(() => {
    let ref = {
      open(props) {
        setScheduleCount(props.scheduleCount);

        var tempTimeSchedule = [...timeSchedule];

        for (var i = 0; i < props.scheduleCount; i++) {
          var hour = props.times[i][0].toString();
          if (hour.length == 1) {
            hour = "0" + hour;
          }

          var minute = props.times[i][1].toString();
          if (minute.length == 1) {
            minute = "0" + minute;
          }

          reminderTimeFromNotification = new Date(
            `1995-12-17T${hour}:${minute}:00`
          );
          tempTimeSchedule[i] = reminderTimeFromNotification;
        }

        setTimeSchedule([...tempTimeSchedule]);
        setIsNotificationsOn(props.isNotificationsOn);

        setIsVisible(true);
      },
      close() {
        setIsVisible(false);
        reopenMain();
      },
    };

    getRef(ref);
  }, []);

  const onSave = (habit) => {
    setIsVisible(false);

    var times = new Array(scheduleCount);
    for (var i = 0; i < scheduleCount; i++) {
      var time = formatDateObjectBackend(timeSchedule[i]);
      times[i] = time;
    }

    reopenMain(scheduleCount, times, isNotificationsOn);
  };

  const onChangeSchedule1 = async (event, selectedDate) => {
    var tempTimeSchedule = [...timeSchedule];
    tempTimeSchedule[0] = selectedDate;
    setTimeSchedule(tempTimeSchedule);

    if (Platform.OS === "android") {
      setShow1(false);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true);
    }
  };

  const onChangeSchedule2 = async (event, selectedDate) => {
    var tempTimeSchedule = [...timeSchedule];
    tempTimeSchedule[1] = selectedDate;
    setTimeSchedule(tempTimeSchedule);

    if (Platform.OS === "android") {
      setShow2(false);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true);
    }
  };

  const onChangeSchedule3 = async (event, selectedDate) => {
    var tempTimeSchedule = [...timeSchedule];
    tempTimeSchedule[2] = selectedDate;
    setTimeSchedule(tempTimeSchedule);

    if (Platform.OS === "android") {
      setShow3(false);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true);
    }
  };

  const onChangeSchedule4 = async (event, selectedDate) => {
    var tempTimeSchedule = [...timeSchedule];
    tempTimeSchedule[3] = selectedDate;
    setTimeSchedule(tempTimeSchedule);

    if (Platform.OS === "android") {
      setShow4(false);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true);
    }
  };

  const onChangeSchedule5 = async (event, selectedDate) => {
    var tempTimeSchedule = [...timeSchedule];
    tempTimeSchedule[4] = selectedDate;
    setTimeSchedule(tempTimeSchedule);

    if (Platform.OS === "android") {
      setShow5(false);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true);
    }
  };

  const onExit = async () => {
    Alert.alert(
      "Exit",
      "Any changes will be lost",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Ok",
          isPreferred: true,
          onPress: () => {
            setIsVisible(false);
            reopenMain();
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <RNModal
      isVisible={isVisible}
      onBackButtonPress={() => onExit()}
      onBackdropPress={() => onExit()}
      backdropOpacity={0}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Notifications</Text>
          <Switch
            width={55}
            height={32}
            onValueChange={onToggle}
            value={isNotificationsOn}
            trackColor={{
              true: ValueSheet.colours.secondaryColour,
              false: ValueSheet.colours.purple,
            }}
            thumbColor={
              isNotificationsOn
                ? ValueSheet.colours.secondaryColour
                : ValueSheet.colours.purple
            }
          />
        </View>
        <View style={styles.scheduleContainer}>
          {scheduleCount >= 1 && (
            <>
              <View style={styles.timeContainer}>
                <View
                  style={[
                    styles.timePickerContainer,
                    { backgroundColor: ValueSheet.colours.secondaryColour },
                  ]}
                >
                  <>
                    {Platform.OS === "ios" ? (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule[0]}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onChangeSchedule1}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.timeButton}
                        testID="setMinMax"
                        value="time"
                        onPress={() => {
                          setShow1(true);
                        }}
                        title="toggleMinMaxDate"
                      >
                        <Text style={styles.timeText}>
                          {formatDateObject(timeSchedule[0])}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <>
                      {show1 && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={timeSchedule[0]}
                          mode={"time"}
                          is24Hour={false}
                          onChange={onChangeSchedule1}
                        />
                      )}
                    </>
                  </View>
                </View>
              </View>
            </>
          )}
          {scheduleCount >= 2 && (
            <>
              <View style={styles.timeContainer}>
                <View
                  style={[
                    styles.timePickerContainer,
                    { backgroundColor: ValueSheet.colours.secondaryColour },
                  ]}
                >
                  <>
                    {Platform.OS === "ios" ? (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule[1]}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onChangeSchedule2}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.timeButton}
                        testID="setMinMax"
                        value="time"
                        onPress={() => {
                          setShow2(true);
                        }}
                        title="toggleMinMaxDate"
                      >
                        <Text style={styles.timeText}>
                          {formatDateObject(timeSchedule[1])}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <>
                      {show2 && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={timeSchedule[1]}
                          mode={"time"}
                          is24Hour={false}
                          onChange={onChangeSchedule2}
                        />
                      )}
                    </>
                  </View>
                </View>
              </View>
            </>
          )}
          {scheduleCount >= 3 && (
            <>
              <View style={styles.timeContainer}>
                <View
                  style={[
                    styles.timePickerContainer,
                    { backgroundColor: ValueSheet.colours.secondaryColour },
                  ]}
                >
                  <>
                    {Platform.OS === "ios" ? (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule[2]}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onChangeSchedule3}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.timeButton}
                        testID="setMinMax"
                        value="time"
                        onPress={() => {
                          setShow3(true);
                        }}
                        title="toggleMinMaxDate"
                      >
                        <Text style={styles.timeText}>
                          {formatDateObject(timeSchedule[2])}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <>
                      {show3 && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={timeSchedule[2]}
                          mode={"time"}
                          is24Hour={false}
                          onChange={onChangeSchedule3}
                        />
                      )}
                    </>
                  </View>
                </View>
              </View>
            </>
          )}
          {scheduleCount >= 4 && (
            <>
              <View style={styles.timeContainer}>
                <View
                  style={[
                    styles.timePickerContainer,
                    { backgroundColor: ValueSheet.colours.secondaryColour },
                  ]}
                >
                  <>
                    {Platform.OS === "ios" ? (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule[3]}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onChangeSchedule4}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.timeButton}
                        testID="setMinMax"
                        value="time"
                        onPress={() => {
                          setShow4(true);
                        }}
                        title="toggleMinMaxDate"
                      >
                        <Text style={styles.timeText}>
                          {formatDateObject(timeSchedule[3])}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <>
                      {show4 && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={timeSchedule[3]}
                          mode={"time"}
                          is24Hour={false}
                          onChange={onChangeSchedule4}
                        />
                      )}
                    </>
                  </View>
                </View>
              </View>
            </>
          )}
          {scheduleCount >= 5 && (
            <>
              <View style={styles.timeContainer}>
                <View
                  style={[
                    styles.timePickerContainer,
                    { backgroundColor: ValueSheet.colours.secondaryColour },
                  ]}
                >
                  <>
                    {Platform.OS === "ios" ? (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule[4]}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onChangeSchedule5}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.timeButton}
                        testID="setMinMax"
                        value="time"
                        onPress={() => {
                          setShow5(true);
                        }}
                        title="toggleMinMaxDate"
                      >
                        <Text style={styles.timeText}>
                          {formatDateObject(timeSchedule[4])}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <>
                      {show5 && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={timeSchedule[4]}
                          mode={"time"}
                          is24Hour={false}
                          onChange={onChangeSchedule5}
                        />
                      )}
                    </>
                  </View>
                </View>
              </View>
            </>
          )}
          {scheduleCount == 1 && (
            <View style={{ flexDirection: "row" }}>
              {isMiniLoading ? (
                <ActivityIndicator
                  size="small"
                  color={ValueSheet.colours.primaryColour}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    addNewSchedule();
                  }}
                >
                  <Image
                    source={require("../../../assets/images/plus.png")}
                    resizeMode="contain"
                    style={styles.plusImage}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          {scheduleCount > 1 && scheduleCount < 5 && (
            <View style={{ flexDirection: "row" }}>
              {isMiniLoading ? (
                <ActivityIndicator
                  size="small"
                  color={ValueSheet.colours.primaryColour}
                />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      removeSchedule();
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/trash.png")}
                      resizeMode="contain"
                      style={styles.trashImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      addNewSchedule();
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/plus.png")}
                      resizeMode="contain"
                      style={styles.plusImage}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
          {scheduleCount == 5 && (
            <View style={{ flexDirection: "row" }}>
              {isMiniLoading ? (
                <ActivityIndicator
                  size="small"
                  color={ValueSheet.colours.primaryColour}
                />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      removeSchedule();
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/trash.png")}
                      resizeMode="contain"
                      style={styles.trashImage}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            onPress={() => onExit()}
            style={styles.notificationButton}
          >
            <Text style={styles.notificationButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onSave()}
            style={styles.notificationButton}
          >
            <Text style={styles.notificationButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 490,
    borderWidth: 1,
    borderBlockColor: ValueSheet.colours.black50,
  },
  scheduleContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    height: "60%",
  },
  buttonsRow: {
    borderTopWidth: 1,
    borderColor: ValueSheet.colours.black10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    marginTop: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  title: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 32,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginVertical: 24,
  },
  timePickerContainer: {
    borderRadius: 15,
    paddingVertical: 5,
    alignItems: "center",
    width: 140,
    paddingRight: 5,
    backgroundColor: ValueSheet.colours.secondaryColour,
  },
  timeText: {
    fontSize: 17,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 5,
  },
  notificationButton: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 10,
  },
  notificationButtonText: {
    color: ValueSheet.colours.datePickerBlue,
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  plusImage: {
    width: 22,
    height: 22,
    alignSelf: "center",
    marginTop: 10,
    marginHorizontal: 10,
  },
  trashImage: {
    width: 22,
    height: 22,
    alignSelf: "center",
    marginTop: 8,
    marginHorizontal: 10,
  },
});
