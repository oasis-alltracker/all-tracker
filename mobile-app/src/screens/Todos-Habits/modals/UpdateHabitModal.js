import React, { useEffect, useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
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
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

export default function UpdateHabitModal({ getRef, updateHabit, deleteHabit }) {
  const theme = useContext(ThemeContext).value;
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState(null);
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
    } else if (habitName && threshold && image != null) {
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
          <View
            style={[styles.container, sharedStyles["modalBackground_" + theme]]}
          >
            <View style={styles.row}>
              <TextInput
                placeholderTextColor={ValueSheet.colours[theme].inputGrey}
                placeholder="Name"
                style={[styles.title, sharedStyles["textColour_" + theme]]}
                onChangeText={setHabitName}
                value={habitName}
                blurOnSubmit={false}
              />
              <TouchableOpacity onPress={() => viewNotificationsSchedule()}>
                <Image
                  style={[styles.reminderBell, sharedStyles["tint_" + theme]]}
                  source={require("../../../assets/images/reminder.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={[styles.key, sharedStyles["textColour_" + theme]]}>
                Image:
              </Text>
              <TouchableOpacity
                style={[styles.selectImage, sharedStyles["border_" + theme]]}
                onPress={() => searchImage()}
              >
                {image != null ? (
                  <Image style={[styles.image]} source={{ uri: image }} />
                ) : null}
              </TouchableOpacity>
            </View>

            <View style={[styles.row, { marginBottom: 10 }]}>
              <Text style={[styles.key, sharedStyles["textColour_" + theme]]}>
                Times a day:
              </Text>
              <TextInput
                style={[
                  styles.input,
                  sharedStyles["textColour_" + theme],
                  sharedStyles["border_" + theme],
                ]}
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
                style={styles.button}
                isNegative={true}
              >
                Delete
              </Button>
              <Button
                onPress={() => onSave()}
                style={styles.button}
                isNegative={false}
              >
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
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
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
    fontSize: 32,
    fontFamily: ValueSheet.fonts.primaryBold,
    width: 240,
  },
  key: {
    fontSize: 23,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 20,
    width: 120,
    height: 40,
    paddingHorizontal: 20,
    textAlign: "center",
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
  },
  button: {
    width: "47%",
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
  },
  reminderBell: {
    width: 35,
    height: 35,
    paddingBottom: 2,
  },
});
