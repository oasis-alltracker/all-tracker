import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const data = [
  { value: 500 },
  { value: 80 },
  { value: 90 },
  { value: 70 },
  { value: 50 },
  { value: 400 },
  { value: 30 },
  { value: 10 },
  { value: 40 },
  { value: 300 },
  { value: 75 },
  { value: 70 },
];

const MoodStats = () => {
  return (
    <View style={styles.chartBox}>
      <View style={styles.chartCircle}>
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/mood.png")}
        />
        <Text style={styles.text}>mood</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          thickness={2}
          color="#FFEFBD"
          maxValue={500}
          animateOnDataChange
          areaChart
          hideRules
          yAxisTextNumberOfLines={1}
          yAxisLabelWidth={0}
          hideYAxisText
          hideDataPoints
          data={data}
          startFillColor1={"#FFEFBD"}
          endFillColor1={"#FFEFBD"}
          startOpacity={0.8}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={0}
          initialSpacing={0}
          yAxisColor="#B3B3B3"
          xAxisColor="#B3B3B3"
          height={120}
          width={190}
          spacing={40}
        />
        <Text style={styles.xLabel}>Average sleep rating: 3.7</Text>
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
    backgroundColor: "#FFEFBD",
    borderColor: "#CCBF98",
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
    alignItems: "center",
  },
});

export default MoodStats;
