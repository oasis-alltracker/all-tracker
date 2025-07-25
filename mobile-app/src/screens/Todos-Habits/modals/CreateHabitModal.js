import React, { useEffect, useState, useRef } from "react";
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
} from "react-native";
import RNModal from "react-native-modal";
import ImagesModal from "./ImagesModal";
import { Image } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import HabitsDB from "../../../api/DB/habitsDB";
import HabitSearchModal from "./HabitSearchModal";
import HabitNotificationsModal from "./HabitNotificationsModal";
import { ValueSheet } from "../../../ValueSheet";

export default function CreateHabitModal({ getRef, createHabit }) {
  const [isMainVisible, setIsMainVisible] = useState(false);

  const imagesRef = useRef(null);
  const habitSearchRef = useRef(null);
  const notificationsRef = useRef(null);

  const [image, setImage] = useState(
    "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
  );

  const [habitName, setHabitName] = useState("");
  const [threshold, setThreshold] = useState("");

  const [scheduleCount, setScheduleCount] = useState(1);
  const [times, setTimes] = useState([[12, 0]]);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);

  useEffect(() => {
    let ref = {
      open() {
        setIsMainVisible(true);
      },
      close() {
        setIsMainVisible(false);
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

    setTimeout(() => {
      setIsMainVisible(true);
    }, 1051);
  };

  const selectHabit = async (habitName) => {
    presetHabits = HabitsDB.viewHabits();
    presetHabit = presetHabits.find((habit) => habit.name === habitName);
    setHabitName(presetHabit.name);
    setImage(presetHabit.pngUrl);
  };

  const backDropPressed = () => {
    setHabitName("");
    setThreshold("");
    setTimes([[12, 0]]);
    setScheduleCount(1);

    setIsMainVisible(false);
    setIsNotificationsOn(false);
    setImage("https://oasis-images.s3.ca-central-1.amazonaws.com/white.png");
  };

  const onSave = async () => {
    Keyboard.dismiss();
    if (!habitName) {
      if (Platform.OS === "ios") {
        Toast.show("Don't forget to give this habit a name.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Don't forget to give this habit a name.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    } else if (threshold <= 0) {
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
      image == "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
    ) {
      if (Platform.OS === "ios") {
        Toast.show("Don't forget to select an image.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Don't forget to select an image.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
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

      var setNotifications = isNotificationsOn;
      backDropPressed(true);
      createHabit(habit, times, setNotifications);
    }
  };

  const searchImage = () => {
    imagesRef.current.open();
  };

  const searchHabit = () => {
    habitSearchRef.current.open();
  };

  const viewNotificationsSchedule = () => {
    notificationsRef.current.open({
      times: times,
      scheduleCount: scheduleCount,
      isNotificationsOn: isNotificationsOn,
    });
  };

  return (
    <RNModal
      isVisible={isMainVisible}
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
              <TouchableOpacity onPress={() => searchHabit()}>
                <Image
                  style={styles.searchImage}
                  source={require("../../../assets/images/search2.png")}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={"#7B97BC"}
                placeholder="Name"
                style={[styles.title, { width: "75%" }]}
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
                onPress={() => backDropPressed()}
                style={[styles.button, styles.back]}
              >
                Cancel
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
            <HabitSearchModal
              selectHabit={selectHabit}
              backDropPressed={backDropPressed}
              getRef={(ref) => (habitSearchRef.current = ref)}
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
  container: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: ValueSheet.colours.black50,
  },
  searchImage: {
    width: 30,
    height: 30,
    marginBottom: 6,
  },
  reminderBell: {
    width: 35,
    height: 35,
    marginBottom: 6,
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
    fontSize: 30,
    fontFamily: ValueSheet.fonts.primaryBold,
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
  timeValueButton: {
    flex: 1,
    alignSelf: "flex-end",
  },
  timeValue: {
    flex: 1,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: ValueSheet.colours.primaryColour,
    paddingHorizontal: 10,
    marginRight: 10,
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
    borderColor: ValueSheet.colours.borderGrey75,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
});
