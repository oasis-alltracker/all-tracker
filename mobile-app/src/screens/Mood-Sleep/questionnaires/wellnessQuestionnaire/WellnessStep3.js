import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Toast from "react-native-root-toast";

const WellnessStep3 = (props) => {
  const { width, height } = useWindowDimensions();
  const [activity, setActivity] = useState("");
  const { moodReport } = props.route.params;

  const onNext = async () => {
    if (activity == "") {
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
      moodReport.activity = activity;
      navigationService.navigate("moodStep4", { moodReport });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <>
          <View style={styles.center}>
            <Text style={styles.title}>What activity were you performing?</Text>
          </View>

          <View style={[styles.textCon, { width: width * 0.9 }]}>
            <TextInput
              placeholderTextColor={"#7B97BC"}
              placeholder="Reading, watching TV.."
              style={styles.input}
              onChangeText={setActivity}
              value={activity}
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
    marginTop: 125,
    textAlign: "center",
  },
  input: {
    color: "#25436B",
    fontSize: 22,
    fontFamily: "Sego",
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
    borderColor: "#CCCCCC",
    alignItems: "center",
    textAlign: "center",
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
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});

export default WellnessStep3;
