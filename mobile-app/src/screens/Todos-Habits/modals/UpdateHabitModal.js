import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { Header } from "../../../components";

import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function UpdateHabitModal({ getRef, updateHabit, deleteHabit }) {
  const [visible, setVisible] = useState(false);

  const [imageSearch, setImageSearch] = useState(false);
  const [habitSearch, setHabitSearch] = useState(false);

  const [image, setImage] = useState(
    "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
  );

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
    setImageSearch(false);
  };

  const backDropPressed = () => {
    setTempHabitName(false);
    setTempIsPositiveIndex(false);
    setTempThreshold(false);
    setTempTime(false);

    setVisible(false);
    setHabitSearch(false);
    setImageSearch(false);
    setImage("https://oasis-images.s3.ca-central-1.amazonaws.com/white.png");
  };

  const CurrentModal = () => (
    <>
      {imageSearch ? (
        <ImageModal />
      ) : habitSearch ? (
        <SearchModal />
      ) : (
        <MainModal />
      )}
    </>
  );

  const SearchModal = () => <></>;

  const ImageModal = () => (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => backDropPressed()}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.scrollModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <Spinner visible={isLoading}></Spinner>
        <ScrollView style={styles.tcContainer}>
          <View style={styles.scrollViewView}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setHabitSearch(false);
                setImageSearch(false);
              }}
            >
              <Image
                style={styles.backImage}
                resizeMode="cover"
                source={require("../../../assets/images/back-arrow.png")}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/jumpsuit.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/jumpsuit.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/herbs.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/herbs.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/drum.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/drum.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/piano.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/piano.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/console.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/console.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/audio-jack.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/audio-jack.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/party-music.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/party-music.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/eco-idea.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/eco-idea.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/flipflop.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/flipflop.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/multimedia.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/multimedia.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/music-note.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/music-note.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/add-to-cart.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/add-to-cart.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/gym.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/gym.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/electric-guitar.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/electric-guitar.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/news.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/news.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/runner.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/runner.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/yoga.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/yoga.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/exercise.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/exercise.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/smoking.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/smoking.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-food.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-food.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </RNModal>
  );

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
      if (threshold <= 0) {
        Toast.show("Threshold must be greater than 0.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
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
        await updateHabit(habitID, habit);
        setIsLoading(false);
      } else {
        Toast.show("You must complete the form to update a habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
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
      setImageSearch(true);
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

            <View style={styles.row}>
              <Text style={styles.key}>Times a day:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setThreshold}
                keyboardType="number-pad"
                value={threshold}
                onSubmitEditing={Keyboard.dismiss}
                maxLength={2}
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
      </RNModal>
    );
  };

  return <CurrentModal />;
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
    height: height * 0.7,
  },
  container: {
    width: "90%",
    paddingVertical: 20,
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
    marginTop: 40,
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
    width: 130,
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
    width: 90,
    height: 90,
  },
  selectImage: {
    width: 135,
    height: 135,
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
    marginLeft: 10,
    marginRight: 10,
    height: height * 0.7,
  },
  habitSearchContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    height: height * 0.7,
    width: width,
  },
  habitSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
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
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
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
