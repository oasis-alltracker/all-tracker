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

const BirthYearInput = (props) => {
  const { selectedTrackers, isEditingMacros } = props.route.params;
  var dietFactors = props.route.params.dietFactors;
  const [birthYear, setBirthYear] = useState(null);

  const onNext = () => {
    if (birthYear) {
      if (!isNaN(Number(birthYear)) && birthYear.length == 4) {
        navigationService.navigate("activityLevelSelection", {
          selectedTrackers,
          isEditingMacros,
          dietFactors,
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Invalid input",
          text2: "Please enter a valid 4 digit birth year.",
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
    navigationService.navigate("heightInput", {
      selectedTrackers,
      isEditingMacros,
      dietFactors,
    });
  };

  const updateBirthYear = (year) => {
    setBirthYear(year);
    dietFactors.birthYear = year;
  };

  useEffect(() => {
    dietFactors = props.route.params.dietFactors;
    setBirthYear(dietFactors.birthYear);
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
          <Text style={styles.title}>What year were you born?</Text>
          <TextInput
            style={styles.input}
            placeholder={"0"}
            onChangeText={updateBirthYear}
            value={birthYear}
            keyboardType="number-pad"
          />
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
    marginBottom: 20,
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
});

export default BirthYearInput;
