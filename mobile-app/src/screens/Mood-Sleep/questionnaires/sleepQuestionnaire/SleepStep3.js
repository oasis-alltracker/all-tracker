import React, { useState, useContext } from "react";
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
import { ThemeContext } from "../../../../contexts/ThemeProvider";
import { sharedStyles } from "../../../styles";

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
  const theme = useContext(ThemeContext).value;

  const { sleepReport } = props.route.params;

  const onNext = async () => {
    if (active == 0) {
      Toast.show({
        type: "info",
        text1: "No selection made",
        text2: "Please make a selection before proceeding.",
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
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <View style={styles.center}>
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          Did you wind down before bed?
        </Text>

        {data.map((val, key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.buttonCon,
              sharedStyles["borderedContainer_" + theme],
              { width: width * 0.9 },
              active === key + 1 && {
                backgroundColor: ValueSheet.colours.secondaryColour,
              },
            ]}
            onPress={() => {
              setActive(key + 1);
            }}
          >
            <Text
              style={[
                styles.yesNoText,
                sharedStyles["textColour_" + theme],
                active === key + 1 && {
                  color: ValueSheet.colours[theme].invertedPrimaryColour,
                },
              ]}
            >
              {val.text}
            </Text>
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
      <Toast position="bottom" bottomOffset={140} visibilityTime={2500} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  title: {
    fontSize: 30,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 70,
    marginBottom: 80,
    textAlign: "center",
  },
  yesNoText: {
    fontSize: 25,
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
  },
  center: {
    alignItems: "center",
  },
});

export default SleepStep3;
