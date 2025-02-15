import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import RNModal from "react-native-modal";
import { Button } from "../../../../components";

export default function DreamJournalModal({ getRef, updateReport }) {
  const [visible, setVisible] = useState(false);

  const [sleepReport, setSleepReport] = useState(null);
  const [journal, setJournal] = useState(null);

  const onBack = async () => {
    Alert.alert(
      "Exit",
      "Any changes will be lost",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Ok",
          isPreferred: true,
          onPress: () => {
            setVisible(false);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onSave = async () => {
    updateReport(journal);
    setVisible(false);
  };

  useEffect(() => {
    let ref = {
      open(props) {
        setVisible(true);

        setSleepReport(props);
        setJournal(props.journal);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titleTitle}>Dream</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.textCon}
          >
            <TextInput
              multiline
              placeholderTextColor={"#7B97BC"}
              placeholder="Write as much detail as you'd like:"
              style={styles.input}
              onChangeText={setJournal}
              value={journal}
            />
          </KeyboardAvoidingView>

          <View style={styles.buttonsRow}>
            <Button
              onPress={() => onBack()}
              style={[styles.button, styles.back]}
            >
              {"Cancel"}
            </Button>
            <Button onPress={() => onSave()} style={styles.button}>
              Save
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    height: 550,
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
    paddingTop: 40,
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
    marginVertical: 24,
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
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
  input: {
    color: "#25436B",
    fontFamily: "Sego",
    fontSize: 14,
    width: "90%",
    textAlignVertical: "top",
    height: 210,
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
  textCon: {
    width: 340,
    height: 290,
  },
});
