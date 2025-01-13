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
  Alert,
} from "react-native";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import ImagesModal from "./ImagesModal";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { Header } from "../../../components";

import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateHabitModal({ getRef, updateHabit, deleteHabit }) {
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const [image, setImage] = useState(
    "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
  );
  const imagesRef = useRef(null);

  const [habitID, setHabitID] = useState("");

  const [tempHabitName, setTempHabitName] = useState("");
  const [tempIsPositiveIndex, setTempIsPositiveIndex] = useState("");
  const [tempThreshold, setTempThreshold] = useState("");
  const [tempTime, setTempTime] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ref = {
      open(edit, props) {
        setVisible(true);

        if (props) {
          if (props.isPositive) {
            setTempIsPositiveIndex(0);
          } else {
            setTempIsPositiveIndex(1);
          }

          setTempHabitName(props.habitName);
          setTempThreshold(props.threshold);
          setTempTime(new Date("1996-12-17T" + props.time + ":00"));
          setHabitID(props.habitID);
          setImage(props.pngURL);
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

  const reopenMain = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTimeout(() => {
      setVisible(true);
    }, 1051);
  };

  const backDropPressed = () => {
    setTempHabitName(false);
    setTempIsPositiveIndex(false);
    setTempThreshold(false);
    setTempTime(false);

    setVisible(false);
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
      Keyboard.dismiss();
      if (threshold <= 0) {
        Toast.show("Don't forget to set a goal for this habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else if (threshold > 99) {
        Toast.show("Your goal must be less than 100.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
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
          time: time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }),
        };

        habit.isPositive = true;
        backDropPressed();
        updateHabit(habitID, habit);
      } else {
        Toast.show("You must complete the form to update a habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
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
              backDropPressed();
              deleteHabit(habitID);
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    };

    const onChange = (event, selectedDate) => {
      if (Platform.OS === "android") {
        setShow(false);
      }
      setTime(selectedDate);
      setTimeIsSet(true);
    };

    const searchImage = () => {
      setTempHabitName(habitName);
      setTempIsPositiveIndex(isPositiveIndex);
      setTempThreshold(threshold);
      setTempTime(time);

      setIsLoading(true);
      setVisible(false);
      imagesRef.current.open();
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
        isVisible={visible}
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
                />
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
