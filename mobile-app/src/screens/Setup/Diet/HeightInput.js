import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../ValueSheet";

const HeightInput = (props) => {
  const { selectedTrackers, isEditingMacros } = props.route.params;
  var dietFactors = props.route.params.dietFactors;
  const [isCm, setIsCm] = useState(true);
  const [height, setHeight] = useState(null);

  const onNext = () => {
    if (height) {
      if (!isNaN(Number(height))) {
        navigationService.navigate("birthYearInput", {
          selectedTrackers,
          isEditingMacros,
          dietFactors,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Please enter a valid number using digits from 0 to 9.",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Please enter a number.",
      });
    }
  };

  const onBack = () => {
    if (dietFactors.goal == "maintain") {
      navigationService.navigate("currentWeight", {
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
  };

  const updateHeight = (newHeight) => {
    setHeight(newHeight);
    dietFactors.currentHeight.height = newHeight;
  };

  useEffect(() => {
    dietFactors = props.route.params.dietFactors;
    setHeight(dietFactors.currentHeight.height);
    if (dietFactors.currentHeight.units === "cm") {
      setIsCm(true);
    } else {
      setIsCm(false);
    }
  }, [props]);

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
            onChangeText={updateHeight}
            value={height}
            keyboardType="number-pad"
          />
          <View style={[styles.buttons, styles.unitButtons]}>
            <Button
              textStyle={styles.unitText}
              onPress={() => {
                setIsCm(true);
                dietFactors.currentHeight.units = "cm";
              }}
              style={[styles.unitBtn, !isCm && styles.inactive]}
            >
              cm
            </Button>
            <Button
              textStyle={styles.unitText}
              onPress={() => {
                setIsCm(false);
                dietFactors.currentHeight.units = "in";
              }}
              style={[styles.unitBtn, isCm && styles.inactive]}
            >
              in
            </Button>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button onPress={() => onBack()} style={[styles.button, styles.back]}>
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
    borderColor: ValueSheet.colours.grey,
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
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
  inactive: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
  },
  unitText: {
    fontSize: 18,
  },
});

export default HeightInput;
