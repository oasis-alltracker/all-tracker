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

const WellnessStep5 = (props) => {
  const { width, height } = useWindowDimensions();
  const [company, setCompany] = useState("");
  const { moodReport } = props.route.params;
  const theme = useContext(ThemeContext).value;

  const onNext = async () => {
    if (company == "") {
      Toast.show({
        type: "info",
        text1: "Incomplete field",
        text2: "Please write an entry.",
      });
    } else {
      moodReport.company = company;
      navigationService.navigate("moodStep6", { moodReport });
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
              Who are you with?
            </Text>
          </View>

          <View
            style={[
              styles.textCon,
              sharedStyles["borderedContainer_" + theme],
              { width: width * 0.9 },
            ]}
          >
            <TextInput
              placeholderTextColor={ValueSheet.colours[theme].inputGrey}
              placeholder="Friends, myself, dog..."
              style={[styles.input, sharedStyles["textColour_" + theme]]}
              onChangeText={setCompany}
              value={company}
            />
          </View>

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
    marginTop: 125,
    textAlign: "center",
  },
  input: {
    borderRadius: 25,
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
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    width: "47%",
  },
  center: {
    alignItems: "center",
  },
});

export default WellnessStep5;
