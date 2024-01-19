import { Text, StyleSheet } from "react-native";
import React from "react";
import { Header } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsOfService = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header showCenter={false} />
      <Text style={styles.text}>Terms of Service</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    alignSelf: "center",
    fontSize: 24,
    fontFamily: "Sego",
    color: "#25436B",
    marginTop: 50,
  },
});

export default TermsOfService;