import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import MenuIcon from "../../assets/icons/menu";
import Main from "./Main";
import Statistics from "./Statistics";
import Diet from "./Diet";
import Fitness from "./Fitness";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";
import { getAccessToken } from "../../user/keychain";
import moment from "moment";
import Toast from "react-native-root-toast";

import FoodEntriesMacrosAPI from "../../api/diet/foodEntriesMacrosAPI";
import FoodEntriesAPI from "../../api/diet/foodEntriesAPI";
import DietGoalsAPI from "../../api/diet/dietGoalsAPI";
import UserAPI from "../../api/user/userAPI";
import { sharedStyles } from "../styles";
import SelectMealModal from "./modals/SelectMealModal";
import { ValueSheet } from "../../ValueSheet";

const FitnessDiet = ({ navigation, route }) => {
  var { refreshGoals } = route.params?.isEditingGoals || false;
  var { foodEntriesChanged } = route.params?.foodItemsChanged || false;
  var refreshMeal = route.params?.refreshMeal || null;
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [day, setDay] = useState(new Date());
  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const [routes, setRoutes] = useState([{ key: "first", title: "First" }]);
  const [dots, setDots] = useState([]);

  const defaultMacros = {
    calorieCount: 0,
    carbCount: 0,
    fatCount: 0,
    proteinCount: 0,
    entries: [],
  };

  const [breakfast, setBreakfast] = useState(defaultMacros);
  const [lunch, setLunch] = useState(defaultMacros);
  const [dinner, setDinner] = useState(defaultMacros);
  const [snack, setSnack] = useState(defaultMacros);

  const mealSetters = {
    breakfast: setBreakfast,
    lunch: setLunch,
    dinner: setDinner,
    snacks: setSnack,
  };
  const mealMacros = {
    Breakfast: breakfast,
    Lunch: lunch,
    Dinner: dinner,
    Snacks: snack,
  };

  const [dietGoals, setDietGoals] = useState({
    calorieGoal: { units: "kcal", value: 2000 },
    carbGoal: 200,
    fatGoal: 67,
    proteinGoal: 150,
  });

  const [dietModalVisible, setDietVisible] = useState(false);

  var totalMacros = {
    calorieCount: Math.round(
      breakfast.calorieCount +
        lunch.calorieCount +
        dinner.calorieCount +
        snack.calorieCount
    ),
    carbCount: Math.round(
      breakfast.carbCount + lunch.carbCount + dinner.carbCount + snack.carbCount
    ),
    fatCount: Math.round(
      breakfast.fatCount + lunch.fatCount + dinner.fatCount + snack.fatCount
    ),
    proteinCount: Math.round(
      breakfast.proteinCount +
        lunch.proteinCount +
        dinner.proteinCount +
        snack.proteinCount
    ),
  };

  const updateDate = (dateChange) => {
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
    refreshMeals(newDate);
  };

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      token = await getAccessToken();
      const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
        .trackingPreferences;

      await Promise.all(getAllMeals(token), getGoals(token));

      setTrackingPreferences(trackingPreferencesLoaded);

      var routesPreference = routes;

      if (trackingPreferencesLoaded.dietSelected) {
        routesPreference.push({ key: "second", title: "Second" });
      }
      if (trackingPreferencesLoaded.fitnessSelected) {
        routesPreference.push({ key: "third", title: "Third" });
      }
      routesPreference.push({ key: "fourth", title: "Fourth" });

      setRoutes(routesPreference);

      var numDots = [0, 1];
      for (var i = 2; i < routesPreference.length; i++) {
        numDots.push(i);
      }
      setDots(numDots);
    };

    const getDataOnLoad = async () => {
      token = await getAccessToken();
    };

    if (!isPageLoaded) {
      setIsPageLoaded(true);
      getPreferencesOnLoad();
      getDataOnLoad();
    }
  }, []);

  useEffect(() => {
    refreshGoals = route.params?.isEditingGoals;
    foodEntriesChanged = route.params?.foodItemsChanged;
    if (refreshGoals) {
      getGoals();
    }

    if (refreshMeal != null) {
      getMeal(refreshMeal);
    }
    if (foodEntriesChanged) {
      refreshMeals();
    }
  }, [route]);

  function errorResponse(error) {
    console.log(error);
    setIsLoading(false);
    if (Platform.OS === "ios") {
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    } else {
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  }

  const getAllMeals = async (token) => {
    try {
      setIsLoading(true);
      meals = await FoodEntriesMacrosAPI.getFoodMacrosForDay(
        token,
        moment(day).format("YYYYMMDD")
      );
      for (const key in meals) {
        mealSetters[key](meals[key]);
      }
      setIsLoading(false);
      return meals;
    } catch (e) {
      errorResponse(e);
    }
  };

  const getMeal = async (meal) => {
    try {
      setIsLoading(true);

      token = await getAccessToken();
      result = await FoodEntriesMacrosAPI.getFoodMacrosForMeal(
        token,
        moment(day).format("YYYYMMDD"),
        meal
      );

      if (meal in result) {
        mealSetters[meal](result[meal]);
      } else {
        mealSetters[meal](defaultMacros);
      }
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const refreshMeals = async (date = false) => {
    try {
      setIsLoading(true);
      if (!date) {
        date = day;
      }
      token = await getAccessToken();
      meals = await FoodEntriesMacrosAPI.getFoodMacrosForDay(
        token,
        moment(date).format("YYYYMMDD")
      );
      for (key in mealSetters) {
        if (key in meals) {
          mealSetters[key](meals[key]);
        } else {
          mealSetters[key](defaultMacros);
        }
      }

      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const getGoals = async () => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      goals = await DietGoalsAPI.getDietGoals(token);

      if (goals != null) {
        setDietGoals(goals);
      }

      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const updateGoals = async (newGoals) => {
    try {
      setIsLoading(true);
      const token = await getAccessToken();
      await DietGoalsAPI.updateDietGoals(token, newGoals);
      await getGoals();
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const addFoodEntry = async (foodEntry) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await FoodEntriesAPI.createFoodEntry(token, foodEntry);
      await getMeal(foodEntry["meal"]);
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const deleteFoodEntry = async (foodEntry) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      try {
        await FoodEntriesAPI.deleteFoodEntry(token, foodEntry.SK);
      } catch (error) {
        console.error("Error deleting food entry: " + error);
        throw new error();
      }
      meals = await getAllMeals(token);
      setIsLoading(false);
      return meals[foodEntry.meal];
    } catch (e) {
      errorResponse(e);
    }
  };

  const updateFoodEntry = async (foodEntryID, foodEntry) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await FoodEntriesAPI.updateFoodEntry(token, foodEntryID, foodEntry);
      await getMeal(foodEntry["meal"]);
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <Main
            day={day}
            trackingPreferences={trackingPreferences}
            updateDate={updateDate}
            meals={mealMacros}
            totalMacros={totalMacros}
            dietGoals={dietGoals}
            isLoading={isLoading}
            setDietModalVisible={setDietVisible}
          />
        );
      case "second":
        return (
          <Diet
            trackingPreferences={trackingPreferences}
            day={day}
            updateDate={updateDate}
            meals={mealMacros}
            mealSetters={mealSetters}
            totalMacros={totalMacros}
            dietGoals={dietGoals}
            updateGoals={updateGoals}
          />
        );
      case "third":
        return <Fitness />;
      case "fourth":
        return <Statistics />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.openDrawer()}
        >
          <MenuIcon />
        </TouchableOpacity>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width }}
          renderTabBar={() => null}
          lazy
        />
        <View style={sharedStyles.pagination}>
          {dots.map((val, key) => {
            return (
              <View
                key={key.toString()}
                style={[
                  sharedStyles.dot,
                  key === index && {
                    backgroundColor: ValueSheet.colours.primaryColour,
                    borderColor: ValueSheet.colours.borderNavy,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <SelectMealModal
        isVisible={dietModalVisible}
        setVisible={setDietVisible}
        dayString={day.toISOString()}
        dietUnit={dietGoals.calorieGoal.units}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ValueSheet.colours.background,
    flex: 1,
  },
  headerButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
  },
});

export default FitnessDiet;
