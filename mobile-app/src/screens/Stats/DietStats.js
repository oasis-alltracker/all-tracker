import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
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

const DietStats = ({ sunday, updateStats }) => {
  return (
    <View style={styles.chartBox}>
      <View style={styles.chartCircle}>
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/diet.png")}
        />
        <Text style={styles.text}>diet</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          thickness={2}
          color="rgba(202, 189, 255, 1)"
          maxValue={500}
          animateOnDataChange
          areaChart
          hideRules
          yAxisTextNumberOfLines={1}
          yAxisLabelWidth={0}
          hideYAxisText
          hideDataPoints
          data={data}
          startFillColor1={"rgba(202, 189, 255, 1)"}
          endFillColor1={"rgba(202, 189, 255, 1)"}
          startOpacity={0.8}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={0}
          initialSpacing={0}
          yAxisColor="#B3B3B3"
          xAxisColor="#B3B3B3"
          height={160}
          width={220}
          curved
        />
        <Text style={styles.xLabel}>Score: 3.2</Text>
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

export default DietStats;
