import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../assets/icons/menu";
import navigationService from "../navigators/navigationService";

const Drawer = ({ navigation }) => {
  const buttons = [
    {
      image: require("../assets/images/home.png"),
      onPress: () => {
        navigation.navigate("mainscreen");
      },
    },
    {
      image: require("../assets/images/creative-mind.png"),
      onPress: () => {
        navigation.navigate("todos-habits");
      },
    },
    {
      image: require("../assets/images/fitness-diet.png"),
      onPress: () => {
        navigation.navigate("fitness-diet");
      },
    },
    {
      image: require("../assets/images/mood-sleep.png"),
      onPress: () => {
        navigation.navigate("mood-sleep");
      },
    },
    {
      image: require("../assets/images/settings.png"),
      onPress: () => {
        navigationService.navigate("settings");
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigation.closeDrawer()}
      >
        <MenuIcon />
      </TouchableOpacity>
      {buttons.map((item, index) => (
        <TouchableOpacity
          onPress={item.onPress}
          style={styles.button}
          key={index}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={item.image}
          />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  menuBtn: {
    marginLeft: 20,
    marginVertical: 30,
  },
  button: {
    borderTopWidth: 2,
    borderTopColor: "#CCCCCC",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    tintColor: "#25436B",
  },
});

export default Drawer;
