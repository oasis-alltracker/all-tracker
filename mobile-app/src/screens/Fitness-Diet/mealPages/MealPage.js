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
import Toast from "react-native-toast-message";
import AddEntryModal from "../modals/AddEntryModal";
import { ValueSheet } from "../../../ValueSheet";

const MealPage = ({ navigation, route }) => {
  const { dateString, mealName, meal } = route.params;
  const [currentMeal, setCurrentMeal] = useState(meal);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const foodEntriesChangedRef = useRef(false);
  const editEntryRef = useRef(null);
  var refreshMeal = route.params?.refreshMeal || null;
  const dietUnit = route.params?.dietUnit;
  const energyMultiplier = dietUnit == "kcal" ? 1 : 4.184;

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
      meal: JSON.parse(JSON.stringify(currentMeal)),
      dietUnit: dietUnit,
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

  const sub2Decimals = (num1, num2) => {
    return Math.round(num1 * 100 - num2 * 100) / 100;
  };

  const deleteFoodEntry = async (foodEntry) => {
    try {
      setIsLoading(true);
      var updatedMeal = JSON.parse(JSON.stringify(currentMeal));
      updatedMeal.entries = updatedMeal.entries.filter(
        (item) => item.SK !== foodEntry.SK
      );

      updatedMeal.calorieCount = sub2Decimals(
        updatedMeal.calorieCount,
        foodEntry.calorieCount
      );
      updatedMeal.carbCount = sub2Decimals(
        updatedMeal.carbCount,
        foodEntry.carbCount
      );
      updatedMeal.proteinCount = sub2Decimals(
        updatedMeal.proteinCount,
        foodEntry.proteinCount
      );
      updatedMeal.fatCount = sub2Decimals(
        updatedMeal.fatCount,
        foodEntry.fatCount
      );

      token = await getAccessToken();
      await FoodEntriesAPI.deleteFoodEntry(token, foodEntry.SK);

      setCurrentMeal(updatedMeal);
      foodEntriesChangedRef.current = true;
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Toast.show({
        type: "info",
        text1: "Failed to delete food entry",
        text2: "Please try again.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <TouchableOpacity
          onPress={() => {
            var params = {};

            if (refreshMeal != null) {
              params["refreshMeal"] = refreshMeal;
            } else {
              params["foodItemsChanged"] = foodEntriesChangedRef.current;
            }
            navigationService.navigate("fitness-diet", params);
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
              <TouchableOpacity
                key={index}
                style={styles.mealItem}
                onPress={() => {
                  editEntryRef.current.open(item, dietUnit);
                }}
              >
                <View style={[styles.mealItemInfo, { flex: 1 }]}>
                  <Text style={[styles.textStyle, { flexShrink: 1 }]}>
                    {item.name}
                  </Text>
                  <Text style={styles.mealItemCalories}>
                    {+(item.calorieCount * energyMultiplier).toFixed(2)}{" "}
                    {dietUnit}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteMealItem(item)}>
                  <Image
                    style={styles.deleteIcon}
                    source={require("../../../assets/images/trash.png")}
                  ></Image>
                </TouchableOpacity>
              </TouchableOpacity>
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
                  {+(currentMeal.calorieCount * energyMultiplier).toFixed(2)}
                </Text>
                <Text style={styles.caloriesUnit}>{dietUnit}</Text>
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
        <AddEntryModal
          getRef={(ref) => (editEntryRef.current = ref)}
          mealName={mealName}
          day={currentDate}
          prevPage={null}
          meal={currentMeal}
          editing={true}
          foodEntriesChangedRef={foodEntriesChangedRef}
          setMeal={setCurrentMeal}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
    justifyContent: "space-between",
  },
  scrollContainer: {
    overflow: "visible",
    paddingBottom: 30,
  },
  topArea: {
    backgroundColor: ValueSheet.colours.secondaryColour,
    flex: 1,
  },
  mainArea: {
    backgroundColor: ValueSheet.colours.background,
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
    borderColor: ValueSheet.colours.borderGrey75,
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
    backgroundColor: ValueSheet.colours.secondaryColour,
    borderColor: ValueSheet.colours.borderGrey75,
    width: "60%",
    paddingTop: 5,
    paddingBottom: 10,
  },
  calories: {
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
    borderColor: ValueSheet.colours.borderGrey75,
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
    borderColor: ValueSheet.colours.borderGrey75,
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
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    textAlign: "center",
  },
  textStyle: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 20,
    color: ValueSheet.colours.primaryColour,
  },
  macroAmount: {
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 20,
    position: "absolute",
    right: 0,
    marginRight: 35,
    color: ValueSheet.colours.primaryColour,
  },
  macroUnit: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 20,
    position: "absolute",
    right: 0,
    marginRight: 15,
    color: ValueSheet.colours.primaryColour,
  },
  caloriesLabel: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 20,
    color: ValueSheet.colours.primaryColour,
  },
  calorieInfo: {
    flexDirection: "row",
    paddingBottom: 2.5,
  },
  caloriesAmount: {
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 25,
    color: ValueSheet.colours.primaryColour,
  },
  addFoodText: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 25,
    color: ValueSheet.colours.primaryColour,
  },
  mealItemCalories: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 17.5,
    color: ValueSheet.colours.primaryColour,
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
});

export default MealPage;
