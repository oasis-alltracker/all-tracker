import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { LocaleConfig, Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import NotificationsHandler from "../api/notifications/notificationsHandler";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../user/keychain";

const { width, height } = Dimensions.get("window");
const oneDay = {
  startingDay: true,
  endingDay: true,
  selectedColor: "#18A0FB",
  selectedTextColor: "white",
  selected: true,
};
const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const DatePicker = ({ getRef, saveDateHandler }) => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [markedDay, setMarkedDay] = useState(null);
  const [dateStamp, setDateStamp] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [reminderTime, setReminderTime] = useState(
    new Date("1995-12-17T12:00:00")
  );
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [systemNotificationsEnabled, setSystemNotificationsEnabled] =
    useState(false);

  const [timeArray, setTimeArray] = useState(null);

  useEffect(() => {
    const getSystemNotificationPreference = async () => {
      token = await getAccessToken();
      allNotificationsIsOn =
        await NotificationsHandler.getAllNotificationsState(token);
      taskNotificationsIsOn =
        await NotificationsHandler.getGroupPreferenceNotificationsState(
          token,
          "taskPreference"
        );
      setSystemNotificationsEnabled(
        allNotificationsIsOn == "on" && taskNotificationsIsOn == "on"
      );
    };

    getSystemNotificationPreference();
  }, []);

  const dayPress = (day) => {
    setDateStamp(day.dateString.replace("-", "").replace("-", ""));
    setMarkedDay({ [day.dateString]: oneDay });
  };

  const notificationsToggled = async () => {
    if (isReminderEnabled) {
      setIsReminderEnabled((previousState) => !previousState);
    } else {
      if (
        (dateStamp && dateStamp != "noDueDate") ||
        !activeIndexes.every((index) => index === false)
      ) {
        var systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);
        if (systemNotificationsStatus && systemNotificationsEnabled) {
          setIsReminderEnabled((previousState) => !previousState);
        } else {
          Toast.show(
            "To get reminders, you need to turn on notifications in your settings.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            }
          );
        }
      } else {
        Toast.show(
          "To get reminders, you need to make a date selection first",
          {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          }
        );
      }
    }
  };

  const onChange = async (event, selectedDate) => {
    setReminderTime(selectedDate);
    if (Platform.OS === "android") {
      setShow(false);
    }

    newTimeArray = formatDateObjectBackend(selectedDate).split(":");
    newTimeArray[0] = Number(newTimeArray[0]);
    newTimeArray[1] = Number(newTimeArray[1]);
    setTimeArray(newTimeArray);
  };

  const formatDateObjectBackend = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return dateObject.toLocaleString("en-US", options);
  };

  const setLanguageToCalendar = useCallback(() => {
    const shortNames = ["S", "M", "T", "W", "T", "F", "S"];

    LocaleConfig.locales["key"] = {
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthNamesShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      dayNames: ["S", "M", "T", "W", "T", "F", "S"],
      dayNamesShort: shortNames,
    };

    LocaleConfig.defaultLocale = "key";
  }, []);

  const formatDateObject = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return dateObject.toLocaleString("en-US", options);
  };

  const onSave = async () => {
    setVisible(false);
    var schedule = {
      days: [],
      trigger: {
        hour: timeArray[0],
        minute: timeArray[1],
      },
    };
    for (i = 0; i < activeIndexes.length; i++) {
      if (activeIndexes[i]) {
        schedule.days.push(i);
      }
    }
    var isItRecurring = isRecurring;
    if (isItRecurring) {
      if (schedule.days.length == 0) {
        if (isEdit) {
          Toast.show("You must select at least one day.", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          });
          return;
        } else {
          setIsRecurring(false);
          isItRecurring = false;
        }
      }
    }

    var dueDate = "noDueDate";
    if (dateStamp != null) {
      dueDate = dateStamp;
    }

    saveDateHandler(
      isItRecurring,
      isReminderEnabled,
      timeArray,
      dueDate,
      schedule
    );
  };

  useEffect(() => {
    let ref = {
      open: (isEdit = false, props) => {
        setVisible(true);

        setIsRecurring(props.isRecurring);
        setDateStamp(props.dateStamp);
        if (
          !props.isRecurring &&
          props.dateStamp &&
          props.dateStamp != "noDueDate"
        ) {
          setMarkedDay({
            [`${props.dateStamp.substring(0, 4)}-${props.dateStamp.substring(
              4,
              6
            )}-${props.dateStamp.substring(6, 8)}`]: oneDay,
          });
        }
        var indexes = [false, false, false, false, false, false, false];
        if (props.schedule?.days) {
          for (var scheduledDay of props.schedule.days) {
            indexes[scheduledDay] = true;
          }
        }
        setActiveIndexes(indexes);

        setTimeArray([props.time[0], props.time[1]]);

        var hour = props.time[0].toString();
        if (hour.length == 1) {
          hour = "0" + hour;
        }
        var minute = props.time[1].toString();
        if (minute.length == 1) {
          minute = "0" + minute;
        }

        reminderTimeFromNotification = new Date(
          `1995-12-17T${hour}:${minute}:00`
        );
        setReminderTime(reminderTimeFromNotification);
        setIsReminderEnabled(props.notifications);

        if (isEdit) {
          setIsEdit(true);
        } else {
          setIsEdit(false);
        }
      },
      close: () => setVisible(false),
    };
    setLanguageToCalendar();
    getRef(ref);
  }, []);

  const renderCalendar = useMemo(() => (
    <View style={{ height: 330 }}>
      <Calendar
        markedDates={markedDay}
        marking={{
          customTextStyle: {
            fontFamily: "Sego-Bold",
          },
          customStyles: {
            text: {
              fontFamily: "Sego-Bold",
            },
          },
        }}
        hideExtraDays={false}
        disableMonthChange={false}
        calendarStyle={{
          width: width - 45.5,
          height: 120,
        }}
        theme={{
          calendarBackground: "transparent",
          weekVerticalMargin: 0,
          selectedDayTextColor: "#303C5E",
          selectedDayBackgroundColor: "#18A0FB",
          textMonthFontFamily: "Sego-Bold",
          textDayHeaderFontFamily: "Sego-Bold",
          todayBackgroundColor: "#fe9289",
          todayTextColor: "#303C5E",
          monthTextColor: "#303C5E",
          textDayFontFamily: "Sego-Bold",
          dayTextColor: "#303C5E",
          textDayStyle: {
            fontFamily: "Sego-Bold",
          },
          arrowColor: "#303C5E",
          "stylesheet.calendar.main": {
            calendar: {
              paddingLeft: 0,
              paddingRight: 0,
              backgroundColor: "transparent",
              borderRadius: 5,
            },
            dayContainer: {
              marginVertical: 4,
            },
            placeholderText: {
              color: "transparent",
            },
          },
        }}
        style={{
          borderRadius: 5,
          paddingTop: 5,
          paddingBottom: 0,
        }}
        scrollEnabled={false}
        hideArrows={false}
        calendarWidth={width - 45}
        calendarHeight={290}
        horizontal={true}
        onDayPress={dayPress}
        pagingEnabled={true}
      />
    </View>
  ));

  return (
    <Modal
      deviceHeight={height}
      statusBarTranslucent
      style={styles.modal}
      onModalHide={() => {
        setDateStamp(null);
      }}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      isVisible={visible}
      backdropColor="rgba(215, 246, 255, 0.27)"
    >
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.container}>
        {!isEdit ? (
          <View style={styles.topLine}>
            <TouchableOpacity
              onPress={() => {
                setIsRecurring(false);
                setActiveIndexes([
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ]);
                setIsReminderEnabled(false);
              }}
              style={[styles.btn, !isRecurring && styles.btnActive]}
            >
              <Text style={styles.headerText}>To-do</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDateStamp(null);
                setMarkedDay(null);
                setIsRecurring(true);
                setIsReminderEnabled(false);
              }}
              style={[styles.btn, isRecurring && styles.btnActive]}
            >
              <Text style={styles.headerText}>Recurring</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        {!isRecurring ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setDateStamp(null);
                setMarkedDay(null);
                setIsReminderEnabled(false);
              }}
              style={styles.btn}
            >
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
            {renderCalendar}
          </>
        ) : (
          <>
            <View style={styles.daysContainer}>
              {daysOfWeek.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      var newIndexes = [...activeIndexes];
                      if (activeIndexes[index]) {
                        newIndexes[index] = false;
                      } else {
                        newIndexes[index] = true;
                      }
                      if (newIndexes.every((index) => index === false)) {
                        setIsReminderEnabled(false);
                      }
                      setActiveIndexes(newIndexes);
                    }}
                    key={index.toString()}
                    style={[
                      styles.dayContainer,
                      activeIndexes[index] && { backgroundColor: "#D7F6FF" },
                    ]}
                  >
                    <Text style={styles.dayText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        <View style={[styles.reminderContainer]}>
          <Switch
            width={55}
            height={32}
            onValueChange={notificationsToggled}
            value={isReminderEnabled}
            trackColor={{ true: "#d7f6ff", false: "#ffd8f7" }}
            thumbColor={isReminderEnabled ? "#d7f6ff" : "#ffd8f7"}
          />
          <Text style={styles.reminderTitle}>Reminder</Text>
          <View style={styles.timeSelectContainer}>
            <>
              {Platform.OS === "ios" ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={reminderTime}
                  mode={"time"}
                  is24Hour={true}
                  onChange={onChange}
                />
              ) : (
                <TouchableOpacity
                  testID="setMinMax"
                  value="time"
                  onPress={() => {
                    setShow(true);
                  }}
                  title="toggleMinMaxDate"
                >
                  <Text style={styles.timeText}>
                    {formatDateObject(reminderTime)}
                  </Text>
                </TouchableOpacity>
              )}
            </>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={reminderTime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </>
            </View>
          </View>
        </View>

        <View style={styles.line}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.button}
          >
            <Text style={styles.text2}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSave()} style={styles.button}>
            <Text style={styles.text2}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default DatePicker;

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  button: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 10,
  },
  modal: {
    margin: 0,
    padding: 15,
  },
  container: {
    justifyContent: "space-between",
    // backgroundColor: "#17213E",
    backgroundColor: "#fff",
    borderRadius: 5,

    // padding: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    marginLeft: 10,
  },
  btnActive: {
    backgroundColor: "rgba(215, 246, 255, 0.5)",
  },
  btnText: {
    fontFamily: "Sego-Bold",
    color: "#fff",
    fontSize: 16,
  },
  buttonLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  topLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  btn2: {
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#303C5E",
    paddingVertical: 10,
    borderRadius: 5,
    width: "30%",
    alignItems: "center",
  },
  headerText: {
    color: "#303C5E",
    fontSize: 22,
    fontFamily: "Sego-Bold",
  },
  clearText: {
    color: "red",
    fontSize: 16,
    fontFamily: "Sego-Bold",
  },
  text2: {
    color: "#18A0FB",
    fontSize: 18,
    fontFamily: "Sego-Bold",
  },
  iconImage: {
    width: 35,
    height: 30,
    resizeMode: "contain",
  },
  bottomItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    paddingVertical: 24,
  },
  arrow: {
    width: 12,
    height: 12,
    resizeMode: "contain",
    transform: [
      {
        rotate: "180deg",
      },
    ],
    marginLeft: 8,
  },
  leftLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomItemText: {
    fontSize: 16,
    fontFamily: "Sego-Bold",
    color: "rgba(0,0,0,0.8)",
    flex: 1,
    marginLeft: 15,
  },
  bottomItemValue: {
    fontSize: 16,
    fontFamily: "Sego",
    color: "rgba(0,0,0,0.5)",
  },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  timeSelectContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginBottom: 0,
    backgroundColor: "#D7F6FF",
  },
  reminderTitle: {
    fontSize: 18,
    color: "#25436B",
    fontFamily: "Sego",
    marginLeft: 15,
    flex: 1,
  },
  timeText: {
    fontSize: 17,
    color: "#25436B",
    fontFamily: "Sego",
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginBottom: 0,
  },
  dayText: {
    color: "#25436B",
    fontSize: 16,
    padding: 6,
    fontFamily: "Sego",
  },
});
