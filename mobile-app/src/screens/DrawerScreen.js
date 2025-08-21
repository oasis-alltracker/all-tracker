import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../assets/icons/menu";
import navigationService from "../navigators/navigationService";
import { getAccessToken } from "../user/keychain";
import UserAPI from "../api/user/userAPI";
import { ValueSheet } from "../ValueSheet";
import { ThemeContext } from "../contexts/ThemeProvider";
import { sharedStyles } from "./styles";
import { SharedObject } from "expo";

const DrawerScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState([]);
  const theme = useContext(ThemeContext).value;

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      if (isLoading) {
        setIsLoading(false);
        token = await getAccessToken();
        user = await UserAPI.getUser(token);

        buttonPreference = [
          {
            image: require("../assets/images/home.png"),
            onPress: () => {
              navigation.navigate("mainscreen");
            },
          },
        ];

        if (
          user.data.trackingPreferences.habitsSelected ||
          user.data.trackingPreferences.toDosSelected
        ) {
          buttonPreference.push({
            image: require("../assets/images/mind-white512.png"),
            onPress: () => {
              navigation.navigate("todos-habits");
            },
          });
        }
        if (
          user.data.trackingPreferences.dietSelected ||
          user.data.trackingPreferences.fitnessSelected
        ) {
          buttonPreference.push({
            image: require("../assets/images/body-white512.png"),
            onPress: () => {
              navigation.navigate("fitness-diet");
            },
          });
        }
        if (
          user.data.trackingPreferences.moodSelected ||
          user.data.trackingPreferences.sleepSelected
        ) {
          buttonPreference.push({
            image: require("../assets/images/soul-white512.png"),
            onPress: () => {
              navigation.navigate("mood-sleep");
            },
          });
        }
        buttonPreference.push({
          image: require("../assets/images/settings512.png"),
          onPress: () => {
            navigationService.navigate("settings");
          },
        });

        setButtons(buttonPreference);
      }
    };
    getPreferencesOnLoad();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigation.closeDrawer()}
      >
        <MenuIcon />
      </TouchableOpacity>
      {buttons.map((item, index) => (
        <TouchableOpacity
          onPress={item.onPress}
          style={[styles.button, styles["line_" + theme]]}
          key={index}
        >
          <Image
            resizeMode="contain"
            style={[styles.image, sharedStyles["tint_" + theme]]}
            source={item.image}
          />
        </TouchableOpacity>
      ))}
      <View style={[styles.logoContainer, styles["line_" + theme]]}>
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
    flex: 1,
  },
  menuBtn: {
    marginLeft: 20,
    marginVertical: 30,
  },
  line_dark: {
    borderTopColor: ValueSheet.colours.dark.borderGrey,
  },
  line_light: {
    borderTopColor: ValueSheet.colours.light.grey,
  },
  button: {
    borderTopWidth: 2,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    borderTopWidth: 2,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
  logoImage: {
    width: 120,
    height: 120,
    opacity: 0.38,
  },
});

export default DrawerScreen;
