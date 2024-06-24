import React, { useState } from "react";
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
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import DateTimePicker from "@react-native-community/datetimepicker";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";

const weekDays = ["Every day", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Soultification = ({
  title,
  body,
  notifications,
  isToggled,
  toggled,
  setIsToggled,
  group,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const [activeSchedule1, setActiveSchedule1] = useState([
    false,
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

  const [activeSchedule2, setActiveSchedule2] = useState(0);
  const [timeSchedule2, setTimeSchedule2] = useState(
    new Date("1995-12-17T12:00:00")
  );

  const [activeSchedule3, setActiveSchedule3] = useState(0);
  const [timeSchedule3, setTimeSchedule3] = useState(
    new Date("1995-12-17T12:00:00")
  );

  const onChangeSchedule1 = async (event, selectedDate) => {
    setIsLoading(true);
    setIsToggled(false);
    if (Platform.OS === "android") {
      setShow(false);
    }

    const token = await getAccessToken();
    timeArray = formatDateObjectBackend(selectedDate).split(":");
    hour = timeArray[0];
    minute = timeArray[1];

    if (isToggled) {
      var systemNotificationsStatus = true;
      systemNotificationsStatus =
        await NotificationsHandler.checkNotificationsStatus(token);
      if (systemNotificationsStatus) {
        const expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          group + 1,
          title,
          body,
          [{ hour: Number(hour), minute: Number(minute), repeats: true }],
          isNotificationsEnabled,
          habitExpoIDs
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
          }
        );
      }
    }

    setHabitTime(selectedDate);
    setIsLoading(false);
  };

  return (
    <View style={[styles.itemContainer, styles.itemContainer2]}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.line}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Switch
          width={55}
          height={32}
          onValueChange={toggled}
          value={isToggled}
          trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
          thumbColor={isToggled ? "#d7f6ff" : "#ffd8f7"}
        />
      </View>
      <View style={styles.line}>
        {weekDays.map((val, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => {
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
        <Text style={[styles.smallText, { fontSize: 15 }]}>A what time ?</Text>
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
      <TouchableOpacity>
        <Image
          source={require("../../../assets/images/plus.png")}
          resizeMode="contain"
          style={styles.plusImage}
        />
      </TouchableOpacity>
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
    marginVertical: 8,
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
    fontFamily: "Sego",
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
});

export default Soultification;
