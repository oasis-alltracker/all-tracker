import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Header } from "../../components";
import navigationService from "../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";

const ExplainSubscription = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Header showCenter={false} />
      <Text style={styles.subtitle}>1 month free then $2.99/month</Text>
      <View style={styles.middleContainer}>
        <Image
          source={require("../../assets/images/poster.png")}
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
          <Text style={[styles.bold, { color: "#B981E7" }]}>oasis</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigationService.navigate("habits");
        }}
        style={styles.nextButton}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExplainSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#25436B",
    fontSize: 24,
    marginTop: 7,
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
    borderColor: "#ACC5CC",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#D7F6FF",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#25436B",
    fontSize: 25,
  },
  middleContainer: {
    flex: 1,
    paddingVertical: 15,
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
  },
  bold: {
    fontFamily: "Sego-Bold",
  },
});
