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
import Toast from "react-native-toast-message";
import navigationService from "../../../navigators/navigationService";
import { ValueSheet } from "../../../ValueSheet";

const TargetWeight = (props) => {
  const { selectedTrackers, isEditingMacros } = props.route.params;
  var dietFactors = props.route.params.dietFactors;
  const [goalWeight, setGoalWeight] = useState(null);

  const onNext = () => {
    if (goalWeight) {
      if (!isNaN(Number(goalWeight))) {
        if (
          dietFactors.goal == "gain" &&
          Number(goalWeight) <= Number(dietFactors.currentWeight.weight)
        ) {
          Toast.show({
            type: "info",
            text1: "Invalid input",
            text2: "Enter a number greater than your current weight.",
          });
        } else if (
          dietFactors.goal == "lose" &&
          Number(goalWeight) >= Number(dietFactors.currentWeight.weight)
        ) {
          Toast.show({
            type: "info",
            text1: "Invalid input",
            text2: "Enter a number less than your current weight.",
          });
        } else {
          navigationService.navigate("heightInput", {
            selectedTrackers,
            isEditingMacros,
            dietFactors,
          });
        }
      } else {
        Toast.show({
          type: "info",
          text1: "Invalid input",
          text2: "Please enter a valid number using digits from 0 to 9.",
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Incomplete field",
        text2: "Please enter a number.",
      });
    }
  };

  const onBack = () => {
    navigationService.navigate("currentWeight", {
      selectedTrackers,
      isEditingMacros,
      dietFactors,
    });
  };

  const updateWeight = (newWeight) => {
    setGoalWeight(newWeight);
    dietFactors.targetWeight.weight = newWeight;
    dietFactors.targetWeight.units = dietFactors.currentWeight.units;
  };

  useEffect(() => {
    dietFactors = props.route.params.dietFactors;
    setGoalWeight(dietFactors.targetWeight.weight);
  }, [props]);

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
            onChangeText={updateWeight}
            value={goalWeight}
          />
        </View>
        <View style={styles.buttons}>
          <Button onPress={() => onBack()} style={[styles.button, styles.back]}>
            Back
          </Button>
          <Button onPress={() => onNext()} style={styles.button}>
            Next
          </Button>
        </View>
        <Toast position="bottom" bottomOffset={140} visibilityTime={2500} />
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
});

export default TargetWeight;
