import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../assets/icons/menu";
import navigationService from "../navigators/navigationService";
import Toast from "react-native-root-toast";

const Drawer = ({ navigation }) => {
  const comingSoon = () => {
    Toast.show("Coming soon!", {
      ...styles.errorToast,
      duration: Toast.durations.SHORT,
    });
  }

  const buttons = [
    {
      image: require("../assets/images/home.png"),
      onPress: () => {
        navigation.navigate("mainscreen");
      },
    },
    {
      image: require("../assets/images/mind-white512.png"),
      onPress: () => {
        navigation.navigate("todos-habits");
      },
    },
    {
      image: require("../assets/images/body-white512.png"),
      onPress: () => {
        comingSoon();
      },
    },
    {
      image: require("../assets/images/soul-white512.png"),
      onPress: () => {
        comingSoon();
      },
    },
    {
      image: require("../assets/images/settings512.png"),
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
        <View
          style={styles.logoContainer}
        >
          <Image
            resizeMode="contain"
            style={styles.logoImage}
            source={require("../assets/images/logo.png")}
          />
        </View>
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
  logoContainer: {
    borderTopWidth: 2,
    borderTopColor: "#CCCCCC",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    tintColor: "#25436B",
  },
  logoImage: {
    width: 120,
    height: 120,
    opacity:0.5
  },
});

export default Drawer;
