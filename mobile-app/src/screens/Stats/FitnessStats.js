import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

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
        >
          {days.map((item, index) => (
            <View style={styles.day} key={index}>
              <Text style={styles.dayText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.xLabel}>Days worked out: 6</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    paddingRight: 35,
  },
  chartCircle: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: "rgba(202, 189, 255, 0.65)",
    borderColor: "rgba(202, 189, 255, 0.7)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    marginRight: 40,
  },
  imageCircle: {
    width: 28,
    height: 28,
  },
  text: {
    fontSize: 13,
    fontFamily: "Sego",
    color: "#25436B",
  },
  xLabel: {
    fontSize: 14,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
  chartContainer: {
    flex: 1,
  },
});

export default FitnessStats;
