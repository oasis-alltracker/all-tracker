import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Dimensions, Text, View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { LocaleConfig, Calendar } from "react-native-calendars";
import time from "../helpers/time";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const startObj = {
  startingDay: true,
  color: "#18A0FB",
  textColor: "white",
  fontFamily: "Sego-Bold",
};

const endObj = {
  endingDay: true,
  color: "#18A0FB",
  textColor: "white",
  fontFamily: "Sego-Bold",
};

const oneDay = {
  startingDay: true,
  endingDay: true,
  selectedColor: "#18A0FB",
  selectedTextColor: "white",
  selected: true,
};

const getAllDatesBetween = (fromDate, toDate) => {
  const datesForCalendar = {};
  for (let i = fromDate + 86.4; i <= toDate - 86.4; i += 86.4) {
    datesForCalendar[time.to(i * 1000000, "YYYY-MM-DD")] = {
      color: "rgba(215, 246, 255, 0.5)",
      textColor: "#1B2124",
      fontFamily: "Sego-Bold",
    };
  }

  return datesForCalendar;
};

// onConfirm(start.timestamp, end.timestamp);

const DatePicker = ({ getRef, onConfirm }) => {
  const [visible, setVisible] = useState(false);
  const [isDate, setIsDate] = useState(true);

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [markedDays, setMarkedDays] = useState({});

  const dayPress = (day) => {
    if (!isDate) {
      if (start) {
        if (start.timestamp === day.timestamp) {
          setStart(null);
          setEnd(null);
          setMarkedDays({});
        } else {
          if (day.timestamp === end?.timestamp) {
            setEnd(null);
            setMarkedDays({
              [start.dateString]: startObj,
            });
          } else {
            if (day.timestamp > start.timestamp) {
              setEnd(day);
              setMarkedDays({
                [day.dateString]: endObj,
                [start.dateString]: startObj,
                ...getAllDatesBetween(
                  start.timestamp / 1000000,
                  day.timestamp / 1000000
                ),
              });
            } else {
              setEnd(start);
              setStart(day);
              setMarkedDays({
                [day.dateString]: startObj,
                [start.dateString]: endObj,
                ...getAllDatesBetween(
                  day.timestamp / 1000000,
                  start.timestamp / 1000000
                ),
              });
            }
          }
        }
      } else {
        setStart(day);
        setMarkedDays({
          [day.dateString]: startObj,
        });
      }
    } else {
      setStart(day);
      setMarkedDays({
        [day.dateString]: oneDay,
      });
    }
  };

  const setLanguageToCalendar = useCallback(() => {
    const shortNames = ["M", "T", "W", "T", "F", "S", "S"];

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
      dayNames: ["M", "T", "W", "T", "F", "S", "S"],
      dayNamesShort: shortNames,
    };

    LocaleConfig.defaultLocale = "key";
  }, []);

  useEffect(() => {
    let ref = {
      open: () => setVisible(true),
      close: () => setVisible(false),
    };
    setLanguageToCalendar();
    getRef(ref);
  }, []);

  const renderCalendar = useMemo(
    () => (
      <Calendar
        markingType={isDate ? "custom" : "period"}
        markedDates={markedDays}
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
          paddingHorizontal: 15,
          paddingBottom: 0,
          // height: 0,
        }}
        scrollEnabled={false}
        hideArrows={false}
        calendarWidth={width - 45}
        calendarHeight={290}
        horizontal={true}
        onDayPress={dayPress}
        pagingEnabled={true}
      />
    ),
    [markedDays, isDate]
  );

  return (
    <Modal
      deviceHeight={height}
      statusBarTranslucent
      style={styles.modal}
      onModalHide={() => {
        setStart(null);
        setEnd(null);
        setMarkedDays({});
      }}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      isVisible={visible}
    >
      <View style={styles.container}>
        <View style={styles.topLine}>
          <TouchableOpacity
            onPress={() => {
              setStart(null);
              setEnd(null);
              setMarkedDays({});
            }}
            style={styles.btn}
          >
            <Text style={[styles.text, { color: "red" }]}>Clear</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                setIsDate(true);
                setStart(null);
                setEnd(null);
                setMarkedDays({});
              }}
              style={[styles.btn, isDate && styles.btnActive]}
            >
              <Text style={styles.text}>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsDate(false);
                setStart(null);
                setEnd(null);
                setMarkedDays({});
              }}
              style={[styles.btn, !isDate && styles.btnActive]}
            >
              <Text style={styles.text}>Duration</Text>
            </TouchableOpacity>
          </View>
        </View>
        {renderCalendar}
        {[1, 2, 3].map((val, key) => {
          return (
            <TouchableOpacity key={key.toString()} style={styles.bottomItem}>
              <Image
                source={require("../assets/images/reminder.png")}
                style={styles.iconImage}
              />
              <Text style={styles.bottomItemText}>Time</Text>
              <View style={styles.leftLine}>
                <Text style={styles.bottomItemValue}>None</Text>
                <Image
                  style={styles.arrow}
                  source={require("../assets/images/back-arrow.png")}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={styles.line}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.button}
          >
            <Text style={styles.text2}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.button}
          >
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
  clearText: {
    color: "red",
  },
  text: {
    color: "#303C5E",
    fontSize: 18,
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
    paddingVertical: 10,
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
});
