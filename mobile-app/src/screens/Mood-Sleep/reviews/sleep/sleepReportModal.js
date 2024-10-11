import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button } from "../../../../components";
import DreamJournalModal from "./dreamJournalModal";
import Spinner from "react-native-loading-spinner-overlay";

const data = [
  {
    image: require("../../../../assets/images/sleepRating/1.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/2.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/3.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/4.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/5.png"),
  },
];

export default function SleepReportModal({
  getRef,
  updateSleepReport,
  deleteSleepReport,
}) {
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(1);
  const [wasComfyEnvironment, setWasComfyEnvironmen] = useState(null);
  const [didWindDown, setDidWindDown] = useState(null);
  const [didManageIntake, setDidManageIntake] = useState(null);
  const [didRelaxation, setDidRelaxation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [sleepReportSK, setSleepReportSK] = useState(null);
  const [sleepReport, setSleepReport] = useState(null);
  const dreamRef = useRef(null);

  const updateReport = async (journal) => {
    setIsLoading(true);
    newReport = sleepReport;
    newReport.journal = journal;
    await updateSleepReport(newReport);
    setSleepReport(newReport);
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
            deleteSleepReport(sleepReportSK);
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
        setRating(props.rating);
        setWasComfyEnvironmen(props.wasComfyEnvironment);
        setDidWindDown(props.didWindDown);
        setDidManageIntake(props.didManageIntake);
        setDidRelaxation(props.didRelaxation);

        setSleepReportSK(props.SK);
        setSleepReport(props);
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
            source={data[Number(rating) - 1].image}
          />
        </View>

        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Comfy?</Text>
          {wasComfyEnvironment ? (
            <Text style={styles.dataValue}>Yes</Text>
          ) : (
            <Text style={styles.dataValue}>No</Text>
          )}
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Wind down?</Text>
          {didWindDown ? (
            <Text style={styles.dataValue}>Yes</Text>
          ) : (
            <Text style={styles.dataValue}>No</Text>
          )}
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Managed intake?</Text>
          {didManageIntake ? (
            <Text style={styles.dataValue}>Yes</Text>
          ) : (
            <Text style={styles.dataValue}>No</Text>
          )}
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.dataTitle}>Relaxed?</Text>
          {didRelaxation ? (
            <Text style={styles.dataValue}>Yes</Text>
          ) : (
            <Text style={styles.dataValue}>No</Text>
          )}
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={styles.diaryButton}
            onPress={() => {
              dreamRef.current.open(sleepReport);
            }}
          >
            <Text style={styles.diaryText}>Dream</Text>
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
      <DreamJournalModal
        getRef={(ref) => (dreamRef.current = ref)}
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
  errorToast: {
    textColor: "#25436B",
  },
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
