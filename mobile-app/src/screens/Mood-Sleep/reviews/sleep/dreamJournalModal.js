import React, { useEffect, useContext, useState } from "react";
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
import { ValueSheet } from "../../../../ValueSheet";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { sharedStyles } from "../../../styles";

export default function DreamJournalModal({ getRef, updateReport }) {
  const theme = useContext(ThemeContext).value;
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
      backdropColor={ValueSheet.colours.secondaryColour27}
      style={styles.modal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.container, sharedStyles["borderedContainer_" + theme]]}
        >
          <Text
            style={[styles.titleTitle, sharedStyles["textColour_" + theme]]}
          >
            Dream
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.textCon}
          >
            <TextInput
              multiline
              placeholderTextColor={ValueSheet.colours.inputGrey}
              placeholder="Write as much detail as you'd like:"
              style={[styles.input, sharedStyles["textColour_" + theme]]}
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
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 550,
    borderWidth: 1,
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
  titleTitle: {
    fontSize: 28,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginVertical: 24,
  },
  input: {
    fontFamily: ValueSheet.fonts.primaryFont,
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
  },
  textCon: {
    width: 340,
    height: 290,
  },
});
