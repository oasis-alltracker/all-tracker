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
import { isAccountCreated } from "../user/keychain";
import { ValueSheet } from "../ValueSheet";

const Landing = () => {
  const { width, height } = useWindowDimensions();
  const [viewportWidth, setViewPortWidth] = useState(
    width < height ? width : height
  );

  useEffect(() => {
    setViewPortWidth(width < height ? width : height);
  }, [width, height]);

  const onPressGetStarted = async () => {
    const accountCreated = await isAccountCreated();
    if (accountCreated) {
      navigationService.navigate("unlockAccount");
    } else {
      navigationService.navigate("createAccountLock");
    }
  };

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
              height: height * 0.08,
            },
          ]}
          onPress={() => onPressGetStarted()}
        >
          <Text style={[styles.btnText, { fontSize: height * 0.044 }]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
    paddingTop: 5,
  },
  logo: {
    width: "100%",
  },
  image: {
    width: "100%",
    paddingBottom: 0,
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
    backgroundColor: ValueSheet.colours.secondaryColour,
  },
  btnText: {
    color: "#B981E7",
    fontFamily: ValueSheet.fonts.primaryFont,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Landing;
