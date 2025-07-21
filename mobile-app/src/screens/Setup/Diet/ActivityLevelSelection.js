import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import { ValueSheet } from "../../../ValueSheet";

const ActivityLevelSelection = (props) => {
  const { selectedTrackers, isEditingMacros } = props.route.params;
  const [dietFactors, setDietFactors] = useState(
    props.route.params.dietFactors
  );

  const getButtonColour = (index) => {
    if (index == dietFactors.activityLevelIndex) {
      return ValueSheet.colours.secondaryColour65;
    } else {
      return "transparent";
    }
  };

  const onNext = () => {
    if (dietFactors.activityLevelIndex != null) {
      if (dietFactors.goal === "maintain") {
        const weightChangePerWeek = 0;
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
          dietFactors,
        });
      } else {
        navigationService.navigate("intensitySelection", {
          selectedTrackers,
          isEditingMacros,
          dietFactors,
        });
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

  const updateDietFactors = (activityIndex) => {
    const newDietFactors = {
      goal: dietFactors.goal,
      currentWeight: dietFactors.currentWeight,
      targetWeight: dietFactors.targetWeight,
      currentHeight: dietFactors.currentHeight,
      birthYear: dietFactors.birthYear,
      activityLevelIndex: activityIndex,
      intensityLevel: dietFactors.intensityLevel,
    };
    setDietFactors(newDietFactors);
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
        <Text style={styles.title}> How active are you?</Text>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(0) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            updateDietFactors(0);
          }}
        >
          Not very active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(1) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            updateDietFactors(1);
          }}
        >
          Moderately active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(2) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            updateDietFactors(2);
          }}
        >
          Active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(3) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            updateDietFactors(3);
          }}
        >
          Very active
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
  },
  buttonsText: {
    fontSize: 20,
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

export default ActivityLevelSelection;
