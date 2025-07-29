import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../../ValueSheet";

const data = [
  {
    text: "Yes",
  },
  {
    text: "No",
  },
];

const SleepStep3 = (props) => {
  const { width, height } = useWindowDimensions();
  const [active, setActive] = useState(0);

  const { sleepReport } = props.route.params;

  const onNext = async () => {
    if (active == 0) {
      Toast.show({
        type: "error",
        text1: "Please make a selection.",
      });
    } else {
      if (active == 1) {
        sleepReport.didWindDown = true;
      } else {
        sleepReport.didWindDown = false;
      }

      navigationService.navigate("sleepStep4", { sleepReport });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Did you wind down before bed?</Text>

        {data.map((val, key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.buttonCon,
              { width: width * 0.9 },
              active === key + 1 && {
                backgroundColor: ValueSheet.colours.secondaryColour,
              },
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
    backgroundColor: ValueSheet.colours.background,
    padding: 15,
    justifyContent: "space-between",
  },
  buttonCon: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    marginBottom: 15,
    borderColor: ValueSheet.colours.grey,
  },
  title: {
    fontSize: 30,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 70,
    marginBottom: 80,
    textAlign: "center",
  },
  yesNoText: {
    fontSize: 25,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    borderColor: ValueSheet.colours.grey,
  },
  center: {
    alignItems: "center",
  },
});

export default SleepStep3;
