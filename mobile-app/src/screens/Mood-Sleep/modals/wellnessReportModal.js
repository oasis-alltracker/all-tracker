import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button, Calendar } from "../../../components";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";

export default function WellnessReportModal({
  getRef,
  updateMoodReport,
  deleteMoodReport,
}) {
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState(null);
  const [feeling, setFeeling] = useState(null);
  const [mood, setMood] = useState(null);
  const [activity, setActivity] = useState(null);
  const [location, setLocation] = useState(null);
  const [company, setCompany] = useState(null);

  const [moodReportSK, setMoodReportSK] = useState(null);

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
      open(isEdit = false, props) {
        setVisible(true);

        setTitle(title);
        setFeeling(props.feeling);
        setMood(props.mood);
        setActivity(props.activity);
        setLocation(props.location);
        setCompany(props.company);

        setMoodReportSK(props.SK);
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
          <TouchableOpacity
            onPress={() => {
              calendarRef.current.open(isEdit, {
                isRecurring: isRecurring,
                dateStamp: dateStamp,
                schedule: schedule,
                itemID: itemID,
                time: time,
                notifications: isNotificationsOn,
              });
            }}
          >
            <Image
              style={styles.searchImage}
              source={require("../../../assets/images/date-picker.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsRow}>
          <Button onPress={() => onBack()} style={[styles.button, styles.back]}>
            {isEdit ? "Delete" : "Cancel"}
          </Button>
          <Button onPress={() => onSave()} style={styles.button}>
            Save
          </Button>
        </View>
      </View>
      <Calendar
        saveDateHandler={saveDateHandler}
        getRef={(ref) => (calendarRef.current = ref)}
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
