import React, { useState } from "react";
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
import Toast from "react-native-root-toast";
import { ValueSheet } from "../../../../ValueSheet";

const WellnessStep5 = (props) => {
  const { width, height } = useWindowDimensions();
  const [company, setCompany] = useState("");
  const { moodReport } = props.route.params;

  const onNext = async () => {
    if (company == "") {
      if (Platform.OS === "ios") {
        Toast.show("Don't forget to write an entry.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Don't forget to write an entry.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    } else {
      moodReport.company = company;
      navigationService.navigate("moodStep6", { moodReport });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <>
          <View style={styles.center}>
            <Text style={styles.title}>Who are you with?</Text>
          </View>

          <View style={[styles.textCon, { width: width * 0.9 }]}>
            <TextInput
              placeholderTextColor={ValueSheet.colours.inputGrey}
              placeholder="Friends, myself, dog..."
              style={styles.input}
              onChangeText={setCompany}
              value={company}
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
    marginTop: 125,
    textAlign: "center",
  },
  input: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryFont,
    flex: 1,
    textAlign: "center",
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    paddingTop: 40,
    justifyContent: "space-between",
    width: "100%",
  },
  textCon: {
    borderRadius: 25,
    borderWidth: 2,
    height: 100,
    borderColor: ValueSheet.colours.grey,
    alignItems: "center",
    textAlign: "center",
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
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
});

export default WellnessStep5;
