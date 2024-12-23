import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Header } from "../../components";

const Contact = () => {
  return (
    <>
      <View style={styles.container}>
        <Header showCenter={false} />
        <Text style={styles.title}>Contact</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>If you would like to contact us,</Text>
        <Text style={styles.text}>please DM on instagram</Text>
        <Text style={styles.texBold}>@oasis.journal.app</Text>
      </View>
    </>
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
  text: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sego",
    color: "#25436B",
    marginTop: 10,
  },
  texBold: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
});

export default Contact;
