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

const TaskStats = () => {
  return (
    <View style={styles.chartBox}>
      <View style={styles.chartCircle}>
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/to-dos.png")}
        />
        <Text style={styles.text}>to-dos</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          thickness={2}
          color="rgba(255, 207, 245, 1)"
          maxValue={500}
          animateOnDataChange
          areaChart
          hideRules
          yAxisTextNumberOfLines={1}
          yAxisLabelWidth={0}
          hideYAxisText
          hideDataPoints
          data={data}
          startFillColor1={"rgba(255, 207, 245, 1)"}
          endFillColor1={"rgba(255, 207, 245, 1)"}
          startOpacity={0.8}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={0}
          initialSpacing={0}
          yAxisColor="#B3B3B3"
          xAxisColor="#B3B3B3"
          height={130}
          width={180}
          curved
        />
        <Text style={styles.xLabel}>Completed - 10/20 - 50%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  preButton: {
    width: 30,
    height: 30,
  },
  nextButton: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  dateLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    // borderWidth: 1,
    // borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // backgroundColor: "#D7F6FF",
    // borderWidth: 1,
    // borderColor: "#CCCCCC",
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego",
  },
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
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
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
    fontSize: 12,
    fontFamily: "Sego",
  },
  chartContainer: {
    alignItems: "center",
  },
  dateLineMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  buttonMain: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderRightColor: "#ccc",
    borderLeftColor: "#ccc",
  },
  dateNameMain: {
    fontSize: 26,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  preButtonMain: {
    width: 30,
    height: 30,
  },
  nextButtonMain: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
});

export default TaskStats;