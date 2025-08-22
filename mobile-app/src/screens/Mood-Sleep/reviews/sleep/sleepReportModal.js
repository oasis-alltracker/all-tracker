import React, { useEffect, useContext, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button } from "../../../../components";
import DreamJournalModal from "./dreamJournalModal";
import Spinner from "react-native-loading-spinner-overlay";
import { ValueSheet } from "../../../../ValueSheet";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { sharedStyles } from "../../../styles";

const data = [
  {
    light: require("../../../../assets/images/sleepRating/1_light.png"),
    dark: require("../../../../assets/images/sleepRating/1_dark.png"),
  },
  {
    light: require("../../../../assets/images/sleepRating/2_light.png"),
    dark: require("../../../../assets/images/sleepRating/2_dark.png"),
  },
  {
    light: require("../../../../assets/images/sleepRating/3_light.png"),
    dark: require("../../../../assets/images/sleepRating/3_dark.png"),
  },
  {
    light: require("../../../../assets/images/sleepRating/4_light.png"),
    dark: require("../../../../assets/images/sleepRating/4_dark.png"),
  },
  {
    light: require("../../../../assets/images/sleepRating/5_light.png"),
    dark: require("../../../../assets/images/sleepRating/5_dark.png"),
  },
];

export default function SleepReportModal({
  getRef,
  updateSleepReport,
  deleteSleepReport,
}) {
  const theme = useContext(ThemeContext).value;
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
            source={data[Number(rating) - 1][theme]}
          />
        </View>

        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Comfy?
          </Text>
          {wasComfyEnvironment ? (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              Yes
            </Text>
          ) : (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              No
            </Text>
          )}
        </View>
        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Wind down?
          </Text>
          {didWindDown ? (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              Yes
            </Text>
          ) : (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              No
            </Text>
          )}
        </View>
        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Managed intake?
          </Text>
          {didManageIntake ? (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              Yes
            </Text>
          ) : (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              No
            </Text>
          )}
        </View>
        <View style={styles.descriptionRow}>
          <Text style={[styles.dataTitle, sharedStyles["textColour_" + theme]]}>
            Relaxed?
          </Text>
          {didRelaxation ? (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              Yes
            </Text>
          ) : (
            <Text
              style={[styles.dataValue, sharedStyles["textColour_" + theme]]}
            >
              No
            </Text>
          )}
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.diaryButton,
              sharedStyles["borderedContainer_" + theme],
            ]}
            onPress={() => {
              dreamRef.current.open(sleepReport);
            }}
          >
            <Text
              style={[styles.diaryText, sharedStyles["textColour_" + theme]]}
            >
              Dream
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
