import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-toast-message";
import navigationService from "../../../navigators/navigationService";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const GoalSelection = (props) => {
  const theme = useContext(ThemeContext).value;
  const { selectedTrackers, isEditingMacros } = props.route.params;

  const defaultDietFactors = {
    goal: "none",
    currentWeight: { weight: 0, units: "kg" },
    targetWeight: { weight: 0, units: "kg" },
    currentHeight: { height: 0, units: "cm" },
    birthYear: 0,
    activityLevelIndex: null,
    intensityLevel: null,
    weeklyWeightChange: 0,
  };
  const [goal, setGoal] = useState("none");
  var dietFactors = props.route.params?.dietFactors || defaultDietFactors;

  const onNext = () => {
    if (goal != "none") {
      dietFactors.goal = goal;
      navigationService.navigate("currentWeight", {
        selectedTrackers,
        isEditingMacros,
        dietFactors,
      });
    } else {
      Toast.show({
        type: "info",
        text1: "No selection made",
        text2: "Please make a selection before proceeding.",
      });
    }
  };

  useEffect(() => {
    var latestDietFactors = props.route.params?.dietFactors;
    if (latestDietFactors) {
      dietFactors = latestDietFactors;
    } else {
      dietFactors = defaultDietFactors;
    }
    setGoal(dietFactors.goal);
  }, [props]);

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <View style={styles.center}>
        <View
          style={[styles.imageCon, sharedStyles["purpleContainer_" + theme]]}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/diet.png")}
          />
          <Text style={[styles.imageText, sharedStyles["textColour_light"]]}>
            diet
          </Text>
        </View>
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          What is your goal?
        </Text>
        <Button
          style={styles.bigButtons}
          textStyle={styles.buttonsText}
          positiveSelect={"lose" === goal}
          onPress={() => {
            setGoal("lose");
          }}
        >
          Lose weight
        </Button>
        <Button
          style={styles.bigButtons}
          textStyle={styles.buttonsText}
          positiveSelect={"maintain" === goal}
          onPress={() => {
            setGoal("maintain");
          }}
        >
          Maintain weight
        </Button>
        <Button
          style={styles.bigButtons}
          onPress={() => {
            setGoal("gain");
          }}
          positiveSelect={"gain" === goal}
          textStyle={styles.buttonsText}
        >
          Gain weight
        </Button>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={styles.button}
        >
          Back
        </Button>
        <Button
          onPress={() => {
            onNext();
          }}
          style={styles.button}
          positiveSelect={true}
        >
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
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
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
  bigButtons: {
    width: "100%",
    height: 80,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonsText: {
    fontSize: 22,
  },
  center: {
    alignItems: "center",
  },
});

export default GoalSelection;
