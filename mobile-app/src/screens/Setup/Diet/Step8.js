import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import { ValueSheet } from "../../../ValueSheet";

const weightChangeValues = {
  kg: {
    ultimate: 1.0,
    steady: 0.75,
    gradual: 0.5,
    relaxed: 0.25,
  },
  lb: {
    ultimate: 2.20462,
    steady: 1.65348,
    gradual: 1.10231,
    relaxed: 0.551,
  },
};

const DietStep8 = (props) => {
  const {
    selectedTrackers,
    isEditingMacros,
    goal,
    weightGoal,
    currentWeight,
    currentHeight,
    birthYear,
    activityLevel,
  } = props.route.params;

  const [ultimateNumberOfWeeks, setUltimateNumberOfWeeks] = useState(0);
  const [steadyNumberOfWeeks, setSteadyNumberOfWeeks] = useState(0);
  const [gradualNumberOfWeeks, setGradualNumberOfWeeks] = useState(0);
  const [relaxedNumberOfWeeks, setRelaxedNumberOfWeeks] = useState(0);

  const [intensity, setIntesity] = useState(null);

  const getButtonColour = (selectedIntensity) => {
    if (intensity == selectedIntensity) {
      return "rgba(215, 246, 255, 0.65)";
    } else {
      return "transparent";
    }
  };

  const onNext = () => {
    if (intensity) {
      const weightChangePerWeek =
        weightChangeValues[currentWeight.units][intensity];
      navigationService.navigate("dietStep9", {
        selectedTrackers,
        isEditingMacros,
        goal,
        weightGoal,
        currentWeight,
        currentHeight,
        birthYear,
        activityLevel,
        weightChangePerWeek,
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

  useEffect(() => {
    const totalWeightChange = Math.abs(
      currentWeight.weight - weightGoal.weight
    );
    if (currentWeight.units === "kg") {
      setUltimateNumberOfWeeks(Math.round((totalWeightChange * 1.0) / 1));
      setSteadyNumberOfWeeks(Math.round((totalWeightChange * 1.0) / 0.75));
      setGradualNumberOfWeeks(Math.round((totalWeightChange * 1.0) / 0.5));
      setRelaxedNumberOfWeeks(Math.round((totalWeightChange * 1.0) / 0.25));
    } else {
      setUltimateNumberOfWeeks(Math.round(totalWeightChange / 2.20462));
      setSteadyNumberOfWeeks(Math.round(totalWeightChange / 1.65348));
      setGradualNumberOfWeeks(Math.round(totalWeightChange / 1.10231));
      setRelaxedNumberOfWeeks(Math.round(totalWeightChange / 0.551));
    }
  }, []);

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
        <Text style={styles.title}>Choose your intensity</Text>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("ultimate") },
          ]}
          onPress={() => {
            setIntesity("ultimate");
          }}
        >
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/ultimate.png")}
            />
            <Text style={[styles.text, styles.flex]}>Ultimate</Text>
            <Text style={styles.text}>{ultimateNumberOfWeeks} weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>
            {currentWeight.units == "kg" ? "1kg" : "2.2lbs"}/week
          </Text>
        </Button>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("steady") },
          ]}
          onPress={() => {
            setIntesity("steady");
          }}
        >
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/steady.png")}
            />
            <Text style={[styles.text, styles.flex]}>Steady</Text>
            <Text style={styles.text}>{steadyNumberOfWeeks} weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>
            {currentWeight.units == "kg" ? "0.75kg" : "1.6lbs"}/week
          </Text>
        </Button>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("gradual") },
          ]}
          onPress={() => {
            setIntesity("gradual");
          }}
        >
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/gradually.png")}
            />
            <Text style={[styles.text, styles.flex]}>Gradual</Text>
            <Text style={styles.text}>{gradualNumberOfWeeks} weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>
            {currentWeight.units == "kg" ? "0.5kg" : "1.1lbs"}/week
          </Text>
        </Button>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("relaxed") },
          ]}
          onPress={() => {
            setIntesity("relaxed");
          }}
        >
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/relaxed.png")}
            />
            <Text style={[styles.text, styles.flex]}>Relaxed</Text>
            <Text style={styles.text}>{relaxedNumberOfWeeks} weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>
            {currentWeight.units == "kg" ? "0.25kg" : "0.5lbs"}/week
          </Text>
        </Button>
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
    height: 65,
    borderRadius: 30,
    paddingHorizontal: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  center: {
    alignItems: "center",
  },
  selectImage: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex: {
    flex: 1,
  },
  text: {
    color: "#25436B",
    fontSize: 16,
    fontFamily: "Sego",
  },
  minitext: {
    fontSize: 16,
    marginTop: 10,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});

export default DietStep8;
