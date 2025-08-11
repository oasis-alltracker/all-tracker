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
import Toast from "react-native-toast-message";
import { getAccessToken } from "../../../user/keychain";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { ValueSheet } from "../../../ValueSheet";

export default function UpdateHabitModal({ getRef, updateHabit, deleteHabit }) {
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState(
    "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
  );
  const imagesRef = useRef(null);
  const notificationsRef = useRef(null);

  const [habitID, setHabitID] = useState("");

  const [habitName, setHabitName] = useState("");
  const [threshold, setThreshold] = useState("");

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
        Toast.show({
          type: "info",
          text1: "Could not retrieve notifications",
          text2: "Please try again later",
        });
      }
    };

    let ref = {
      open(edit, props) {
        if (props) {
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
    setVisible(false);
  };

  const onSave = async () => {
    Keyboard.dismiss();
    if (threshold <= 0) {
      Toast.show({
        type: "info",
        text1: "Please specify a goal",
        text2: "How many times a day do you want to do this habit?",
      });
    } else if (threshold > 99) {
      Toast.show({
        type: "info",
        text1: "Please specify a smaller goal",
        text2: "Your goal must be be less than 100.",
      });
    } else if (
      habitName &&
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
      Toast.show({
        type: "info",
        text1: "Incomplete fields",
        text2: "Please complete the form to update the habit.",
      });
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
    Keyboard.dismiss();
    imagesRef.current.open();
  };

  const viewNotificationsSchedule = () => {
    Keyboard.dismiss();
    notificationsRef.current.open({
      times: times,
      scheduleCount: scheduleCount,
      isNotificationsOn: isNotificationsOn,
    });
  };

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
                placeholderTextColor={ValueSheet.colours.inputGrey}
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
    borderWidth: 1,
    borderBlockColor: ValueSheet.colours.black50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  title: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 32,
    fontFamily: ValueSheet.fonts.primaryBold,
    width: 240,
  },
  key: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 23,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  input: {
    borderWidth: 1.5,
    borderColor: ValueSheet.colours.borderGrey75,
    borderRadius: 20,
    width: 120,
    height: 40,
    paddingHorizontal: 20,
    color: ValueSheet.colours.primaryColour,
    textAlign: "center",
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
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
    borderColor: ValueSheet.colours.borderGrey75,
  },
  reminderBell: {
    width: 35,
    height: 35,
    paddingBottom: 2,
  },
});
