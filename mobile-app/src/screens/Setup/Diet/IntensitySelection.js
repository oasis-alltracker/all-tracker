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

const IntensitySelection = (props) => {
  const { selectedTrackers, isEditingMacros } = props.route.params;
  const [dietFactors, setDietFactors] = useState(
    props.route.params.dietFactors
  );

  const [ultimateNumberOfWeeks, setUltimateNumberOfWeeks] = useState(0);
  const [steadyNumberOfWeeks, setSteadyNumberOfWeeks] = useState(0);
  const [gradualNumberOfWeeks, setGradualNumberOfWeeks] = useState(0);
  const [relaxedNumberOfWeeks, setRelaxedNumberOfWeeks] = useState(0);
  const [intensity, setIntensity] = useState(null);
  console.log(
    "Diet factors in IntensitySelection:\n" + JSON.stringify(dietFactors)
  );

  const getButtonColour = (selectedIntensity) => {
    if (intensity == selectedIntensity) {
      return ValueSheet.colours.secondaryColour65;
    } else {
      return "transparent";
    }
  };

  const onNext = () => {
    if (intensity) {
      const weightChangePerWeek =
        weightChangeValues[dietFactors.currentWeight.units][intensity];
      navigationService.navigate("newGoalsSummary", {
        selectedTrackers,
        isEditingMacros,
        goal: "maintain",
        weightGoal: 0,
        currentWeight: 0,
        currentHeight: 0,
        birthYear: 0,
        activityLevel: 0,
        weightChangePerWeek,
        dietFactors: updateDietFactors(weightChangePerWeek),
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

  const updateDietFactors = (weightChange) => {
    const newDietFactors = {
      goal: dietFactors.goal,
      currentWeight: dietFactors.currentWeight,
      targetWeight: dietFactors.targetWeight,
      currentHeight: dietFactors.currentHeight,
      birthYear: dietFactors.birthYear,
      activityLevelIndex: dietFactors.activityLevelIndex,
      weeklyWeightChange: weightChange,
    };
    setDietFactors(newDietFactors);
    return newDietFactors;
  };

  useEffect(() => {
    const totalWeightChange = Math.abs(
      dietFactors.currentWeight.weight - dietFactors.targetWeight.weight
    );
    if (dietFactors.currentWeight.units === "kg") {
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
            setIntensity("ultimate");
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
            {dietFactors.currentWeight.units == "kg" ? "1kg" : "2.2lbs"}/week
          </Text>
        </Button>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("steady") },
          ]}
          onPress={() => {
            setIntensity("steady");
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
            {dietFactors.currentWeight.units == "kg" ? "0.75kg" : "1.6lbs"}/week
          </Text>
        </Button>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("gradual") },
          ]}
          onPress={() => {
            setIntensity("gradual");
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
            {dietFactors.currentWeight.units == "kg" ? "0.5kg" : "1.1lbs"}/week
          </Text>
        </Button>
        <Button
          style={[
            styles.bigButtons,
            { backgroundColor: getButtonColour("relaxed") },
          ]}
          onPress={() => {
            setIntensity("relaxed");
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
            {dietFactors.currentWeight.units == "kg" ? "0.25kg" : "0.5lbs"}/week
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
    color: ValueSheet.colours.primaryColour,
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  minitext: {
    fontSize: 16,
    marginTop: 10,
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
});

export default IntensitySelection;
