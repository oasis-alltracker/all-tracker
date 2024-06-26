import React, { useState, useEffect } from "react";
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

const weekDays = ["Every day", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Soultification = ({
  title,
  body,
  notifications,
  isToggled,
  toggled,
  setIsToggled,
  group,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

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

  const addNewSchedule = async () => {
    if (isToggled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(token, group);
      setIsToggled(false);
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
  };

  const removeSchedule2 = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    await NotificationsHandler.turnOffNotification(
      token,
      group + "-2",
      expoIDsSchedule2
    );
    await NotificationsHandler.deleteNotification(group + "-2", token);

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
    await NotificationsHandler.deleteNotification(group + "-3", token);

    setActiveSchedule3(null);
    setIsLoading(false);
  };

  const onToggle = async () => {
    setIsLoading(true);
    var notificationTriggers = [];

    const token = await getAccessToken();

    if (!isToggled) {
      if (activeSchedule1) {
        var triggerDates = [...activeSchedule1];
        if (activeSchedule1[0]) {
          triggerDates = Array.from({ length: 8 }, (_) => true);
        }
        timeArray = formatDateObjectBackend(timeSchedule1).split(":");
        hour = timeArray[0];
        minute = timeArray[1];

        var triggers = [];
        for (var i = 1; i < triggerDates.length; i++) {
          if (triggerDates[i]) {
            triggers.push({
              hour: Number(hour),
              minute: Number(minute),
              weekday: i,
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
        timeArray = formatDateObjectBackend(timeSchedule2).split(":");
        hour = timeArray[0];
        minute = timeArray[1];

        var triggers = [];
        for (var i = 1; i < triggerDates.length; i++) {
          if (triggerDates[i]) {
            triggers.push({
              hour: Number(hour),
              minute: Number(minute),
              weekday: i,
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
        timeArray = formatDateObjectBackend(timeSchedule3).split(":");
        hour = timeArray[0];
        minute = timeArray[1];

        var triggers = [];
        for (var i = 1; i < triggerDates.length; i++) {
          if (triggerDates[i]) {
            triggers.push({
              hour: Number(hour),
              minute: Number(minute),
              weekday: i,
            });
          }
        }
        notificationTriggers.push({
          triggers: triggers,
          expoIDs: expoIDsSchedule3,
        });
      }
    }
    var listOfExpoIDs = await toggled(notificationTriggers);
    if (listOfExpoIDs) {
      for (var i = 1; i <= 3; i++) {
        if (i == 1) {
          setExpoIDsSchedule1(listOfExpoIDs[i - 1]);
        }
        if (i == 2) {
          setExpoIDsSchedule2(listOfExpoIDs[i - 1]);
        }
        if (i == 3) {
          setExpoIDsSchedule3(listOfExpoIDs[i - 1]);
        }
      }
    }
    setIsLoading(false);
  };

  const onChangeSchedule1 = async (event, selectedDate) => {
    if (isToggled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(token, group);
      setIsToggled(false);
    }
    if (Platform.OS === "android") {
      setShow(false);
    }
    setTimeSchedule1(selectedDate);
  };

  const onChangeSchedule2 = async (event, selectedDate) => {
    if (isToggled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(token, group);
      setIsToggled(false);
    }
    if (Platform.OS === "android") {
      setShow(false);
    }
    setTimeSchedule2(selectedDate);
  };

  const onChangeSchedule3 = async (event, selectedDate) => {
    if (isToggled) {
      const token = await getAccessToken();
      NotificationsHandler.turnOffGroupNotifications(token, group);
      setIsToggled(false);
    }
    if (Platform.OS === "android") {
      setShow(false);
    }
    setTimeSchedule3(selectedDate);
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
    <View style={[styles.itemContainer, styles.itemContainer2]}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.line}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Switch
          width={55}
          height={32}
          onValueChange={onToggle}
          value={isToggled}
          trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
          thumbColor={isToggled ? "#d7f6ff" : "#ffd8f7"}
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
                      NotificationsHandler.turnOffGroupNotifications(
                        token,
                        group
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
                      ? [styles.itemContainer, styles.itemContainer4]
                      : {}
                  }
                >
                  <Text style={styles.smallText}>{val}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.line}>
            <Text style={[styles.smallText, { fontSize: 15 }]}>
              A what time ?
            </Text>
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
                      NotificationsHandler.turnOffGroupNotifications(
                        token,
                        group
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
                      ? [styles.itemContainer, styles.itemContainer4]
                      : {}
                  }
                >
                  <Text style={styles.smallText}>{val}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.line}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  removeSchedule2();
                }}
              >
                <Image
                  source={require("../../../assets/images/trash.png")}
                  resizeMode="contain"
                  style={styles.trashImage}
                />
              </TouchableOpacity>
              <Text style={[styles.smallText, { fontSize: 15 }]}>
                A what time ?
              </Text>
            </View>
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
                      NotificationsHandler.turnOffGroupNotifications(
                        token,
                        group
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
                      ? [styles.itemContainer, styles.itemContainer4]
                      : {}
                  }
                >
                  <Text style={styles.smallText}>{val}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.line}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  removeSchedule3();
                }}
              >
                <Image
                  source={require("../../../assets/images/trash.png")}
                  resizeMode="contain"
                  style={styles.trashImage}
                />
              </TouchableOpacity>
              <Text style={[styles.smallText, { fontSize: 15 }]}>
                A what time ?
              </Text>
            </View>

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
        </>
      )}
      {!(activeSchedule2 && activeSchedule3) && (
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
  },
  itemContainer3: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 0,
    backgroundColor: "#D7F6FF",
  },
  itemContainer4: {
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 3,
    marginBottom: 0,
    backgroundColor: "#D7F6FF",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  screenName: {
    color: "#25436B",
    fontSize: 30,
    fontFamily: "Sego-Bold",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 40,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  itemTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    flex: 1,
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
  plusImage: {
    width: 22,
    height: 22,
    alignSelf: "center",
    marginTop: 10,
  },
  trashImage: {
    width: 22,
    height: 22,
    alignSelf: "center",
    marginRight: 5,
  },
});

export default Soultification;
