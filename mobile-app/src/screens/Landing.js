import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import navigationService from "../navigators/navigationService";

const Landing = () => {
  const { width, height } = useWindowDimensions();
  const [viewportWidth, setViewPortWidth] = useState(
    width < height ? width : height
  );

  useEffect(() => {
    setViewPortWidth(width < height ? width : height);
  }, [width, height]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={[styles.logo, { height: 0.38 * height }]}
        source={require("../assets/images/landing-logo.png")}
        resizeMode="contain"
      />
      <Image
        style={[styles.image, { height: 0.42 * height }]}
        source={require("../assets/images/landing-image.png")}
        resizeMode="contain"
      />

      <View style={styles.logContainer}>
        <TouchableOpacity
          style={[
            styles.btnContainer,
            {
              width: viewportWidth - viewportWidth * 0.1,
              height: height * 0.065,
            },
          ]}
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
    backgroundColor: "#fffdf8",
    paddingTop: 5,
  },
  logo: {
    width: "100%",
  },
  image: {
    width: "100%",
    paddingBottom: 0,
  },
  buttonText: {
    color: "#B981E7",
    fontSize: 35,
  },
  logContainer: {
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
  },
  btnContainer: {
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#c2f0fc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7F6FF",
  },
  btnText: {
    color: "#B981E7",
    fontFamily: "Sego",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 35,
  },
});

export default Landing;
