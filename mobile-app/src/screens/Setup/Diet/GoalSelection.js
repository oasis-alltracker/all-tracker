import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import navigationService from "../../../navigators/navigationService";
import { ValueSheet } from "../../../ValueSheet";

const GoalSelection = (props) => {
  const [goal, setGoal] = useState("none");
  const { selectedTrackers, isEditingMacros } = props.route.params;

  const onNext = () => {
    if (goal != "none") {
      navigationService.navigate("currentWeight", {
        selectedTrackers,
        isEditingMacros,
        goal,
      });
    } else {
      if (Platform.OS === "ios") {
        Toast.show("Please make a selection", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Please make a selection", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const getButtonColour = (buttonGoal) => {
    if (buttonGoal == goal) {
      return ValueSheet.colours.secondaryColour65;
    } else {
      return "transparent";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/diet.png")}
          />
          <Text style={styles.imageText}>diet</Text>
        </View>
        <Text style={styles.title}>What is your goal?</Text>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("lose") },
          ]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setGoal("lose");
          }}
        >
          Lose weight
        </Button>
        <Button
          style={[
            styles.bigButtons,

            { backgroundColor: getButtonColour("maintain") },
          ]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setGoal("maintain");
          }}
        >
          Maintain weight
        </Button>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("gain") },
          ]}
          onPress={() => {
            setGoal("gain");
          }}
          textStyle={styles.buttonsText}
        >
          Gain weight
        </Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button
          onPress={() => {
            onNext();
          }}
          style={styles.button}
        >
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
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: ValueSheet.colours.purple,
    borderColor: ValueSheet.colours.borderPurple70,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 25,
    marginBottom: 20,
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
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
  bigButtons: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
    height: 80,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonsText: {
    fontSize: 22,
  },
  center: {
    alignItems: "center",
  },
});

export default GoalSelection;
