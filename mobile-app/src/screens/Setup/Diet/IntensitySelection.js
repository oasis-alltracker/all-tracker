import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

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
  const theme = useContext(ThemeContext).value;
  const { selectedTrackers, isEditingMacros } = props.route.params;
  var dietFactors = props.route.params.dietFactors;

  const [ultimateNumberOfWeeks, setUltimateNumberOfWeeks] = useState(0);
  const [steadyNumberOfWeeks, setSteadyNumberOfWeeks] = useState(0);
  const [gradualNumberOfWeeks, setGradualNumberOfWeeks] = useState(0);
  const [relaxedNumberOfWeeks, setRelaxedNumberOfWeeks] = useState(0);
  const [intensity, setIntensity] = useState(null);

  const onNext = () => {
    if (intensity != null) {
      dietFactors.weeklyWeightChange =
        weightChangeValues[dietFactors.currentWeight.units][intensity];
      navigationService.navigate("newGoalsSummary", {
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

  const onBack = () => {
    navigationService.navigate("activityLevelSelection", {
      selectedTrackers,
      isEditingMacros,
      dietFactors,
    });
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

  useEffect(() => {
    dietFactors = props.route.params.dietFactors;
    setIntensity(dietFactors.intensityLevel);
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
          Choose your intensity
        </Text>
        <Button
          style={styles.bigButtons}
          positiveSelect={intensity === "ultimate"}
          onPress={() => {
            setIntensity("ultimate");
            dietFactors.intensityLevel = "ultimate";
          }}
        >
          <View style={styles.row}>
            <Image
              style={[
                styles.selectImage,
                intensity === "ultimate"
                  ? sharedStyles["tint_light"]
                  : sharedStyles["tint_" + theme],
              ]}
              resizeMode="contain"
              source={require("../../../assets/images/ultimate.png")}
            />
            <Text
              style={[
                styles.text,
                styles.flex,
                intensity === "ultimate"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
              ]}
            >
              Ultimate
            </Text>
            <Text
              style={[
                styles.text,
                intensity === "ultimate"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
              ]}
            >
              {ultimateNumberOfWeeks} weeks
            </Text>
          </View>
          <Text
            style={[
              styles.text,
              styles.minitext,
              intensity === "ultimate"
                ? sharedStyles["textColour_light"]
                : sharedStyles["textColour_" + theme],
            ]}
          >
            {dietFactors.currentWeight.units == "kg" ? "1kg" : "2.2lbs"}/week
          </Text>
        </Button>
        <Button
          style={styles.bigButtons}
          positiveSelect={intensity === "steady"}
          onPress={() => {
            setIntensity("steady");
            dietFactors.intensityLevel = "steady";
          }}
        >
          <View style={styles.row}>
            <Image
              style={[
                styles.selectImage,
                intensity === "steady"
                  ? sharedStyles["tint_light"]
                  : sharedStyles["tint_" + theme],
              ]}
              resizeMode="contain"
              source={require("../../../assets/images/steady.png")}
            />
            <Text
              style={[
                styles.text,
                styles.flex,
                intensity === "steady"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
                ,
              ]}
            >
              Steady
            </Text>
            <Text
              style={[
                styles.text,
                intensity === "steady"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
              ]}
            >
              {steadyNumberOfWeeks} weeks
            </Text>
          </View>
          <Text
            style={[
              styles.text,
              styles.minitext,
              intensity === "steady"
                ? sharedStyles["textColour_light"]
                : sharedStyles["textColour_" + theme],
            ]}
          >
            {dietFactors.currentWeight.units == "kg" ? "0.75kg" : "1.6lbs"}/week
          </Text>
        </Button>
        <Button
          style={styles.bigButtons}
          positiveSelect={intensity === "gradual"}
          onPress={() => {
            setIntensity("gradual");
            dietFactors.intensityLevel = "gradual";
          }}
        >
          <View style={styles.row}>
            <Image
              style={[
                styles.selectImage,
                intensity === "gradual"
                  ? sharedStyles["tint_light"]
                  : sharedStyles["tint_" + theme],
              ]}
              resizeMode="contain"
              source={require("../../../assets/images/gradually.png")}
            />
            <Text
              style={[
                styles.text,
                styles.flex,
                intensity === "gradual"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
                ,
              ]}
            >
              Gradual
            </Text>
            <Text
              style={[
                styles.text,
                intensity === "gradual"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
              ]}
            >
              {gradualNumberOfWeeks} weeks
            </Text>
          </View>
          <Text
            style={[
              styles.text,
              styles.minitext,
              intensity === "gradual"
                ? sharedStyles["textColour_light"]
                : sharedStyles["textColour_" + theme],
            ]}
          >
            {dietFactors.currentWeight.units == "kg" ? "0.5kg" : "1.1lbs"}/week
          </Text>
        </Button>
        <Button
          style={styles.bigButtons}
          positiveSelect={intensity === "relaxed"}
          onPress={() => {
            setIntensity("relaxed");
            dietFactors.intensityLevel = "relaxed";
          }}
        >
          <View style={styles.row}>
            <Image
              style={[
                styles.selectImage,
                intensity === "relaxed"
                  ? sharedStyles["tint_light"]
                  : sharedStyles["tint_" + theme],
              ]}
              resizeMode="contain"
              source={require("../../../assets/images/relaxed.png")}
            />
            <Text
              style={[
                styles.text,
                styles.flex,
                intensity === "relaxed"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
              ]}
            >
              Relaxed
            </Text>
            <Text
              style={[
                styles.text,
                intensity === "relaxed"
                  ? sharedStyles["textColour_light"]
                  : sharedStyles["textColour_" + theme],
              ]}
            >
              {relaxedNumberOfWeeks} weeks
            </Text>
          </View>
          <Text
            style={[
              styles.text,
              styles.minitext,
              intensity === "relaxed"
                ? sharedStyles["textColour_light"]
                : sharedStyles["textColour_" + theme],
              ,
            ]}
          >
            {dietFactors.currentWeight.units == "kg" ? "0.25kg" : "0.5lbs"}/week
          </Text>
        </Button>
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => onBack()} style={styles.button}>
          Back
        </Button>
        <Button
          onPress={() => onNext()}
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
    marginTop: 5,
  },
  flex: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  minitext: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default IntensitySelection;
