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

const DietStep6 = (props) => {
  const { selectedTrackers, goal, weightGoal, currentWeight } =
    props.route.params;
  const [isCm, setIsCm] = useState(true);
  const [height, setHeight] = useState(null);

  const onNext = () => {
    if (height) {
      if (!isNaN(Number(height))) {
        const currentHeight = { height: height, units: isCm ? "cm" : "in" };

        navigationService.navigate("dietStep5", {
          selectedTrackers,
          goal,
          weightGoal,
          currentWeight,
          currentHeight,
        });
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
          <Text style={styles.title}>How tall are you?</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            onChangeText={setHeight}
            value={height}
            keyboardType="number-pad"
          />
          <View style={[styles.buttons, styles.kgButtons]}>
            <Button
              textStyle={styles.kgText}
              onPress={() => setIsCm(true)}
              style={[styles.kgBtn, !isCm && styles.inactive]}
            >
              cm
            </Button>
            <Button
              textStyle={styles.kgText}
              onPress={() => setIsCm(false)}
              style={[styles.kgBtn, isCm && styles.inactive]}
            >
              in
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
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});

export default DietStep6;
