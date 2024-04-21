import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Header, Button } from "../../components";
import navigationService from "../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "react-native-loading-spinner-overlay";

const ExplainSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async () => {
    setIsLoading(true);
    setIsLoading(false);
    await navigationService.reset("main", 0);
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <Header showCenter={false} />
      <Text style={styles.title}>
        1 month <Text style={styles.bold}>free</Text>
      </Text>
      <Text style={styles.title}>then $2.99/month</Text>
      <View style={styles.middleContainer}>
        <Image
          source={require("../../assets/images/subscription-image.png")}
          style={styles.poster}
        />
        <Text style={styles.text}>
          Find <Text style={styles.bold}>equilibrium</Text>
        </Text>
        <Text style={styles.text}>
          Discover <Text style={styles.bold}>balance</Text>
        </Text>
        <Text style={styles.text}>
          Unleash your{" "}
          <Text style={[styles.bold, { color: "#B981E7" }]}>Oasis</Text>
        </Text>
      </View>
      <Button onPress={() => subscribe()} style={styles.nextButton}>
        Continue
      </Button>
    </SafeAreaView>
  );
};

export default ExplainSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subtitle: {
    color: "#25436B",
    fontSize: 24,
    fontFamily: "Sego-Bold",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 15,
  },
  nextButton: {
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#25436B",
    fontSize: 25,
  },
  middleContainer: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "center",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    resizeMode: "contain",
    backgroundColor: "rgba(255, 232, 163, 0.4)",
    height: 350,
    marginBottom: 10,
  },
  text: {
    fontFamily: "Sego",
    fontSize: 24,
    color: "#25436B",
    marginTop: 2,
    textAlign: "center",
  },
  title: {
    color: "#25436B",
    fontFamily: "Sego",
    fontSize: 32,
    marginTop: 7,
    textAlign: "center",
  },
  bold: {
    fontFamily: "Sego-Bold",
  },
});
