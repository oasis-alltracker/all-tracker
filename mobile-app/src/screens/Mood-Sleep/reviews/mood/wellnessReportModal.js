import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button } from "../../../../components";
import MoodJournalModal from "./moodJournalModal";
import Spinner from "react-native-loading-spinner-overlay";

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
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.modal}
    >
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.container}>
        <Text style={styles.titleTitle}>{title}</Text>
        <View style={styles.center}>
          <Image
            style={styles.ratingImage}
            source={data[Number(feeling) - 1].image}
          />
        </View>

        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Mood</Text>
          <Text style={styles.dataValue}>{mood}</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Activity</Text>
          <Text style={styles.dataValue}>{activity}</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Company</Text>
          <Text style={styles.dataValue}>{company}</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Location</Text>
          <Text style={styles.dataValue}>{location}</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={styles.diaryButton}
            onPress={() => {
              moodRef.current.open(moodReport);
            }}
          >
            <Text style={styles.diaryText}>Diary</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <Button onPress={() => onBack()} style={[styles.button, styles.back]}>
            {"Delete"}
          </Button>
          <Button onPress={() => onDone()} style={styles.button}>
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
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  ratingImage: {
    width: 70,
    height: 70,
    marginVertical: 15,
  },
  editData: {
    width: 40,
    height: 40,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
    color: "#25436B",
    fontSize: 22,
    fontFamily: "Sego",
    flex: 1,
    marginLeft: 5,
  },
  titleTitle: {
    color: "#25436B",
    fontSize: 28,
    fontFamily: "Sego-Bold",
    marginTop: 10,
  },
  dataValue: {
    color: "#25436B",
    fontSize: 22,
    fontFamily: "Sego-Bold",
    flex: 1,
    paddingRight: 10,
    textAlign: "right",
  },
  title: {
    color: "#25436B",
    fontSize: 35,
    fontFamily: "Sego-Bold",
    flex: 1,
    marginLeft: 20,
    fontSize: 20,
  },
  key: {
    color: "#25436B",
    fontSize: 25,
    fontFamily: "Sego",
  },
  errorToast: { textColor: "#fff" },
  input: {
    width: 100,
    paddingHorizontal: 20,
    color: "#25436B",
    flex: 1,
    fontFamily: "Sego",
    fontSize: 18,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  check: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkImage: {
    width: 20,
    height: 20,
  },
  center: {
    alignItems: "center",
  },
  diaryButton: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    height: 40,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },
  diaryText: {
    color: "#25436B",
    fontFamily: "Sego-Bold",
    fontSize: 20,
  },
});
