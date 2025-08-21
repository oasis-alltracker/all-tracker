import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Switch,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../../user/keychain";
import DateTimePicker from "@react-native-community/datetimepicker";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { ValueSheet } from "../../../ValueSheet";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";
import ThemedSwitch from "../../../components/ThemedSwitch";

const weekDays = ["Every day", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Soultification = ({
  title,
  body,
  notifications,
  isToggled,
  toggledHandler,
  setIsToggled,
  disabled,
  group,
}) => {
  const theme = useContext(ThemeContext).value;
  const [isLoading, setIsLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [activeSchedule1, setActiveSchedule1] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [timeSchedule1, setTimeSchedule1] = useState(
    new Date("1995-12-17T12:00:00")
  );
  const [expoIDsSchedule1, setExpoIDsSchedule1] = useState([]);

  const [activeSchedule2, setActiveSchedule2] = useState(null);
  const [timeSchedule2, setTimeSchedule2] = useState(
    new Date("1995-12-17T12:00:00")
  );
  const [expoIDsSchedule2, setExpoIDsSchedule2] = useState([]);

  const [activeSchedule3, setActiveSchedule3] = useState(null);
  const [timeSchedule3, setTimeSchedule3] = useState(
    new Date("1995-12-17T12:00:00")
  );
  const [expoIDsSchedule3, setExpoIDsSchedule3] = useState([]);

  const formatDateObjectBackend = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return dateObject.toLocaleString("en-US", options);
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
    setIsLoading(true);
    if (isToggled) {
      const token = await getAccessToken();
      await NotificationsHandler.turnOffGroupPreferenceNotifications(
        token,
        group,
        [...expoIDsSchedule1, ...expoIDsSchedule2, ...expoIDsSchedule3]
      );
    }
    if (!activeSchedule2) {
      setActiveSchedule2([
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
    } else if (!activeSchedule3) {
      setActiveSchedule3([
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
    }
    onToggle(true);
    setIsLoading(false);
  };

  const removeSchedule2 = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    await NotificationsHandler.turnOffNotification(
      token,
      group + "-2",
      expoIDsSchedule2
    );
    await NotificationsHandler.deleteNotification(token, group + "-2");

    setActiveSchedule2(null);
    setIsLoading(false);
  };
  const removeSchedule3 = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    await NotificationsHandler.turnOffNotification(
      token,
      group + "-3",
      expoIDsSchedule2
    );
    await NotificationsHandler.deleteNotification(token, group + "-3");

    setActiveSchedule3(null);
    setIsLoading(false);
  };

  const onToggle = async (turnOn = false, scheduleIndex, selectedDate) => {
    setIsLoading(true);
    var notificationTriggers = [];

    if (!isToggled || turnOn) {
      if (activeSchedule1) {
        var triggerDates = [...activeSchedule1];
        if (activeSchedule1[0]) {
          triggerDates = Array.from({ length: 8 }, (_) => true);
        }
        var newTimeSchedule = timeSchedule1;
        if (scheduleIndex == 1) {
          newTimeSchedule = selectedDate;
        }
        timeArray = formatDateObjectBackend(newTimeSchedule).split(":");
        hour = timeArray[0];
        minute = timeArray[1];

        var triggers = [];
        for (var i = 1; i < triggerDates.length; i++) {
          if (triggerDates[i]) {
            triggers.push({
              hour: Number(hour),
              minute: Number(minute),
              weekday: i,
              repeats: true,
            });
          }
        }

        notificationTriggers.push({
          triggers: triggers,
          expoIDs: expoIDsSchedule1,
        });
      }

      if (activeSchedule2) {
        var triggerDates = [...activeSchedule2];
        if (activeSchedule2[0]) {
          triggerDates = Array.from({ length: 8 }, (_) => true);
        }
        var newTimeSchedule = timeSchedule2;
        if (scheduleIndex == 2) {
          newTimeSchedule = selectedDate;
        }
        timeArray = formatDateObjectBackend(newTimeSchedule).split(":");
        hour = timeArray[0];
        minute = timeArray[1];

        var triggers = [];
        for (var i = 1; i < triggerDates.length; i++) {
          if (triggerDates[i]) {
            triggers.push({
              hour: Number(hour),
              minute: Number(minute),
              weekday: i,
              repeats: true,
            });
          }
        }
        notificationTriggers.push({
          triggers: triggers,
          expoIDs: expoIDsSchedule2,
        });
      }
      if (activeSchedule3) {
        var triggerDates = [...activeSchedule3];
        if (activeSchedule3[0]) {
          triggerDates = Array.from({ length: 8 }, (_) => true);
        }
        var newTimeSchedule = timeSchedule3;
        if (scheduleIndex == 3) {
          newTimeSchedule = selectedDate;
        }
        timeArray = formatDateObjectBackend(newTimeSchedule).split(":");
        hour = timeArray[0];
        minute = timeArray[1];

        var triggers = [];
        for (var i = 1; i < triggerDates.length; i++) {
          if (triggerDates[i]) {
            triggers.push({
              hour: Number(hour),
              minute: Number(minute),
              weekday: i,
              repeats: true,
            });
          }
        }
        notificationTriggers.push({
          triggers: triggers,
          expoIDs: expoIDsSchedule3,
        });
      }
    }
    var listOfExpoIDs = await toggledHandler(notificationTriggers, turnOn);
    if (listOfExpoIDs) {
      for (var i = 0; i < listOfExpoIDs.length; i++) {
        if (i == 0) {
          setExpoIDsSchedule1(listOfExpoIDs[i]);
        }
        if (i == 1) {
          setExpoIDsSchedule2(listOfExpoIDs[i]);
        }
        if (i == 2) {
          setExpoIDsSchedule3(listOfExpoIDs[i]);
        }
      }
    }
    setIsLoading(false);
  };

  const onChangeSchedule1 = async (event, selectedDate) => {
    setTimeSchedule1(selectedDate);

    if (Platform.OS === "android") {
      setShow1(false);
    }

    if (isToggled) {
      const token = await getAccessToken();
      const prevExpoIDs = [
        ...expoIDsSchedule1,
        ...expoIDsSchedule2,
        ...expoIDsSchedule3,
      ];
      await NotificationsHandler.turnOffGroupPreferenceNotifications(
        token,
        group,
        prevExpoIDs
      );

      setExpoIDsSchedule1([]);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true, 1, selectedDate);
    }
  };

  const onChangeSchedule2 = async (event, selectedDate) => {
    setTimeSchedule2(selectedDate);
    if (Platform.OS === "android") {
      setShow2(false);
    }
    if (isToggled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupPreferenceNotifications(token, group, [
        ...expoIDsSchedule1,
        ...expoIDsSchedule2,
        ...expoIDsSchedule3,
      ]);

      setExpoIDsSchedule2([]);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true, 2, selectedDate);
    }
  };

  const onChangeSchedule3 = async (event, selectedDate) => {
    setTimeSchedule3(selectedDate);
    if (Platform.OS === "android") {
      setShow3(false);
    }
    if (isToggled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupPreferenceNotifications(token, group, [
        ...expoIDsSchedule1,
        ...expoIDsSchedule2,
        ...expoIDsSchedule3,
      ]);

      setExpoIDsSchedule3([]);
    }

    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      onToggle(true, 3, selectedDate);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      if (notifications) {
        setIsLoading(true);
        for (notification of notifications) {
          if (notification.SK === group + "-1") {
            setExpoIDsSchedule1(notification.expoIDs);
            var newActiveSchedule = Array.from({ length: 8 }, (_) => false);
            for (trigger of notification.triggers) {
              newActiveSchedule[trigger.weekday] = true;
            }
            var everyDay = true;
            for (var i = 1; i < newActiveSchedule.length; i++) {
              if (!newActiveSchedule[i]) {
                everyDay = false;
                break;
              }
            }
            if (everyDay) {
              newActiveSchedule = [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
            }
            setActiveSchedule1(newActiveSchedule);

            var hour = notification.triggers[0]?.hour;
            if (hour == 0 || hour === undefined) {
              hour = "00";
            }
            var minute = notification.triggers[0]?.minute;
            if (minute == 0 || minute === undefined) {
              minute = "00";
            }
            var newTime = `1995-12-17T${hour}:${minute}:00`;

            setTimeSchedule1(new Date(newTime));
          }
          if (notification.SK === group + "-2") {
            setExpoIDsSchedule2(notification.expoIDs);

            var newActiveSchedule = Array.from({ length: 8 }, (_) => false);
            for (trigger of notification.triggers) {
              newActiveSchedule[trigger.weekday] = true;
            }
            var everyDay = true;
            for (var i = 1; i < newActiveSchedule.length; i++) {
              if (!newActiveSchedule[i]) {
                everyDay = false;
                break;
              }
            }
            if (everyDay) {
              newActiveSchedule = [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
            }
            setActiveSchedule2(newActiveSchedule);

            var hour = notification.triggers[0]?.hour;
            if (hour == 0 || hour === undefined) {
              hour = "00";
            }
            var minute = notification.triggers[0]?.minute;
            if (minute == 0 || minute === undefined) {
              minute = "00";
            }
            var newTime = `1995-12-17T${hour}:${minute}:00`;

            setTimeSchedule2(new Date(newTime));
          }
          if (notification.SK === group + "-3") {
            setExpoIDsSchedule3(notification.expoIDs);

            var newActiveSchedule = Array.from({ length: 8 }, (_) => false);
            for (trigger of notification.triggers) {
              newActiveSchedule[trigger.weekday] = true;
            }
            var everyDay = true;
            for (var i = 1; i < newActiveSchedule.length; i++) {
              if (!newActiveSchedule[i]) {
                everyDay = false;
                break;
              }
            }
            if (everyDay) {
              newActiveSchedule = [
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
            }
            setActiveSchedule3(newActiveSchedule);

            var hour = notification.triggers[0]?.hour;
            if (hour == 0 || hour === undefined) {
              hour = "00";
            }
            var minute = notification.triggers[0]?.minute;
            if (minute == 0 || minute === undefined) {
              minute = "00";
            }
            var newTime = `1995-12-17T${hour}:${minute}:00`;

            setTimeSchedule3(new Date(newTime));
          }
        }
        setIsLoading(false);
      }
    };
    onLoad();
  }, [notifications]);

  return (
    <>
      <View
        style={[
          styles.itemContainer,
          styles.itemContainer2,
          sharedStyles["borderedContainer_" + theme],
        ]}
      >
        <Spinner visible={isLoading}></Spinner>
        <View style={styles.line}>
          <Text style={[styles.itemTitle, sharedStyles["textColour_" + theme]]}>
            {title}
          </Text>
          <ThemedSwitch
            width={55}
            height={32}
            onValueChange={onToggle}
            value={isToggled}
            disabled={disabled}
          />
        </View>
        {activeSchedule1 && (
          <>
            <View style={[styles.line, { marginTop: 8 }]}>
              {weekDays.map((val, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={async () => {
                      if (isToggled) {
                        const token = await getAccessToken();
                        NotificationsHandler.turnOffGroupPreferenceNotifications(
                          token,
                          group,
                          [
                            ...expoIDsSchedule1,
                            ...expoIDsSchedule2,
                            ...expoIDsSchedule3,
                          ]
                        );
                        setIsToggled(false);
                      }

                      var newActiveSchedule;
                      if (index == 0 && !activeSchedule1[index]) {
                        newActiveSchedule = [
                          true,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ];
                      } else {
                        newActiveSchedule = [...activeSchedule1];
                        newActiveSchedule[index] = !activeSchedule1[index];

                        var selectEveryDay = true;
                        for (var i = 0; i < newActiveSchedule.length; i++) {
                          if (newActiveSchedule[i]) {
                            selectEveryDay = false;
                            break;
                          }
                        }
                        if (selectEveryDay) {
                          newActiveSchedule[0] = true;
                        } else {
                          newActiveSchedule[0] = false;
                        }
                      }

                      setActiveSchedule1(newActiveSchedule);
                    }}
                    style={
                      activeSchedule1[index]
                        ? [
                            styles.itemContainer,
                            styles.itemContainer4,
                            sharedStyles["button_" + theme],
                          ]
                        : {}
                    }
                  >
                    <Text
                      style={[
                        styles.smallText,
                        activeSchedule1[index]
                          ? { color: ValueSheet.colours.light.primaryColour }
                          : sharedStyles["textColour_" + theme],
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.timeContainer}>
              <View
                style={[
                  styles.timePickerContainer,
                  sharedStyles["button_" + theme],
                ]}
              >
                <>
                  {Platform.OS === "ios" ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={timeSchedule1}
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
                      <Text
                        style={[
                          styles.timeText,
                          sharedStyles["textColour_" + theme],
                        ]}
                      >
                        {formatDateObject(timeSchedule1)}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <>
                    {show1 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule1}
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
        {activeSchedule2 && (
          <>
            <View style={[styles.line, { marginTop: 20 }]}>
              {weekDays.map((val, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={async () => {
                      if (isToggled) {
                        const token = await getAccessToken();
                        NotificationsHandler.turnOffGroupPreferenceNotifications(
                          token,
                          group,
                          [
                            ...expoIDsSchedule1,
                            ...expoIDsSchedule2,
                            ...expoIDsSchedule3,
                          ]
                        );
                        setIsToggled(false);
                      }
                      var newActiveSchedule;
                      if (index == 0 && !activeSchedule2[index]) {
                        newActiveSchedule = [
                          true,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ];
                      } else {
                        newActiveSchedule = [...activeSchedule2];
                        newActiveSchedule[index] = !activeSchedule2[index];

                        var selectEveryDay = true;
                        for (var i = 0; i < newActiveSchedule.length; i++) {
                          if (newActiveSchedule[i]) {
                            selectEveryDay = false;
                            break;
                          }
                        }
                        if (selectEveryDay) {
                          newActiveSchedule[0] = true;
                        } else {
                          newActiveSchedule[0] = false;
                        }
                      }

                      setActiveSchedule2(newActiveSchedule);
                    }}
                    style={
                      activeSchedule2[index]
                        ? [
                            styles.itemContainer,
                            styles.itemContainer4,
                            sharedStyles["button_" + theme],
                          ]
                        : {}
                    }
                  >
                    <Text
                      style={[
                        styles.smallText,
                        activeSchedule2[index]
                          ? { color: ValueSheet.colours.light.primaryColour }
                          : sharedStyles["textColour_" + theme],
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.timeContainer}>
              <View
                style={[
                  styles.timePickerContainer,
                  sharedStyles["button_" + theme],
                ]}
              >
                <>
                  {Platform.OS === "ios" ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={timeSchedule2}
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
                      <Text
                        style={[
                          styles.timeText,
                          sharedStyles["textColour_" + theme],
                        ]}
                      >
                        {formatDateObject(timeSchedule2)}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <>
                    {show2 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule2}
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
        {activeSchedule3 && (
          <>
            <View style={[styles.line, { marginTop: 20 }]}>
              {weekDays.map((val, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={async () => {
                      if (isToggled) {
                        const token = await getAccessToken();
                        NotificationsHandler.turnOffGroupPreferenceNotifications(
                          token,
                          group,
                          [
                            ...expoIDsSchedule1,
                            ...expoIDsSchedule2,
                            ...expoIDsSchedule3,
                          ]
                        );
                        setIsToggled(false);
                      }
                      var newActiveSchedule;
                      if (index == 0 && !activeSchedule3[index]) {
                        newActiveSchedule = [
                          true,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                          false,
                        ];
                      } else {
                        newActiveSchedule = [...activeSchedule3];
                        newActiveSchedule[index] = !activeSchedule3[index];

                        var selectEveryDay = true;
                        for (var i = 0; i < newActiveSchedule.length; i++) {
                          if (newActiveSchedule[i]) {
                            selectEveryDay = false;
                            break;
                          }
                        }
                        if (selectEveryDay) {
                          newActiveSchedule[0] = true;
                        } else {
                          newActiveSchedule[0] = false;
                        }
                      }

                      setActiveSchedule3(newActiveSchedule);
                    }}
                    style={
                      activeSchedule3[index]
                        ? [
                            styles.itemContainer,
                            styles.itemContainer4,
                            sharedStyles["button_" + theme],
                          ]
                        : {}
                    }
                  >
                    <Text
                      style={[
                        styles.smallText,
                        activeSchedule3[index]
                          ? { color: ValueSheet.colours.light.primaryColour }
                          : sharedStyles["textColour_" + theme],
                      ]}
                    >
                      {val}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.timeContainer}>
              <View
                style={[
                  styles.timePickerContainer,
                  sharedStyles["button_" + theme],
                ]}
              >
                <>
                  {Platform.OS === "ios" ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={timeSchedule3}
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
                      <Text
                        style={[
                          styles.timeText,
                          sharedStyles["textColour_" + theme],
                        ]}
                      >
                        {formatDateObject(timeSchedule3)}
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <>
                    {show3 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={timeSchedule3}
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
        {!activeSchedule2 && !activeSchedule3 && (
          <View style={{ flexDirection: "row" }}>
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
          </View>
        )}
        {activeSchedule2 && !activeSchedule3 && (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                removeSchedule2();
              }}
            >
              <Image
                source={require("../../../assets/images/trash.png")}
                resizeMode="contain"
                style={[styles.trashImage, sharedStyles["tint_" + theme]]}
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
          </View>
        )}
        {activeSchedule2 && activeSchedule3 && (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                removeSchedule3();
              }}
            >
              <Image
                source={require("../../../assets/images/trash.png")}
                resizeMode="contain"
                style={[styles.trashImage, sharedStyles["tint_" + theme]]}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
  },
  timePickerContainer: {
    borderRadius: 15,
    paddingVertical: 5,
    alignItems: "center",
    borderWidth: 0.7,
    width: 114,
    paddingRight: 5,
  },
  timeText: {
    fontSize: 17,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  itemContainer4: {
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 3,
    marginBottom: 0,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 5,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryBold,
    flex: 1,
  },
  smallText: {
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryFont,
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

export default Soultification;
