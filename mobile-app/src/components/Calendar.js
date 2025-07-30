import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  useWindowDimensions,
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
import { getAccessToken } from "../user/keychain";
import { ValueSheet } from "../ValueSheet";
import Toast from "react-native-toast-message";

const oneDay = {
  startingDay: true,
  endingDay: true,
  selectedColor: ValueSheet.colours.datePickerBlue,
  selectedTextColor: ValueSheet.colours.background,
  selectedColor: ValueSheet.colours.datePickerBlue,
  selectedTextColor: ValueSheet.colours.background,
  selected: true,
};
const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const DatePicker = ({ getRef, saveDateHandler }) => {
  const { width, height } = useWindowDimensions();
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

  const notificationsToggled = async (turnOn = false) => {
    if (isReminderEnabled && !turnOn) {
      setIsReminderEnabled(false);
    } else {
      if (
        (dateStamp && dateStamp != "noDueDate") ||
        !activeIndexes.every((index) => index === false)
      ) {
        var systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);
        if (systemNotificationsStatus && systemNotificationsEnabled) {
          setIsReminderEnabled(true);
        } else {
          Toast.show({
            type: "info",
            text1: "Reminders are disabled",
            text2:
              "Turn on notifications in your device settings to get reminders.",
          });
        }
      } else {
        Toast.show({
          type: "info",
          text1: "Reminders are unavailable without a selected date",
          text2: "Please make a date selection first.",
        });
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
    if (
      (Platform.OS === "ios" && event.type === "dismissed") ||
      (Platform.OS === "android" && event.type === "set")
    ) {
      notificationsToggled(true);
    }
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
    var days = [];
    for (i = 0; i < activeIndexes.length; i++) {
      if (activeIndexes[i]) {
        days.push(i);
      }
    }
    var isItRecurring = isRecurring;
    if (isItRecurring) {
      if (days.length == 0) {
        if (isEdit) {
          console.log(isItRecurring + " + " + days.length + " + " + isEdit);
          Toast.show({
            type: "info",
            text1: "You must select at least one day",
            text2: "Please make a date selection first.",
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

    saveDateHandler(isItRecurring, isReminderEnabled, timeArray, dueDate, days);
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
        if (props.schedule) {
          for (var scheduledDay of props.schedule) {
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
            fontFamily: ValueSheet.fonts.primaryBold,
            fontFamily: ValueSheet.fonts.primaryBold,
          },
          customStyles: {
            text: {
              fontFamily: ValueSheet.fonts.primaryBold,
              fontFamily: ValueSheet.fonts.primaryBold,
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
          selectedDayTextColor: ValueSheet.colours.primaryColour,
          selectedDayBackgroundColor: ValueSheet.colours.datePickerBlue,
          textMonthFontFamily: ValueSheet.fonts.primaryBold,
          textDayHeaderFontFamily: ValueSheet.fonts.primaryBold,
          todayBackgroundColor: ValueSheet.colours.yellow,
          todayTextColor: ValueSheet.colours.primaryColour,
          monthTextColor: ValueSheet.colours.primaryColour,
          textDayFontFamily: ValueSheet.fonts.primaryBold,
          dayTextColor: ValueSheet.colours.primaryColour,
          textDayStyle: {
            fontFamily: ValueSheet.fonts.primaryBold,
            fontFamily: ValueSheet.fonts.primaryBold,
          },
          arrowColor: ValueSheet.colours.primaryColour,
          arrowColor: ValueSheet.colours.primaryColour,
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
      backdropColor={ValueSheet.colours.secondaryColour27}
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
                    activeIndexes[index] && {
                      backgroundColor: ValueSheet.colours.secondaryColour,
                    },
                    activeIndexes[index] && {
                      backgroundColor: ValueSheet.colours.secondaryColour,
                    },
                  ]}
                >
                  <Text style={styles.dayText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={[styles.reminderContainer]}>
          <Switch
            width={55}
            height={32}
            onValueChange={notificationsToggled}
            value={isReminderEnabled}
            trackColor={{
              true: ValueSheet.colours.secondaryColour,
              false: ValueSheet.colours.purple,
            }}
            thumbColor={
              isReminderEnabled
                ? ValueSheet.colours.secondaryColour
                : ValueSheet.colours.purple
            }
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
                    is24Hour={false}
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
      <Toast position="top" />
    </Modal>
  );
};
export default DatePicker;

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: ValueSheet.colours.black10,
    borderColor: ValueSheet.colours.black10,
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
    backgroundColor: ValueSheet.colours.background,
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 5,
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
    backgroundColor: ValueSheet.colours.secondaryColour50,
    backgroundColor: ValueSheet.colours.secondaryColour50,
  },
  btnText: {
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.background,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.background,
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
    backgroundColor: ValueSheet.colours.primaryColour,
    backgroundColor: ValueSheet.colours.primaryColour,
    paddingVertical: 10,
    borderRadius: 5,
    width: "30%",
    alignItems: "center",
  },
  headerText: {
    color: ValueSheet.colours.primaryColour,
    color: ValueSheet.colours.primaryColour,
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryBold,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  clearText: {
    color: "red",
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryBold,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  text2: {
    color: ValueSheet.colours.datePickerBlue,
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryBold,
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
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.black,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.black,
    flex: 1,
    marginLeft: 15,
  },
  bottomItemValue: {
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.black50,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.black50,
  },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: ValueSheet.colours.grey,
    borderColor: ValueSheet.colours.grey,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 2,
    paddingBottom: 8,
  },
  timeSelectContainer: {
    alignItems: "center",
    borderWidth: 1,
    width: 114,
    borderColor: ValueSheet.colours.grey,
    borderColor: ValueSheet.colours.grey,
    paddingVertical: 10,
    borderRadius: 15,
    paddingRight: 5,
    backgroundColor: ValueSheet.colours.secondaryColour,
    backgroundColor: ValueSheet.colours.secondaryColour,
  },
  reminderTitle: {
    fontSize: 18,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginLeft: 15,
    flex: 1,
  },
  timeText: {
    fontSize: 17,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 8,
    width: "100%",
  },
  dayContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: ValueSheet.colours.grey,
    borderColor: ValueSheet.colours.grey,
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
    color: ValueSheet.colours.primaryColour,
    color: ValueSheet.colours.primaryColour,
    fontSize: 16,
    padding: 6,
    fontFamily: ValueSheet.fonts.primaryFont,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
});
