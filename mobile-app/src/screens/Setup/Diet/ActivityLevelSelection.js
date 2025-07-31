import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../ValueSheet";

const ActivityLevelSelection = (props) => {
  const { selectedTrackers, isEditingMacros } = props.route.params;
  var dietFactors = props.route.params.dietFactors;
  const [activityLevel, setActivityLevel] = useState(null);

  const getButtonColour = (index) => {
    if (index == activityLevel) {
      return ValueSheet.colours.secondaryColour65;
    } else {
      return "transparent";
    }
  };

  const onNext = () => {
    if (activityLevel != null) {
      if (dietFactors.goal === "maintain") {
        dietFactors.weeklyWeightChange = 0;
        navigationService.navigate("newGoalsSummary", {
          selectedTrackers,
          isEditingMacros,
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
      Toast.show({
        type: "info",
        text1: "Please make a selection.",
      });
    }
  };

  const onBack = () => {
    navigationService.navigate("birthYearInput", {
      selectedTrackers,
      isEditingMacros,
      dietFactors,
    });
  };

  useEffect(() => {
    dietFactors = props.route.params.dietFactors;
    setActivityLevel(dietFactors.activityLevelIndex);
  }, [props]);

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
            setActivityLevel(0);
            dietFactors.activityLevelIndex = 0;
          }}
        >
          Not very active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(1) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setActivityLevel(1);
            dietFactors.activityLevelIndex = 1;
          }}
        >
          Moderately active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(2) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setActivityLevel(2);
            dietFactors.activityLevelIndex = 2;
          }}
        >
          Active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(3) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setActivityLevel(3);
            dietFactors.activityLevelIndex = 3;
          }}
        >
          Very active
        </Button>
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
});

export default ActivityLevelSelection;
