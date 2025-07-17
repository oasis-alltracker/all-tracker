import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Spinner from "react-native-loading-spinner-overlay";
import UpdateMacrosModal from "./UpdateMacrosModal";
import DietGoalsAPI from "../../../api/diet/dietGoalsAPI";
import { getAccessToken } from "../../../user/keychain";
import { ValueSheet } from "../../../ValueSheet";

const activityLevelValues = {
  0: 1.2,
  1: 1.375,
  2: 1.55,
  3: 1.725,
};

const DietStep9 = (props) => {
  const {
    selectedTrackers,
    isEditingMacros,
    goal,
    weightGoal,
    currentWeight,
    currentHeight,
    birthYear,
    activityLevel,
    weightChangePerWeek,
  } = props.route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [calories, setCalories] = useState(0);
  const [calorieGoalValue, setCalorieGoalValue] = useState(0);
  const [carbGoalValue, setCarbGoalValue] = useState(0);
  const [proteinGoalValue, setProteinGoalValue] = useState(0);
  const [fatGoalValue, setFatGoalValue] = useState(0);
  const [calorieUnit, setCalorieUnit] = useState("kcal");
  const [datas, setDatas] = useState([
    {
      title: "0 g",
      img: require("../../../assets/images/carbs.png"),
      text: "Carbs:",
    },
    {
      title: "0 g",
      img: require("../../../assets/images/protein.png"),
      text: "Protein:",
    },
    {
      title: "0 g",
      img: require("../../../assets/images/fats.png"),
      text: "Fats:",
    },
  ]);

  const updateMacrosRef = useRef(null);

  const onUpdateMacroValue = async (title, value, units) => {
    var newCalories = calorieGoalValue;
    var newFats = fatGoalValue;
    var newProteins = proteinGoalValue;
    var newCarbs = carbGoalValue;
    if (title === "Calories") {
      setCalories(value);
      setCalorieUnit(units);
      newCalories = { value: value, units: units };
      setCalorieGoalValue(newCalories);
    } else {
      let newDatas = datas.map((item) => {
        if (item.text === title) {
          if (title === "Carbs:") {
            newCarbs = value;
            setCarbGoalValue(value);
          }
          if (title === "Protein:") {
            newProteins = value;
            setProteinGoalValue(value);
          }
          if (title === "Fats:") {
            newFats = value;
            setFatGoalValue(value);
          }
          return {
            ...item,
            title: value + " " + units,
          };
        }
        return item;
      });
      setDatas(newDatas);
      const token = await getAccessToken();
      DietGoalsAPI.updateDietGoals(token, {
        carbGoal: newCarbs,
        proteinGoal: newProteins,
        fatGoal: newFats,
        calorieGoal: newCalories,
      });
    }
  };

  const updateGoals = async () => {
    const token = await getAccessToken();
    DietGoalsAPI.updateDietGoals(token, {
      carbGoal: carbGoalValue,
      proteinGoal: proteinGoalValue,
      fatGoal: fatGoalValue,
      calorieGoal: {
        value: calorieGoalValue,
        units: calorieUnit,
      },
    });
  };

  const onNext = async () => {
    updateGoals();
    if (isEditingMacros) {
      navigationService.navigate("fitness-diet", {
        isEditingGoals: isEditingMacros,
      });
    } else {
      navigationService.navigate("dietStep10", {
        selectedTrackers,
      });
    }
  };

  useEffect(() => {
    const getDataOnLoad = async () => {
      setIsLoading(true);
      var weightInKg;
      var goalWeightInLb;
      if (currentWeight.units === "kg") {
        weightInKg = currentWeight.weight;
        goalWeightInLb = weightGoal.weight * 2.20462;
      } else {
        weightInKg = (currentWeight.weight * 1.0) / 2.20462;
        goalWeightInLb = weightGoal.weight;
      }
      var heightInCm;
      if (currentHeight.units === "cm") {
        heightInCm = currentHeight.height;
      } else {
        heightInCm = (currentHeight.height * 1.0) / 0.393701;
      }
      var currentYear = new Date().getFullYear();
      const BMR =
        10 * weightInKg + 6.25 * heightInCm - 5 * (currentYear - birthYear);
      const TDEE = BMR * activityLevelValues[activityLevel];
      const dailyCaloriesDefecit = (weightChangePerWeek * 3500) / 7;
      var dailyCalorieIntake = TDEE;
      if (goal === "lose") {
        dailyCalorieIntake -= dailyCaloriesDefecit;
      } else if (goal === "gain") {
        dailyCalorieIntake += dailyCaloriesDefecit;
      }
      const protein = goalWeightInLb * 0.8;
      const fat = (dailyCalorieIntake * 0.25) / 9;
      const carbs = (dailyCalorieIntake - protein * 4 - fat * 9) / 4;
      setCalories(Math.round(dailyCalorieIntake));
      setDatas([
        {
          title: `${Math.round(carbs)} g`,
          img: require("../../../assets/images/carbs.png"),
          text: "Carbs:",
        },
        {
          title: `${Math.round(protein)} g`,
          img: require("../../../assets/images/protein.png"),
          text: "Protein:",
        },
        {
          title: `${Math.round(fat)} g`,
          img: require("../../../assets/images/fats.png"),
          text: "Fats:",
        },
      ]);
      setCalorieGoalValue(Math.round(dailyCalorieIntake));
      setCarbGoalValue(Math.round(carbs));
      setProteinGoalValue(Math.round(protein));
      setFatGoalValue(Math.round(fat));
      setIsLoading(false);
    };

    getDataOnLoad();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <>
        <View style={styles.center}>
          <View style={styles.imageCon}>
            <Image
              style={styles.image}
              source={require("../../../assets/images/diet.png")}
            />
            <Text style={styles.imageText}>diet</Text>
          </View>
          <Text style={styles.title}>Recommended intake:</Text>
          <View style={styles.contentContainerStyle}>
            <View style={[styles.item, styles.head]}>
              <View style={[styles.item, styles.headItem]}>
                <View style={styles.row}>
                  <Image
                    source={require("../../../assets/images/calories.png")}
                    style={styles.calorieItemImg}
                  />
                  <Text style={styles.calorieText}>Calories</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    updateMacrosRef.current.open({
                      title: "Calories",
                      isCal: true,
                      units: calorieUnit,
                      value: calories,
                    });
                  }}
                >
                  <Image
                    style={styles.calorieEditImg}
                    source={require("../../../assets/images/edit.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.calorieTitle}>
                {calories} {calorieUnit}
              </Text>
            </View>
            {datas.map((item, index) => (
              <View style={styles.item} key={index}>
                <View style={styles.row}>
                  <Image source={item.img} style={styles.itemImg} />
                  <Text style={styles.text}>{item.text}</Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    updateMacrosRef.current.open({
                      title: item.text,
                      isCal: false,
                      units: "g",
                      value: item.title,
                    });
                  }}
                >
                  <Image
                    style={styles.editImg}
                    source={require("../../../assets/images/edit.png")}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => navigationService.goBack()}
            style={[styles.button, styles.back]}
          >
            Back
          </Button>
          <Button onPress={() => onNext()} style={styles.button}>
            {isEditingMacros ? "Save" : "Next"}
          </Button>
        </View>
      </>
      <UpdateMacrosModal
        getRef={(ref) => (updateMacrosRef.current = ref)}
        onUpdateMacroValue={onUpdateMacroValue}
      />
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
  center: {
    alignItems: "center",
  },
  head: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  headItem: {
    borderWidth: 0,
    padding: 0,
    width: "100%",
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  item: {
    borderWidth: 1,
    borderColor: ValueSheet.colours.grey,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
    marginLeft: 15,
  },
  calorieTitle: {
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
    fontSize: 22,
  },
  calorieText: {
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  calorieEditImg: {
    width: 30,
    height: 30,
  },
  calorieItemImg: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  itemImg: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  editImg: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
});

export default DietStep9;
