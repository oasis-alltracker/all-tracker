import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../../ValueSheet";
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { sharedStyles } from "../../../styles";

const WellnessStep2 = (props) => {
  const { width, height } = useWindowDimensions();
  const [mood, setMood] = useState("");
  const { moodReport } = props.route.params;
  const theme = useContext(ThemeContext).value;

  const onNext = async () => {
    if (mood == "") {
      Toast.show({
        type: "info",
        text1: "Incomplete field",
        text2: "Please write an entry.",
      });
    } else {
      moodReport.mood = mood;
      navigationService.navigate("moodStep3", { moodReport });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={[styles.container, sharedStyles["pageBackground_" + theme]]}
      >
        <>
          <View style={styles.center}>
            <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
              How would you describe your mood?
            </Text>
          </View>

          <View style={[styles.textCon, { width: width * 0.9 }]}>
            <TextInput
              placeholderTextColor={ValueSheet.colours.inputGrey}
              placeholder="Sad, happy, tired, excited.."
              style={[
                styles.input,
                sharedStyles["borderedContainer_" + theme],
                sharedStyles["textColour_" + theme],
              ]}
              onChangeText={setMood}
              value={mood}
            />
          </View>

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
    marginTop: 125,
    textAlign: "center",
  },
  input: {
    fontSize: 22,
    borderRadius: 25,
    fontFamily: ValueSheet.fonts.primaryFont,
    flex: 1,
    textAlign: "center",
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 82,
    width: "100%",
  },
  textCon: {
    borderRadius: 25,
    borderWidth: 2,
    height: 100,
    alignItems: "center",
    textAlign: "center",
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
});

export default WellnessStep2;
