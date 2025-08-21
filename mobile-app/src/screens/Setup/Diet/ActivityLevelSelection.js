import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const ActivityLevelSelection = (props) => {
  const theme = useContext(ThemeContext).value;
  const { selectedTrackers, isEditingMacros } = props.route.params;
  var dietFactors = props.route.params.dietFactors;
  const [activityLevel, setActivityLevel] = useState(null);

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
        text1: "No selection made",
        text2: "Please make a selection before proceeding.",
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
          {" "}
          How active are you?
        </Text>
        <Button
          style={[styles.bigButtons]}
          textStyle={styles.buttonsText}
          positiveSelect={activityLevel == 0}
          onPress={() => {
            setActivityLevel(0);
            dietFactors.activityLevelIndex = 0;
          }}
        >
          Not very active
        </Button>
        <Button
          style={[styles.bigButtons]}
          textStyle={styles.buttonsText}
          positiveSelect={activityLevel == 1}
          onPress={() => {
            setActivityLevel(1);
            dietFactors.activityLevelIndex = 1;
          }}
        >
          Moderately active
        </Button>
        <Button
          style={[styles.bigButtons]}
          textStyle={styles.buttonsText}
          positiveSelect={activityLevel == 2}
          onPress={() => {
            setActivityLevel(2);
            dietFactors.activityLevelIndex = 2;
          }}
        >
          Active
        </Button>
        <Button
          style={[styles.bigButtons]}
          textStyle={styles.buttonsText}
          positiveSelect={activityLevel == 3}
          onPress={() => {
            setActivityLevel(3);
            dietFactors.activityLevelIndex = 3;
          }}
        >
          Very active
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
  },
  buttonsText: {
    fontSize: 20,
  },
  center: {
    alignItems: "center",
  },
});

export default ActivityLevelSelection;
