import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RNModal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import ImagesModal from "./ImagesModal";
import { Image } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";

import HabitsDB from "../../../api/DB/habitsDB";

import { SafeAreaView } from "react-native-safe-area-context";
import HabitSearchModal from "./HabitSearchModal";

export default function CreateHabitModal({ getRef, createHabit }) {
  const { width, height } = useWindowDimensions();

  const [isMainVisible, setIsMainVisible] = useState(false);

  const imagesRef = useRef(null);
  const habitSearchRef = useRef(null);

  const [image, setImage] = useState(
    "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
  );

  const [tempHabitName, setTempHabitName] = useState(false);
  const [tempIsPositiveIndex, setTempIsPositiveIndex] = useState(false);
  const [tempThreshold, setTempThreshold] = useState(false);
  const [tempTime, setTempTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const reopenMain = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTimeout(() => {
      setIsMainVisible(true);
    }, 1015);
  };

  const selectHabit = async (habitName) => {
    presetHabits = HabitsDB.viewHabits();
    presetHabit = presetHabits.find((habit) => habit.name === habitName);
    setTempHabitName(presetHabit.name);
    setTempIsPositiveIndex(presetHabit.isPositive ? 0 : 1);
    setImage(presetHabit.pngUrl);
  };

  const backDropPressed = () => {
    setTempHabitName(false);
    setTempIsPositiveIndex(false);
    setTempThreshold(false);
    setTempTime(false);

    setIsMainVisible(false);
    setImage("https://oasis-images.s3.ca-central-1.amazonaws.com/white.png");
  };

  const MainModal = () => {
    const [habitName, setHabitName] = useState("");
    const [isPositiveIndex, setIsPositiveIndex] = useState("");
    const [threshold, setThreshold] = useState("");
    const [time, setTime] = useState(new Date("1995-12-17T12:00:00"));
    const [show, setShow] = useState(false);

    const [timeIsSet, setTimeIsSet] = useState(false);

    const items = ["Good", "Bad"];

    const onSave = async () => {
      setIsLoading(true);
      if (!habitName) {
        Toast.show("Don't forget to give this habit a name.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      } else if (threshold <= 0) {
        Toast.show("'Times a day' needs to be greater than 0.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      } else if (time == new Date("1995-12-17T12:00:00")) {
        Toast.show("Don't forget to set a time.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
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
          time: time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }),
        };

        habit.isPositive = true;

        backDropPressed();
        await createHabit(habit);
        setIsLoading(false);
      } else {
        Toast.show("You must complete the form to create a habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    };

    const searchImage = () => {
      setTempHabitName(habitName);
      setTempIsPositiveIndex(isPositiveIndex);
      setTempThreshold(threshold);
      setTempTime(time);

      setIsLoading(true);
      setIsMainVisible(false);
      imagesRef.current.open();
    };

    const searchHabit = () => {
      setTempHabitName(habitName);
      setTempIsPositiveIndex(isPositiveIndex);
      setTempThreshold(threshold);
      setTempTime(time);

      setIsLoading(true);
      setIsMainVisible(false);
      habitSearchRef.current.open();
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
      if (tempTime && !timeIsSet) {
        setTime(tempTime);
      }
    }, []);

    return (
      <RNModal
        isVisible={isMainVisible}
        onBackButtonPress={() => backDropPressed()}
        onBackdropPress={() => backDropPressed()}
        backdropColor="rgba(215, 246, 255, 0.27)"
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

                <TouchableOpacity onPress={() => searchHabit()}>
                  <Image
                    style={styles.searchImage}
                    source={require("../../../assets/images/search2.png")}
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
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </RNModal>
    );
  };

  return (
    <>
      <Spinner
        visible={isLoading}
        backdropColor="rgba(215, 246, 255, 0.27)"
      ></Spinner>
      <ImagesModal
        selectImage={selectImage}
        backDropPressed={backDropPressed}
        reopenMain={reopenMain}
        setIsLoading={setIsLoading}
        getRef={(ref) => (imagesRef.current = ref)}
      />
      <HabitSearchModal
        selectHabit={selectHabit}
        backDropPressed={backDropPressed}
        reopenMain={reopenMain}
        setIsLoading={setIsLoading}
        getRef={(ref) => (habitSearchRef.current = ref)}
      />
      <MainModal />
    </>
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
  habitSearchContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
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
  errorToast: { textColor: "#fff" },
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
