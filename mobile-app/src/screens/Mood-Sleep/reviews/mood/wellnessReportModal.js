import React, { useEffect, useRef, useState, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button } from "../../../../components";
import MoodJournalModal from "./moodJournalModal";
import Spinner from "react-native-loading-spinner-overlay";
import { ValueSheet } from "../../../../ValueSheet";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { sharedStyles } from "../../../styles";

const data = [
  {
    image: require("../../../../assets/images/moodRating/1.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/2.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/3.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/4.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/5.png"),
  },
];

export default function WellnessReportModal({
  getRef,
  updateMoodReport,
  deleteMoodReport,
}) {
  const theme = useContext(ThemeContext).value;
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState(null);
  const [feeling, setFeeling] = useState(1);
  const [mood, setMood] = useState(null);
  const [activity, setActivity] = useState(null);
  const [location, setLocation] = useState(null);
  const [company, setCompany] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [moodReportSK, setMoodReportSK] = useState(null);
  const [moodReport, setMoodReport] = useState(null);

  const moodRef = useRef(null);

  const updateReport = async (journal) => {
    setIsLoading(true);
    newReport = moodReport;
    newReport.journal = journal;
    await updateMoodReport(newReport);
    setMoodReport(newReport);
    setIsLoading(false);
  };

  const onBack = async () => {
    Alert.alert(
      "Delete Check-in",
      "Are you sure you want to delete this check-in?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          isPreferred: true,
          onPress: () => {
            deleteMoodReport(moodReportSK);
            setVisible(false);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onDone = async () => {
    setVisible(false);
  };

  useEffect(() => {
    let ref = {
      open(props) {
        setVisible(true);

        setTitle(props.title);
        setFeeling(props.feeling);
        setMood(props.mood);
        setActivity(props.activity);
        setLocation(props.location);
        setCompany(props.company);
        setMoodReportSK(props.SK);
        setMoodReport(props);
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropColor={ValueSheet.colours[theme].secondaryColour27}
      style={styles.modal}
    >
      <Spinner visible={isLoading}></Spinner>
      <View
        style={[styles.container, sharedStyles["borderedContainer_" + theme]]}
      >
        <Text style={[styles.titleTitle, sharedStyles["textColour_" + theme]]}>
          {title}
        </Text>
        <View style={styles.center}>
          <Image
            style={styles.ratingImage}
            source={data[Number(feeling) - 1].image}
          />
        </View>

        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Mood
          </Text>
          <Text style={[styles.dataValue, sharedStyles["textColour_" + theme]]}>
            {mood}
          </Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Activity
          </Text>
          <Text style={[styles.dataValue, sharedStyles["textColour_" + theme]]}>
            {activity}
          </Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Company
          </Text>
          <Text style={[styles.dataValue, sharedStyles["textColour_" + theme]]}>
            {company}
          </Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Location
          </Text>
          <Text style={[styles.dataValue, sharedStyles["textColour_" + theme]]}>
            {location}
          </Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.diaryButton,
              sharedStyles["borderedContainer_" + theme],
            ]}
            onPress={() => {
              moodRef.current.open(moodReport);
            }}
          >
            <Text
              style={[styles.diaryText, sharedStyles["textColour_" + theme]]}
            >
              Diary
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <Button onPress={() => onBack()} style={[styles.button, styles.back]}>
            {"Delete"}
          </Button>
          <Button
            onPress={() => onDone()}
            style={styles.button}
            positiveSelect={true}
          >
            Ok
          </Button>
        </View>
      </View>
      <MoodJournalModal
        getRef={(ref) => (moodRef.current = ref)}
        updateReport={updateReport}
      />
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
  ratingImage: {
    width: 70,
    height: 70,
    marginVertical: 15,
  },
  descriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dataTitle: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryFont,
    flex: 1,
    marginLeft: 5,
  },
  titleTitle: {
    fontSize: 28,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 10,
  },
  dataValue: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryBold,
    flex: 1,
    paddingRight: 10,
    textAlign: "right",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
  },
  center: {
    alignItems: "center",
  },
  diaryButton: {
    borderWidth: 2,
    borderRadius: 30,
    height: 40,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
    paddingBottom: 5,
  },
  diaryText: {
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 20,
  },
});
