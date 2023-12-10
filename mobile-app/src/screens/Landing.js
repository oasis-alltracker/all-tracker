import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import navigationService from "../navigators/navigationService";

const { width, height } = Dimensions.get("window");
const viewportWidth = width < height ? width : height;

const Landing = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/landing-logo.png")}
        resizeMode="contain"
      />
      <Image
        style={styles.image}
        source={require("../assets/images/landing-image.png")}
        resizeMode="contain"
      />

      <View style={styles.logContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigationService.navigate("auth")}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 5,
  },
  logo: {
    width: "100%",
    height: 0.4 * height,
  },
  image: {
    width: "100%",
    height: 0.44 * height,
    paddingBottom: 0,
  },
  buttonText: {
    color: "#B981E7",
    fontSize: 35,
  },
  logContainer: {
    paddingTop: 0,
    alignItems: "center",
    paddingBottom: 0,
  },
  btnContainer: {
    borderRadius: 60,
    width: viewportWidth - 25,
    height: 60,
    borderWidth: 2,
    borderColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D7F6FF",
  },
  btnText: {
    color: "#B981E7",
    fontFamily: "Sego",
    fontSize: 35,
  },
});

export default Landing;
