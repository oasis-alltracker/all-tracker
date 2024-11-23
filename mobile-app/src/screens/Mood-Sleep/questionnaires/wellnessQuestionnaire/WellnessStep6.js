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
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import WellnessReportsAPI from "../../../../api/mood/wellnessReportsAPI";
import { getAccessToken } from "../../../../user/keychain";

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
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const onNext = async () => {
    moodReport.journal = journal;
    setIsLoading(true);
    try {
      await createMoodReport(moodReport);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Please make a selection.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
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
              placeholderTextColor={"#7B97BC"}
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
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 80,
    textAlign: "center",
  },
  input: {
    color: "#25436B",
    fontSize: 14,
    fontFamily: "Sego",
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
    borderColor: "#CCCCCC",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  bigButtons: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
    height: 60,
    borderRadius: 20,
    marginTop: 0,
  },
  center: {
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
  },
  errorToast: { textColor: "#fff" },
});

export default WellnessStep6;
