import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Toast from "react-native-root-toast";

const data = [
  {
    text: "Yes",
  },
  {
    text: "No",
  },
];

const SleepStep2 = (props) => {
  const { width, height } = useWindowDimensions();
  const [active, setActive] = useState(0);

  const { sleepReport } = props.route.params;

  const onNext = async () => {
    if (active == 0) {
      if (Platform.OS === "ios") {
        Toast.show("Please make a selection.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Please make a selection.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    } else {
      if (active == 1) {
        sleepReport.wasComfyEnvironment = true;
      } else {
        sleepReport.wasComfyEnvironment = false;
      }

      navigationService.navigate("sleepStep3", {
        sleepReport,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Were you in a comfy environment?</Text>

        {data.map((val, key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.buttonCon,
              { width: width * 0.9 },
              active === key + 1 && { backgroundColor: "#D7F6FF" },
            ]}
            onPress={() => {
              setActive(key + 1);
            }}
          >
            <Text style={styles.yesNoText}>{val.text}</Text>
          </TouchableOpacity>
        ))}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "space-between",
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
  buttonCon: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    marginBottom: 15,
    borderColor: "#CCCCCC",
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
    marginTop: 70,
    marginBottom: 80,
    textAlign: "center",
  },
  yesNoText: {
    fontSize: 25,
    color: "#25436B",
    fontFamily: "Sego",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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

export default SleepStep2;
