import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { ValueSheet } from "../../ValueSheet";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const FitnessStats = ({ sunday, updateStats }) => {
  return (
    <View style={styles.chartBox}>
      <View style={styles.chartCircle}>
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/fitness.png")}
        />
        <Text style={styles.text}>fitness</Text>
      </View>
      <View style={styles.chartContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.days}
        ></ScrollView>
        <Text style={styles.xLabel}>Days worked out: 6</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartBox: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    paddingRight: 35,
  },
  chartCircle: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: ValueSheet.colours.purple65,
    borderColor: ValueSheet.colours.purple,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    marginLeft: 25,
    marginRight: 45,
  },
  imageCircle: {
    width: 28,
    height: 28,
  },
  text: {
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  xLabel: {
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default FitnessStats;
