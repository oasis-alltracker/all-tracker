import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components";
import navigationService from "../navigators/navigationService";

const Landing = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/images/landing-logo.png")}
        />
        <Image
          style={styles.image}
          source={require("../assets/images/artwork.png")}
        />
      </View>
      <Button
        onPress={() => navigationService.navigate("auth")}
        textStyle={styles.buttonText}
      >
        Get Started
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  buttonText: {
    color: "#B981E7",
    fontSize: 24,
  },
});

export default Landing;
