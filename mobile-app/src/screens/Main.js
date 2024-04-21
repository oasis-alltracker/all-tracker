import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import MenuIcon from "../assets/icons/menu";
import { Button, MainHeader } from "../components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import navigationService from "../navigators/navigationService";
import TodosHabits from "./Todos-Habits";
import MoodSleep from "./Mood-Sleep";
import FitnessDiet from "./Fitness-Diet";

import UserAPI from "../api/user/userAPI";
import { getAccessToken } from "../user/keychain";

import DrawerScreen from "./DrawerScreen";

const Drawer = createDrawerNavigator();

const { width, height } = Dimensions.get("window");

const Main = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState([]);

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
            border: "rgba(255, 207, 245, 0.70)",
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
            border: "rgba(213, 203, 255, 0.70)",
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
            border: "rgba(255, 233, 167, 0.80)",
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
            paddingTop: 15,
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
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  button: {
    height: 170,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
  errorToast: {
    textColor: "#25436B",
  },
});

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="mainscreen"
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
    </Drawer.Navigator>
  );
}

export default MainDrawer;
