import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Header } from "../../components";
import DietGoalsAPI from "../../api/diet/dietGoalsAPI";
import { getAccessToken } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import UpdateMacrosModal from "../Setup/Diet/UpdateMacrosModal";

const Goals = () => {
  const [datas, setDatas] = useState([
    {
      title: "0 g",
      img: require("../../assets/images/carbs.png"),
      text: "Carbs:",
    },
    {
      title: "0 g",
      img: require("../../assets/images/protein.png"),
      text: "Protein:",
    },
    {
      title: "0 g",
      img: require("../../assets/images/fats.png"),
      text: "Fats:",
    },
  ]);
  const [calorieGoalValue, setCalorieGoalValue] = useState(0);
  const [calories, setCalories] = useState(0);
  const [calorieUnit, setCalorieUnit] = useState("kcal");
  const [carbGoalValue, setCarbGoalValue] = useState(0);
  const [proteinGoalValue, setProteinGoalValue] = useState(0);
  const [fatGoalValue, setFatGoalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const getDataOnLoad = async () => {
      setIsLoading(true);
      const token = await getAccessToken();
      const dietGoals = await DietGoalsAPI.getDietGoals(token);

      setCalorieGoalValue(dietGoals.calorieGoal);
      setCalorieUnit(dietGoals.calorieGoal.units);
      setCalories(dietGoals.calorieGoal.value);
      setCarbGoalValue(dietGoals.carbGoal);
      setProteinGoalValue(dietGoals.proteinGoal);
      setFatGoalValue(dietGoals.fatGoal);

      setDatas([
        {
          title: `${Math.round(dietGoals.carbGoal)} g`,
          img: require("../../assets/images/carbs.png"),
          text: "Carbs:",
        },
        {
          title: `${Math.round(dietGoals.proteinGoal)} g`,
          img: require("../../assets/images/protein.png"),
          text: "Protein:",
        },
        {
          title: `${Math.round(dietGoals.fatGoal)} g`,
          img: require("../../assets/images/fats.png"),
          text: "Fats:",
        },
      ]);
      setIsLoading(false);
    };

    getDataOnLoad();
  }, []);

  return (
    <View style={styles.container}>
      <Header showCenter={false} />
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.title}>Goals</Text>
        <View style={styles.macroContainerStyle}>
          <View style={[styles.item, styles.head]}>
            <View style={[styles.item, styles.headItem]}>
              <View style={styles.row}>
                <Image
                  source={require("../../assets/images/calories.png")}
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
                  source={require("../../assets/images/edit.png")}
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
                  source={require("../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <UpdateMacrosModal
        getRef={(ref) => (updateMacrosRef.current = ref)}
        onUpdateMacroValue={onUpdateMacroValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainerStyle: {
    paddingTop: 20,
  },
  macroContainerStyle: {
    paddingTop: 50,
  },
  title: {
    fontFamily: "Sego-Bold",
    fontSize: 36,
    color: "#25436B",
    marginVertical: 25,
    alignSelf: "center",
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
    borderColor: "#CCCCCC",
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
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginLeft: 15,
  },
  calorieTitle: {
    fontFamily: "Sego-Bold",
    color: "#25436B",
    fontSize: 22,
  },
  calorieText: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
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
    fontFamily: "Sego",
    color: "#25436B",
  },
  flex: {
    flex: 1,
    justifyContent: "center",
  },

  minitext: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Goals;
