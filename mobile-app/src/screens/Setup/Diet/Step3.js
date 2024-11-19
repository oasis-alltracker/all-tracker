import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";

const DietStep3 = (props) => {
  const { selectedTrackers, goal } = props.route.params;
  const [isKg, setIsKg] = useState(true);
  const [weight, setWeight] = useState(null);

  const onNext = () => {
    if (weight) {
      if (!isNaN(Number(weight))) {
        const currentWeight = { weight: weight, units: isKg ? "kg" : "lb" };
        if (goal == "maintain") {
          const weightGoal = currentWeight;
          navigationService.navigate("dietStep6", {
            selectedTrackers,
            goal,
            weightGoal,
            currentWeight,
          });
        } else {
          navigationService.navigate("dietStep2", {
            selectedTrackers,
            goal,
            currentWeight,
          });
        }
      } else {
        Toast.show("Please enter a number", {
          ...styles.errorToast,
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    } else {
      Toast.show("Please make a selection", {
        ...styles.errorToast,
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
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
          <Text style={styles.title}>What's your weight?</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            onChangeText={setWeight}
            keyboardType="number-pad"
            value={weight}
          />
          <View style={[styles.buttons, styles.kgButtons]}>
            <Button
              textStyle={styles.kgText}
              onPress={() => setIsKg(true)}
              style={[styles.kgBtn, !isKg && styles.inactive]}
            >
              kg
            </Button>
            <Button
              textStyle={styles.kgText}
              onPress={() => setIsKg(false)}
              style={[styles.kgBtn, isKg && styles.inactive]}
            >
              lb
            </Button>
          </View>
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
    marginBottom: 65,
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
  errorToast: { textColor: "#fff" },
});

export default DietStep3;
