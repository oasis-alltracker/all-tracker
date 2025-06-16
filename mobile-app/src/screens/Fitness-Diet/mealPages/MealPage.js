import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import navigationService from "../../../navigators/navigationService";
import FoodEntriesAPI from "../../../api/diet/foodEntriesAPI";
import { getAccessToken } from "../../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";

const MealPage = ({ navigation, route }) => {
  const { dateString, mealName, meal } = route.params;
  const [currentMeal, setCurrentMeal] = useState(meal);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const foodEntriesChangedRef = useRef(false);

  var mealImage;
  if (mealName === "Breakfast") {
    mealImage = require("../../../assets/images/breakfast.png");
  } else if (mealName === "Lunch") {
    mealImage = require("../../../assets/images/lunch.png");
  } else if (mealName === "Dinner") {
    mealImage = require("../../../assets/images/dinner.png");
  } else if (mealName === "Snacks") {
    mealImage = require("../../../assets/images/snack.png");
  }

  useEffect(() => {
    setCurrentMeal(meal);
    extractDate();
  }, [meal, dateString]);

  useFocusEffect(
    React.useCallback(() => {
      foodEntriesChangedRef.current = false;
    }, [])
  );

  const extractDate = () => {
    //format of the prop dateString is given as YYYY-MM-DD
    //Date can take in a year, month and day as constructor arguments - but month index ranges from 0 (Jan) to 11 (Dec)
    var year = dateString.substring(0, 4);
    var month = dateString.substring(5, 7);
    var day = dateString.substring(8);
    setCurrentDate(
      new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    );
  };

  const addMealItem = () => {
    navigationService.navigate("searchFood", {
      mealName: mealName,
      dayString: currentDate.toISOString(),
      prevPage: "mealPage",
    });
  };

  const deleteMealItem = async (mealItem) => {
    Alert.alert(
      "Delete Meal Item",
      "Are you sure you want to delete this meal item?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          isPreferred: true,
          onPress: async () => {
            await deleteFoodEntry(mealItem);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const deleteFoodEntry = async (foodEntry) => {
    try {
      setIsLoading(true);
      var updatedMeal = JSON.parse(JSON.stringify(currentMeal));
      updatedMeal.entries = updatedMeal.entries.filter(
        (item) => item.SK !== foodEntry.SK
      );

      token = await getAccessToken();
      await FoodEntriesAPI.deleteFoodEntry(token, foodEntry.SK);

      setCurrentMeal(updatedMeal);
      foodEntriesChangedRef.current = true;
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate("fitness-diet", {
              foodItemsChanged: foodEntriesChangedRef.current,
            });
          }}
        >
          <Image
            style={styles.backArrow}
            source={require("../../../assets/images/back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.topAreaBody}>
          <View style={styles.mealHeader}>
            <Image style={styles.mealIcon} source={mealImage}></Image>
            <Text style={styles.title}>{mealName}</Text>
          </View>
          <Text style={styles.textStyle}>
            {currentDate.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.mainArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.mealItemSection}>
            {currentMeal.entries.map((item, index) => (
              <View key={index} style={styles.mealItem}>
                <View style={styles.mealItemInfo}>
                  <Text style={styles.textStyle}>{item.name}</Text>
                  <Text style={styles.mealItemCalories}>
                    {item.calorieCount} cal
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteMealItem(item)}>
                  <Image
                    style={styles.deleteIcon}
                    source={require("../../../assets/images/trash.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.addFood} onPress={addMealItem}>
              <Text style={styles.addFoodText}>Add Food</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.calories}>
            <Image
              style={styles.mealIcon}
              source={require("../../../assets/images/calories.png")}
            ></Image>
            <View style={styles.calorieText}>
              <Text style={styles.caloriesLabel}>Calories</Text>
              <View style={styles.calorieInfo}>
                <Text style={styles.caloriesAmount}>
                  {currentMeal.calorieCount}
                </Text>
                <Text style={styles.caloriesUnit}>kcal</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.macroSection}>
            <TouchableOpacity style={styles.macros}>
              <Image
                style={styles.macroIcon}
                source={require("../../../assets/images/carbs.png")}
              ></Image>
              <Text style={styles.textStyle}>Carbs</Text>
              <Text style={styles.macroAmount}>{currentMeal.carbCount}</Text>
              <Text style={styles.macroUnit}>g</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macros}>
              <Image
                style={styles.macroIcon}
                source={require("../../../assets/images/protein.png")}
              ></Image>
              <Text style={styles.textStyle}>Protein</Text>
              <Text style={styles.macroAmount}>{currentMeal.proteinCount}</Text>
              <Text style={styles.macroUnit}>g</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.macros}>
              <Image
                style={styles.macroIcon}
                source={require("../../../assets/images/fats.png")}
              ></Image>
              <Text style={styles.textStyle}>Fats</Text>
              <Text style={styles.macroAmount}>{currentMeal.fatCount}</Text>
              <Text style={styles.macroUnit}>g</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  scrollContainer: {
    overflow: "visible",
    paddingBottom: 30,
  },
  topArea: {
    backgroundColor: "#D7F6FF",
    flex: 1,
  },
  mainArea: {
    backgroundColor: "#fff",
    flex: 3,
    minWidth: 0,
    justifyContent: "flex-start",
    padding: 20,
  },
  mealItemSection: {
    justifyContent: "space-between",
    marginTop: 20,
  },
  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    padding: 10,
    marginBottom: 5,
  },
  mealItemInfo: {
    justifyContent: "space-between",
  },
  buttonSection: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  addFood: {
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: "#D7F6FF",
    borderColor: "rgba(172, 197, 204, 0.75)",
    width: "60%",
    padding: 5,
  },
  calories: {
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 100,
    padding: 10,
  },
  macros: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    marginBottom: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    padding: 10,
  },
  topAreaBody: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 30,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  macroSection: {
    marginTop: 30,
  },
  calorieText: {
    alignItems: "center",
    width: "75%",
  },
  title: {
    fontSize: 45,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    textAlign: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
  },
  macroAmount: {
    fontSize: 20,
    fontFamily: "Sego-Bold",
    position: "absolute",
    right: 0,
    marginRight: 35,
    color: "#25436B",
  },
  macroUnit: {
    fontSize: 20,
    fontFamily: "Sego",
    position: "absolute",
    right: 0,
    marginRight: 15,
    color: "#25436B",
  },
  caloriesLabel: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
  },
  calorieInfo: {
    flexDirection: "row",
  },
  caloriesAmount: {
    fontSize: 25,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginRight: 15,
  },
  caloriesUnit: {
    fontSize: 25,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
  addFoodText: {
    fontSize: 25,
    fontFamily: "Sego",
    color: "#25436B",
  },
  mealItemCalories: {
    fontSize: 17.5,
    fontFamily: "Sego",
    color: "#25436B",
  },
  backArrow: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  mealIcon: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  macroIcon: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  deleteIcon: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});

export default MealPage;
