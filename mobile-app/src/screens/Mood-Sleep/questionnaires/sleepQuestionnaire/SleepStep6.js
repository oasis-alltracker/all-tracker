import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import SleepReportsAPI from "../../../../api/sleep/sleepReportsAPI";
import { getAccessToken } from "../../../../user/keychain";
import { ValueSheet } from "../../../../ValueSheet";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { sharedStyles } from "../../../styles";

const SleepStep6 = (props) => {
  const { width, height } = useWindowDimensions();
  const [journal, setJournal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sleepReport } = props.route.params;
  const theme = useContext(ThemeContext).value;

  const createSleepReport = async (sleepReport) => {
    try {
      token = await getAccessToken();
      await SleepReportsAPI.createSleepReport(token, sleepReport);
      setIsLoading(false);
      navigationService.reset("mood-sleep", 0);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Toast.show({
        type: "info",
        text1: "Something went wrong",
        text2: "Please try again.",
      });
    }
  };

  const onNext = async () => {
    sleepReport.journal = journal;
    setIsLoading(true);
    createSleepReport(sleepReport);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={[styles.container, sharedStyles["pageBackground_" + theme]]}
      >
        <>
          <Spinner visible={isLoading}></Spinner>

          <View style={styles.center}>
            <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
              Did you dream?
            </Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[
              styles.textCon,
              sharedStyles["borderedContainer_" + theme],
              { width: width * 0.9, height: height * 0.5 },
            ]}
          >
            <TextInput
              multiline
              placeholderTextColor={ValueSheet.colours.light.inputGrey}
              placeholder="Describe your dream in as much detail as you'd like:"
              style={[
                styles.input,
                sharedStyles["borderedContainer_" + theme],
                sharedStyles["textColour_" + theme],
              ]}
              onChangeText={setJournal}
              value={journal}
              numberOfLines={100}
            />
          </KeyboardAvoidingView>

          <View style={styles.buttons}>
            <Button
              onPress={() => navigationService.goBack()}
              style={[styles.button]}
            >
              Back
            </Button>
            <Button
              onPress={() => onNext()}
              style={styles.button}
              positiveSelect={true}
            >
              Next
            </Button>
          </View>
        </>
        <Toast position="bottom" bottomOffset={140} visibilityTime={2500} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 80,
    textAlign: "center",
  },
  input: {
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryFont,
    flex: 1,
    marginLeft: 5,
    marginTop: 15,
    padding: 10,
    textAlignVertical: "top",
    borderRadius: 25,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  textCon: {
    borderRadius: 25,
    borderWidth: 2,
  },
  button: {
    width: "47%",
  },
  center: {
    alignItems: "center",
  },
});

export default SleepStep6;
