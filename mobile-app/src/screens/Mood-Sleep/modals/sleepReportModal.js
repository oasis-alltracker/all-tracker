import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button, Calendar } from "../../../components";

export default function SleepReportModal({
  getRef,
  updateSleepReport,
  deleteSleepReport,
}) {
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState(null);
  const [rating, setRating] = useState(null);
  const [wasComfyEnvironment, setWasComfyEnvironmen] = useState(null);
  const [didWindDown, setDidWindDown] = useState(null);
  const [didManageIntake, setDidManageIntake] = useState(null);
  const [didRelaxation, setDidRelaxation] = useState(null);

  const [sleepReportSK, setSleepReportSK] = useState(null);

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
            deleteSleepReport(moodReportSK);
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
      <View style={styles.container}>
        <View style={styles.nameRow}>
          <Text style={styles.inputTitle}>{title}</Text>
          <Image
            style={styles.searchImage}
            source={require("../../../assets/images/date-picker.png")}
          />
        </View>

        <View style={styles.descriptionRow}>
          <Text style={styles.inputTitle}>{title}</Text>
          <Text style={styles.inputTitle}>{title}</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.inputTitle}>{title}</Text>
          <Text style={styles.inputTitle}>{title}</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.inputTitle}>{title}</Text>
          <Text style={styles.inputTitle}>{title}</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.inputTitle}>{title}</Text>
          <Text style={styles.inputTitle}>{title}</Text>
        </View>

        <View style={styles.descriptionRow}>
          <TouchableOpacity>
            <Image
              style={styles.searchImage}
              source={require("../../../assets/images/date-picker.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <Button onPress={() => onBack()} style={[styles.button, styles.back]}>
            {"Delete"}
          </Button>
          <Button onPress={() => onSave()} style={styles.button}>
            Save
          </Button>
        </View>
      </View>
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
  searchImage: {
    width: 30,
    height: 30,
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
    marginBottom: 70,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputTitle: {
    color: "#25436B",
    fontSize: 30,
    fontFamily: "Sego-Bold",
    flex: 1,
    marginLeft: 5,
    marginTop: 15,
    paddingVertical: 10,
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
    backgroundColor: "#FFD7D7",
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
});
