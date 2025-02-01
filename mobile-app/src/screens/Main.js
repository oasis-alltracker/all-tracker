import React, { useState, useEffect, useRef } from "react";
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

const Drawer = createDrawerNavigator();

const Main = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState([]);
  const statsRef = useRef(null);

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
            color: "rgba(255, 207, 245, 0.65)",
            border: "#f5c4ea",
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
            color: "rgba(213, 203, 255, 0.65)",
            border: "rgba(213, 203, 255, 0.9)",
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
            color: "rgba(255, 233, 167, 0.75)",
            border: "#f5de93",
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
    <View style={styles.container}>
      <MainHeader
        leftComponent={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
        }
      />
      <>
        <View
          style={{
            paddingTop: 100,
            justifyContent: "center",
            height: height * 0.6,
          }}
        >
          {buttons.map((item, index) => (
            <Button
              onPress={item.onPress}
              style={[
                styles.button,
                { backgroundColor: item.color, borderColor: item.border },
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
          style={[styles.downImageContainer, { marginTop: height * 0.058 }]}
          onPress={() => {
            statsRef.current.open({});
          }}
        >
          <Image
            style={styles.downImage}
            source={require("../assets/images/down-arrow.png")}
          />
        </TouchableOpacity>
      </>
      <Stats getRef={(ref) => (statsRef.current = ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  },
  errorToast: { textColor: "#fff" },
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
    </Drawer.Navigator>
  );
};

export default MainDrawer;
