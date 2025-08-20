import React, { useState, useEffect, useContext } from "react";
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
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const CurrentWeight = (props) => {
  const theme = useContext(ThemeContext).value;
  const { selectedTrackers, isEditingMacros } = props.route.params;
  var dietFactors = props.route.params.dietFactors;
  const [isKg, setIsKg] = useState(true);
  const [weight, setWeight] = useState(null);

  const onNext = () => {
    if (weight) {
      if (!isNaN(Number(weight))) {
        if (dietFactors.goal == "maintain") {
          dietFactors.targetWeight = { ...dietFactors.currentWeight };
          navigationService.navigate("heightInput", {
            selectedTrackers,
            isEditingMacros,
            dietFactors,
          });
        } else {
          navigationService.navigate("targetWeight", {
            selectedTrackers,
            isEditingMacros,
            dietFactors,
          });
        }
      } else {
        Toast.show({
          type: "info",
          text1: "Invalid input",
          text2: "Please enter a valid number using digits from 0 to 9.",
        });
      }
    } else {
      Toast.show({
        type: "info",
        text1: "Incomplete field",
        text2: "Please enter a number.",
      });
    }
  };

  const onBack = () => {
    navigationService.navigate("goalSelection", {
      selectedTrackers,
      isEditingMacros,
      dietFactors,
    });
  };

  const updateWeight = (newWeight) => {
    setWeight(newWeight);
    dietFactors.currentWeight.weight = newWeight;
  };

  useEffect(() => {
    dietFactors = props.route.params.dietFactors;
    setWeight(dietFactors.currentWeight.weight);
    if (dietFactors.currentWeight.units === "kg") {
      setIsKg(true);
    } else {
      setIsKg(false);
    }
  }, [props]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            What's your weight?
          </Text>
          <TextInput
            placeholderTextColor={ValueSheet.colours[theme].inputGrey}
            style={[
              styles.input,
              sharedStyles["borderedContainer_" + theme],
              sharedStyles["textColour_" + theme],
            ]}
            placeholder="0"
            onChangeText={updateWeight}
            keyboardType="number-pad"
            value={weight}
          />
          <View style={[styles.buttons, styles.unitButtons]}>
            <Button
              textStyle={styles.unitText}
              onPress={() => {
                setIsKg(true);
                dietFactors.currentWeight.units = "kg";
              }}
              style={styles.unitBtn}
              positiveSelect={isKg}
            >
              kg
            </Button>
            <Button
              textStyle={styles.unitText}
              onPress={() => {
                setIsKg(false);
                dietFactors.currentWeight.units = "lb";
              }}
              style={styles.unitBtn}
              positiveSelect={!isKg}
            >
              lb
            </Button>
          </View>
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
    </TouchableWithoutFeedback>
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
  input: {
    width: "100%",
    borderWidth: 2,
    height: 80,
    borderRadius: 30,
    marginTop: 10,
    textAlign: "center",
    fontSize: 26,
    marginBottom: 25,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  center: {
    alignItems: "center",
  },
  unitButtons: {
    width: 170,
    marginBottom: 20,
  },
  unitBtn: {
    width: 80,
    height: 35,
    borderRadius: 12,
  },
  unitText: {
    fontSize: 18,
  },
});

export default CurrentWeight;
