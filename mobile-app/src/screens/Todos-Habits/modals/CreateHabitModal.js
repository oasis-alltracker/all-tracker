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
} from "react-native";
import RNModal from "react-native-modal";
import ImagesModal from "./ImagesModal";
import { Image } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-toast-message";
import HabitsDB from "../../../api/DB/habitsDB";
import HabitSearchModal from "./HabitSearchModal";
import HabitNotificationsModal from "./HabitNotificationsModal";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

export default function CreateHabitModal({ getRef, createHabit }) {
  const theme = useContext(ThemeContext).value;
  const [isMainVisible, setIsMainVisible] = useState(false);

  const imagesRef = useRef(null);
  const habitSearchRef = useRef(null);
  const notificationsRef = useRef(null);

  const [image, setImage] = useState(null);

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
    setImage(null);
  };

  const onSave = async () => {
    Keyboard.dismiss();
    if (!habitName) {
      Toast.show({
        type: "info",
        text1: "Incomplete fields",
        text2: "Please give your habit a name.",
      });
    } else if (threshold <= 0) {
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
    } else if (image == null) {
      Toast.show({
        type: "info",
        text1: "Incomplete fields",
        text2: "Please select an image for your habit.",
      });
    } else if (habitName && threshold && image != null) {
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
          <View
            style={[styles.container, sharedStyles["modalBackground_" + theme]]}
          >
            <View style={styles.row}>
              <TouchableOpacity onPress={() => searchHabit()}>
                <Image
                  style={[styles.searchImage, sharedStyles["tint_" + theme]]}
                  source={require("../../../assets/images/search2.png")}
                />
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={ValueSheet.colours[theme].inputGrey}
                placeholder="Name"
                style={[
                  styles.title,
                  sharedStyles["textColour_" + theme],
                  { width: "75%" },
                ]}
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
                style={[
                  styles.selectImage,
                  sharedStyles["borderedContainer_" + theme],
                ]}
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
                  sharedStyles["borderedContainer_" + theme],
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
              <Button onPress={() => backDropPressed()} style={styles.button}>
                Cancel
              </Button>
              <Button
                onPress={() => onSave()}
                style={styles.button}
                positiveSelect={true}
              >
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
      <Toast position="top" topOffset={25} visibilityTime={2500} />
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
    fontSize: 30,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginBottom: 5,
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
    paddingBottom: 2.5,
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
});
