import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";

const DietStep7 = (props) => {
  const {
    selectedTrackers,
    goal,
    weightGoal,
    currentWeight,
    currentHeight,
    birthYear,
  } = props.route.params;

  const [activityLevel, setActivityLevel] = useState(null);

  const getButtonColour = (index) => {
    if (index == activityLevel) {
      return "rgba(215, 246, 255, 0.65)";
    } else {
      return "transparent";
    }
  };

  const onNext = () => {
    if (activityLevel) {
      if (goal === "maintain") {
        const weightChangePerWeek = 0;
        navigationService.navigate("dietStep9", {
          selectedTrackers,
          goal,
          weightGoal,
          currentWeight,
          currentHeight,
          birthYear,
          activityLevel,
          weightChangePerWeek,
        });
      } else {
        navigationService.navigate("dietStep8", {
          selectedTrackers,
          goal,
          weightGoal,
          currentWeight,
          currentHeight,
          birthYear,
          activityLevel,
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
          }}
        >
          Not very active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(1) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setActivityLevel(1);
          }}
        >
          Moderately active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(2) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setActivityLevel(2);
          }}
        >
          Active
        </Button>
        <Button
          style={[styles.bigButtons, { backgroundColor: getButtonColour(3) }]}
          textStyle={styles.buttonsText}
          onPress={() => {
            setActivityLevel(3);
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
  },
  buttonsText: {
    fontSize: 20,
  },
  center: {
    alignItems: "center",
  },
  errorToast: {
    textColor: "#25436B",
  },
});

export default DietStep7;
