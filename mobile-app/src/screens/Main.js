import { ValueSheet } from "../ValueSheet";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import MenuIcon from "../assets/icons/menu";
import { Button, MainHeader } from "../components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import navigationService from "../navigators/navigationService";
import SleepQuestionnaire from "./Mood-Sleep/questionnaires/sleepNavigator";
import MoodQuestionnaire from "./Mood-Sleep/questionnaires/moodNavigator";
import TodosHabits from "./Todos-Habits";
import MoodSleep from "./Mood-Sleep";
import FitnessDiet from "./Fitness-Diet";
import moment from "moment";

import UserAPI from "../api/user/userAPI";
import { getAccessToken } from "../user/keychain";

import DrawerScreen from "./DrawerScreen";
import Stats from "./Stats/Stats";
import MealPage from "./Fitness-Diet/mealPages/MealPage";
import SearchFood from "./Fitness-Diet/mealPages/SearchFood";
import SetupNavigator from "./Setup/navigator";
import BarcodeCamera from "./Fitness-Diet/mealPages/BarcodeCamera";
import BarcodeScanner from "./Fitness-Diet/mealPages/BarcodeScanner";
import { sharedStyles } from "./styles";
import { ThemeContext } from "../contexts/ThemeProvider";

const Drawer = createDrawerNavigator();

const Main = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState([]);
  const statsRef = useRef(null);
  const theme = useContext(ThemeContext).value;

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      if (isLoading) {
        setIsLoading(false);
        token = await getAccessToken();
        user = await UserAPI.getUser(token);

        buttonPreference = [];

        if (
          user.data.trackingPreferences.habitsSelected ||
          user.data.trackingPreferences.toDosSelected
        ) {
          buttonPreference.push({
            image: require("../assets/images/mind-white512.png"),
            color: "pink",
            onPress: () => {
              navigationService.reset("todos-habits", 0);
            },
          });
        }
        if (
          user.data.trackingPreferences.dietSelected ||
          user.data.trackingPreferences.fitnessSelected
        ) {
          buttonPreference.push({
            image: require("../assets/images/body-white.png"),
            color: "purple",
            onPress: () => {
              navigationService.reset("fitness-diet", 0);
            },
          });
        }
        if (
          user.data.trackingPreferences.moodSelected ||
          user.data.trackingPreferences.sleepSelected
        ) {
          buttonPreference.push({
            image: require("../assets/images/soul-white.png"),
            color: "yellow",
            onPress: () => {
              navigationService.reset("mood-sleep", 0);
            },
          });
        }

        setButtons(buttonPreference);
      }
    };
    getPreferencesOnLoad();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <MainHeader
        leftComponent={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
        }
        showCenter={false}
      />
      <>
        <View
          style={{
            paddingTop: height * 0.15,
            justifyContent: "center",
            height: height * 0.6,
          }}
        >
          {buttons.map((item, index) => (
            <Button
              onPress={item.onPress}
              style={[
                styles.button,
                sharedStyles[item.color + "Container_" + theme],
              ]}
              key={index}
            >
              <Image
                resizeMode="contain"
                style={styles.image}
                source={item.image}
              />
            </Button>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.downImageContainer, { marginTop: height * 0.1 }]}
          onPress={() => {
            statsRef.current.open({});
          }}
        >
          <Image
            style={[styles.downImage, sharedStyles["tint_" + theme]]}
            source={require("../assets/images/down-arrow.png")}
          />
        </TouchableOpacity>
      </>
      <Stats getRef={(ref) => (statsRef.current = ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 160,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  image: {
    width: 125,
    height: 125,
  },
  downImage: {
    width: 75,
    height: 75,
  },
  downImageContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    opacity: 0.9,
  },
});

const MainDrawer = ({ navigation, initialMainRoute }) => {
  useEffect(() => {
    if (initialMainRoute !== "mainscreen") {
      if (initialMainRoute === "sleepTest" || initialMainRoute === "moodTest") {
        const today = new Date();
        navigation.navigate("main", {
          screen: initialMainRoute,
          params: {
            dateString: today.toDateString(),
            dateStamp: moment(today).format("YYYYMMDD"),
          },
        });
      }
    } else {
      navigation.navigate("main", { screen: initialMainRoute });
    }
  }, [initialMainRoute]);

  return (
    <Drawer.Navigator
      initialRouteName={initialMainRoute}
      drawerContent={DrawerScreen}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: { width: 210 },
      }}
    >
      <Drawer.Screen name="mainscreen" component={Main} />
      <Drawer.Screen name="todos-habits" component={TodosHabits} />
      <Drawer.Screen name="mood-sleep" component={MoodSleep} />
      <Drawer.Screen name="fitness-diet" component={FitnessDiet} />
      <Drawer.Screen name="sleepTest" component={SleepQuestionnaire} />
      <Drawer.Screen name="moodTest" component={MoodQuestionnaire} />
      <Drawer.Screen name="mealPage" component={MealPage} />
      <Drawer.Screen name="searchFood" component={SearchFood} />
      <Drawer.Screen name="cameraPage" component={BarcodeCamera} />
      <Drawer.Screen name="barcodeScanner" component={BarcodeScanner} />
      <Drawer.Screen name="setup" component={SetupNavigator} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
