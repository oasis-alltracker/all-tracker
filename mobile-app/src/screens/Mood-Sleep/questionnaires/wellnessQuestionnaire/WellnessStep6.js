import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import WellnessReportsAPI from "../../../../api/mood/wellnessReportsAPI";
import { getAccessToken } from "../../../../user/keychain";
import { ValueSheet } from "../../../../ValueSheet";

const WellnessStep6 = (props) => {
  const { width, height } = useWindowDimensions();
  const [journal, setJournal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { moodReport } = props.route.params;

  const createMoodReport = async (moodReport) => {
    try {
      token = await getAccessToken();
      await WellnessReportsAPI.createWellnessReport(token, moodReport);
      setIsLoading(false);
      navigationService.reset("mood-sleep", 0);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again.",
      });
    }
  };

  const onNext = async () => {
    moodReport.journal = journal;
    setIsLoading(true);
    await createMoodReport(moodReport);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <>
          <Spinner visible={isLoading}></Spinner>

          <View style={styles.center}>
            <Text style={styles.title}>Anything else?</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[
              styles.textCon,
              { width: width * 0.9, height: height * 0.5 },
            ]}
          >
            <TextInput
              multiline
              placeholderTextColor={ValueSheet.colours.inputGrey}
              placeholder="Write as much as you'd like:"
              style={styles.input}
              onChangeText={setJournal}
              value={journal}
              numberOfLines={100}
            />
          </KeyboardAvoidingView>

          <View style={styles.buttons}>
            <Button
              onPress={() => navigationService.goBack()}
              style={[styles.button, styles.back]}
            >
              Back
            </Button>
            <Button onPress={() => onNext()} style={styles.button}>
              Next
            </Button>
          </View>
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 80,
    textAlign: "center",
  },
  input: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryFont,
    flex: 1,
    marginLeft: 5,
    marginTop: 15,
    padding: 10,
    textAlignVertical: "top",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  textCon: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
  },
  center: {
    alignItems: "center",
  },
});

export default WellnessStep6;
