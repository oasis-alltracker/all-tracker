import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../assets/icons/menu";
import navigationService from "../navigators/navigationService";
import { getAccessToken } from "../user/keychain";
import UserAPI from "../api/user/userAPI";

const DrawerScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState([])

  useEffect(() => {
    const getPreferencesOnLoad = async() =>{
      if(isLoading){
        setIsLoading(false)
        token = await getAccessToken()
        user = await UserAPI.getUser(token)

        buttonPreference = [ {
          image: require("../assets/images/home.png"),
          onPress: () => {
            navigation.navigate("mainscreen");
          },
        }]

        if(user.data.trackingPreferences.habitsSelected || user.data.trackingPreferences.toDosSelected){
          buttonPreference.push(          
            {
              image: require("../assets/images/mind-white512.png"),
              onPress: () => {
                navigation.navigate("todos-habits");
              },
            })
        }
        if(user.data.trackingPreferences.dietSelected || user.data.trackingPreferences.fitnessSelected){
          buttonPreference.push(          
            {
              image: require("../assets/images/body-white512.png"),
              onPress: () => {
                comingSoon();
              },
            })
        }
        if(user.data.trackingPreferences.moodSelected || user.data.trackingPreferences.sleepSelected){
          buttonPreference.push(          
            {
              image: require("../assets/images/soul-white512.png"),
              onPress: () => {
                comingSoon();
              },
            })
        }
        buttonPreference.push(          
          {
            image: require("../assets/images/settings512.png"),
            onPress: () => {
              navigationService.navigate("settings");
            },
          })

        setButtons(buttonPreference)
      }    
    }
    getPreferencesOnLoad()
  }, []);

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

export default DrawerScreen;
