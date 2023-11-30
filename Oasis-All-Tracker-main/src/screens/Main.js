import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import MenuIcon from "../assets/icons/menu";
import { Button, Header } from "../components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerScreen from "./Drawer";
import navigationService from "../navigators/navigationService";
import TodosHabits from "./Todos-Habits";
import MoodSleep from "./Mood-Sleep";
import FitnessDiet from "./Fitness-Diet";

const Drawer = createDrawerNavigator();

const Main = ({ navigation }) => {
  const buttons = [
    {
      image: require("../assets/images/creative-mind.png"),
      color: "rgba(255, 207, 245, 0.65)",
      border: "rgba(255, 207, 245, 0.70)",
      onPress: () => {
        navigationService.navigate("todos-habits");
      },
    },
    {
      image: require("../assets/images/fitness-diet.png"),
      color: "rgba(213, 203, 255, 0.65)",
      border: "rgba(213, 203, 255, 0.70)",
      onPress: () => {
        navigationService.navigate("fitness-diet");
      },
    },
    {
      image: require("../assets/images/mood-sleep.png"),
      color: "rgba(255, 233, 167, 0.75)",
      border: "rgba(255, 233, 167, 0.80)",
      onPress: () => {
        navigationService.navigate("mood-sleep");
      },
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  button: {
    height: 180,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
});

function MainDrawer() {
  return (
    <Drawer.Navigator
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
