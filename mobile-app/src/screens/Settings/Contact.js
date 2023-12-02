import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Header } from "../../components";

const Contact = () => {
  return (
    <View style={styles.container}>
      <Header showCenter={false} />
      <Text style={styles.title}>Contact</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginTop: 50,
  },
});

export default Contact;
