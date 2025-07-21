import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import navigationService from "../../../navigators/navigationService";
import { ValueSheet } from "../../../ValueSheet";

const TargetWeight = (props) => {
  const { selectedTrackers, isEditingMacros } = props.route.params;
  const [dietFactors, setDietFactors] = useState(
    props.route.params.dietFactors
  );
  const [goalWeight, setGoalWeight] = useState(null);

  const onNext = () => {
    if (goalWeight) {
      if (!isNaN(Number(goalWeight))) {
        if (
          dietFactors.goal == "gain" &&
          goalWeight <= dietFactors.currentWeight.weight
        ) {
          if (Platform.OS === "ios") {
            Toast.show(
              "Please enter a number greater than your current weight",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
              }
            );
          } else {
            Toast.show(
              "Please enter a number greater than your current weight",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
              }
            );
          }
        } else if (
          dietFactors.goal == "lose" &&
          goalWeight >= dietFactors.currentWeight.weight
        ) {
          if (Platform.OS === "ios") {
            Toast.show("Please enter a number less than your current weight", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
            });
          } else {
            Toast.show("Please enter a number less than your current weight", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.TOP,
            });
          }
        } else {
          const weightGoal = {
            weight: goalWeight,
            units: dietFactors.currentWeight.units,
          };
          navigationService.navigate("heightInput", {
            selectedTrackers,
            isEditingMacros,
            dietFactors: updateDietFactors(weightGoal),
          });
        }
      } else {
        if (Platform.OS === "ios") {
          Toast.show("Please enter a number", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        } else {
          Toast.show("Please enter a number", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
          });
        }
      }
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

  const updateDietFactors = (userTarget) => {
    const newDietFactors = {
      goal: dietFactors.goal,
      currentWeight: dietFactors.currentWeight,
      targetWeight: userTarget,
      currentHeight: dietFactors.currentHeight,
      birthYear: dietFactors.birthYear,
      activityLevelIndex: dietFactors.activityLevelIndex,
      intensityLevel: dietFactors.intensityLevel,
    };
    setDietFactors(newDietFactors);
    return newDietFactors;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <View style={styles.imageCon}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/diet.png")}
            />
            <Text style={styles.imageText}>diet</Text>
          </View>
          <Text style={styles.title}>How much would you like to weigh?</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="number-pad"
            onChangeText={setGoalWeight}
            value={goalWeight}
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
  input: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
    height: 80,
    borderRadius: 30,
    marginTop: 10,
    textAlign: "center",
    fontSize: 26,
    marginBottom: 25,
    fontFamily: ValueSheet.fonts.primaryFont,
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

export default TargetWeight;
