import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import ImagesModal from "./ImagesModal";
import HabitNotificationsModal from "./HabitNotificationsModal";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";

export default function UpdateHabitModal({
  getRef,
  closeModalHandler,
  updateHabit,
  deleteHabit,
}) {
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState(
    "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
  );
  const imagesRef = useRef(null);
  const notificationsRef = useRef(null);

  const [habitID, setHabitID] = useState("");

  const [tempHabitName, setTempHabitName] = useState("");
  const [tempIsPositiveIndex, setTempIsPositiveIndex] = useState("");
  const [tempThreshold, setTempThreshold] = useState("");

  const [scheduleCount, setScheduleCount] = useState(1);
  const [times, setTimes] = useState([[12, 0]]);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);

  useEffect(() => {
    const setNotificationData = async (itemID) => {
      try {
        token = await getAccessToken();
        var notifications = await NotificationsHandler.getNotifications(
          token,
          `habit-${itemID}`
        );

        if (notifications.length == 1) {
          if (notifications[0].preference == "on") {
            setIsNotificationsOn(true);
          } else {
            setIsNotificationsOn(false);
          }

          var newTimes = makeTimeArray(notifications[0].triggers.length);
          for (var i = 0; i < notifications[0].triggers.length; i++) {
            newTimes[i][0] = notifications[0].triggers[i].hour;
            newTimes[i][1] = notifications[0].triggers[i].minute;
          }

          setScheduleCount(notifications[0].triggers.length);
          setTimes([...newTimes]);
        } else {
          setIsNotificationsOn(false);
        }
      } catch (e) {
        console.log(e);
        if (Platform.OS === "ios") {
          Toast.show(
            "Something went wrong. Could not retrieve notifications.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
            }
          );
        } else {
          Toast.show(
            "Something went wrong. Could not retrieve notifications.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.TOP,
            }
          );
        }
      }
    };

    let ref = {
      open(edit, props) {
        if (props) {
          if (props.isPositive) {
            setTempIsPositiveIndex(0);
          } else {
            setTempIsPositiveIndex(1);
          }
          setIsNotificationsOn(true);
          setHabitName(props.habitName);
          setThreshold(props.threshold);
          setHabitID(props.habitID);
          setImage(props.pngURL);
          setNotificationData(props.habitID);
          setVisible(true);
        }
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  const formatDateObject = (dateObject) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return dateObject.toLocaleString("en-US", options);
  };

  const selectImage = async (imageUrl) => {
    setImage(imageUrl);
  };

  const makeTimeArray = (length) => {
    var arr = [];
    for (let i = 0; i < length; i++) {
      arr[i] = [];
      for (let j = 0; j < 2; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  };

  const reopenMainFromNotifications = (
    newScheduleCount = 0,
    newTimes,
    newIsNotificationsOn
  ) => {
    if (newScheduleCount != 0) {
      setScheduleCount(newScheduleCount);

      var newNewTimes = makeTimeArray(newScheduleCount);

      for (var i = 0; i < newScheduleCount; i++) {
        var time = newTimes[i].toString().split(",");

        newNewTimes[i][0] = parseInt(time[0]);
        newNewTimes[i][1] = parseInt(time[1]);
      }
      setTimes([...newNewTimes]);
      setIsNotificationsOn(newIsNotificationsOn);
    }
  };

  const backDropPressed = (doAsyncWork = false) => {
    setTempHabitName(false);
    setTempIsPositiveIndex(false);
    setTempThreshold(false);
    setTimes([[12, 0]]);
    setScheduleCount(1);

    setVisible(false);
    setImage("https://oasis-images.s3.ca-central-1.amazonaws.com/white.png");

    closeModalHandler(doAsyncWork);
  };

  const [habitName, setHabitName] = useState("");
  const [isPositiveIndex, setIsPositiveIndex] = useState("");
  const [threshold, setThreshold] = useState("");

  const onSave = async () => {
    Keyboard.dismiss();
    if (threshold <= 0) {
      if (Platform.OS === "ios") {
        Toast.show("Don't forget to set a goal for this habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Don't forget to set a goal for this habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    } else if (threshold > 99) {
      if (Platform.OS === "ios") {
        Toast.show("Your goal must be less than 100.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Your goal must be less than 100.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    } else if (
      habitName &&
      isPositiveIndex !== "" &&
      threshold &&
      image != "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
    ) {
      habit = {
        name: habitName,
        threshold: threshold,
        pngURL: image,
      };

      habit.isPositive = true;
      backDropPressed(true);
      updateHabit(habitID, habit, times, isNotificationsOn);
    } else {
      if (Platform.OS === "ios") {
        Toast.show("You must complete the form to update a habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("You must complete the form to update a habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const onDelete = () => {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          isPreferred: true,
          onPress: () => {
            backDropPressed(true);
            deleteHabit(habitID);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const searchImage = () => {
    setTempHabitName(habitName);
    setTempIsPositiveIndex(isPositiveIndex);
    setTempThreshold(threshold);

    imagesRef.current.open();
  };

  const viewNotificationsSchedule = () => {
    setTempHabitName(habitName);
    setTempIsPositiveIndex(isPositiveIndex);
    setTempThreshold(threshold);

    notificationsRef.current.open({
      times: times,
      scheduleCount: scheduleCount,
      isNotificationsOn: isNotificationsOn,
    });
  };

  useEffect(() => {
    if (tempHabitName && habitName === "") {
      setHabitName(tempHabitName);
    }
    if (
      (tempIsPositiveIndex === 0 || tempIsPositiveIndex === 1) &&
      isPositiveIndex === ""
    ) {
      setIsPositiveIndex(tempIsPositiveIndex);
    }
    if (tempThreshold && threshold === "") {
      setThreshold(tempThreshold);
    }
  }, []);

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => backDropPressed()}
      onBackdropPress={() => backDropPressed()}
      backdropOpacity={0}
      style={styles.modal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.row}>
              <TextInput
                placeholderTextColor={"#7B97BC"}
                placeholder="Name"
                style={styles.title}
                onChangeText={setHabitName}
                value={habitName}
                blurOnSubmit={false}
              />
              <TouchableOpacity onPress={() => viewNotificationsSchedule()}>
                <Image
                  style={styles.reminderBell}
                  source={require("../../../assets/images/reminder.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Image:</Text>
              <TouchableOpacity
                style={styles.selectImage}
                onPress={() => searchImage()}
              >
                <Image style={styles.image} source={{ uri: image }} />
              </TouchableOpacity>
            </View>

            <View style={[styles.row, { marginBottom: 10 }]}>
              <Text style={styles.key}>Times a day:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setThreshold}
                keyboardType="number-pad"
                value={threshold}
                onSubmitEditing={Keyboard.dismiss}
                maxLength={2}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.row2}>
              <Button
                onPress={() => onDelete()}
                style={[styles.button, styles.back]}
              >
                Delete
              </Button>
              <Button onPress={() => onSave()} style={styles.button}>
                Save
              </Button>
            </View>

            <ImagesModal
              selectImage={selectImage}
              backDropPressed={backDropPressed}
              getRef={(ref) => (imagesRef.current = ref)}
            />
            <HabitNotificationsModal
              reopenMain={reopenMainFromNotifications}
              getRef={(ref) => (notificationsRef.current = ref)}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  searchImage: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
    padding: 40,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 25,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  title: {
    color: "#25436B",
    fontSize: 32,
    fontFamily: "Sego-Bold",
    width: 240,
  },
  key: {
    color: "#25436B",
    fontSize: 23,
    fontFamily: "Sego",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(172, 197, 204, 0.75)",
    borderRadius: 20,
    width: 120,
    height: 40,
    paddingHorizontal: 20,
    color: "#25436B",
    textAlign: "center",
    fontFamily: "Sego",
    fontSize: 18,
  },
  button: {
    width: "47%",
  },
  timeButton: {
    borderWidth: 1.5,
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 40,
    borderRadius: 20,
    width: 130,
    marginLeft: 12,
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  image: {
    width: 70,
    height: 70,
  },
  selectImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  reminderBell: {
    width: 35,
    height: 35,
    paddingBottom: 2,
  },
  imageOption: {
    width: 50,
    height: 50,
  },
  imageSelector: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  habitSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 15,
    marginBottom: 5,
  },
  habitOption: {
    width: 80,
    height: 80,
  },
  habitSelector: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0)",
    backgroundColor: "rgba(215, 246, 255, 0.65)",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewView: {
    paddingTop: 30,
    paddingBottom: 60,
  },
  timeValueButton: {
    flex: 1,
    alignSelf: "flex-end",
  },
  timeValue: {
    flex: 1,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "#25436B",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
    width: 150,
  },
  timeValueButton: {
    flex: 1,
    alignSelf: "flex-end",
  },
  timeValue: {
    flex: 1,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "rgba(172, 197, 204, 0.75)",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  timeContainer: {
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },

  itemContainer3: {
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    width: 59,
    alignItems: "center",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginLeft: 15,
    flex: 1,
  },
  bottomItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 15,
    width: 140,
  },
  smallText: {
    color: "#25436B",
    fontSize: 12,
    fontFamily: "Sego",
    paddingHorizontal: 5,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
  text: {
    fontFamily: "Sego",
    fontSize: 18,
    color: "#25436B",
    marginTop: 2,
    textAlign: "center",
  },
  timeText: {
    fontFamily: "Sego",
    fontSize: 18,
    color: "#25436B",
    textAlign: "center",
    alignItems: "center",
    marginTop: 5,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
});
