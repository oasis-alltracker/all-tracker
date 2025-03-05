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

const DietStep2 = (props) => {
  const { selectedTrackers, goal, currentWeight } = props.route.params;
  const [goalWeight, setGoalWeight] = useState(null);

  const onNext = () => {
    if (goalWeight) {
      if (!isNaN(Number(goalWeight))) {
        if (goal == "gain" && goalWeight <= currentWeight.weight) {
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
        } else if (goal == "lose" && goalWeight >= currentWeight.weight) {
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
          const weightGoal = { weight: goalWeight, units: currentWeight.units };
          navigationService.navigate("dietStep6", {
            selectedTrackers,
            goal,
            currentWeight,
            weightGoal,
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
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(202, 189, 255, 0.65)",
    borderWidth: 2,
    borderColor: "rgba(162, 151, 204, 0.7)",
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
    fontSize: 28,
    color: "#25436B",
    fontFamily: "Sego-Bold",
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
    borderColor: "#CCCCCC",
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#CCCCCC",
    height: 80,
    borderRadius: 30,
    marginTop: 10,
    textAlign: "center",
    fontSize: 26,
    marginBottom: 25,
    fontFamily: "Sego",
  },
  center: {
    alignItems: "center",
  },
  kgButtons: {
    width: 170,
    marginBottom: 20,
  },
  kgBtn: {
    width: 80,
    height: 35,
    borderRadius: 12,
  },
  inactive: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  kgText: {
    fontSize: 18,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});

export default DietStep2;
