import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <Text style={styles.title}>
      Banking <Text style={styles.light}>App</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#1C1B20",
    fontSize: 24,
    fontFamily: "Sego-Bold",
  },
  light: {
    color: "#fff",
  },
});

export default Logo;
