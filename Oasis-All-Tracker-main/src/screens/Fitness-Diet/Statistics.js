import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
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

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function Statistics() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/stats.png")}
        />
      </View>
      <View style={styles.dateLine}>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.preButton}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <Text style={styles.dateName}>This week</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            style={[styles.preButton, styles.nextButton]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.chartBox}>
        <View style={styles.chartCircle}>
          <Image
            style={styles.imageCircle}
            source={require("../../assets/images/diet.png")}
          />
          <Text style={styles.text}>diet</Text>
        </View>
        <View style={styles.chartContainer}>
          <View style={[styles.dateLine, styles.chartContr]}>
            <TouchableOpacity style={styles.button}>
              <Image
                style={styles.chartChange}
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
            <Text style={styles.xLabel}>This week</Text>
            <TouchableOpacity style={styles.button}>
              <Image
                style={[styles.chartChange, styles.nextButton]}
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          </View>
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
    </ScrollView>
  );
}

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
    backgroundColor: "rgba(202, 189, 255, 0.65)",
    borderColor: "rgba(162, 151, 204, 0.7)",
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
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    marginTop: 50,
  },
  chartCircle: {
    width: 65,
    height: 65,
    borderRadius: 45,
    backgroundColor: "rgba(202, 189, 255, 0.65)",
    borderColor: "rgba(202, 189, 255, 0.7)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },
  imageCircle: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 13,
    fontFamily: "Sego",
  },
  xLabel: {
    fontSize: 16,
    fontFamily: "Sego",
  },
  chartContainer: {
    flex: 1,
  },
  days: {
    paddingVertical: 10,
  },
  day: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#CCCCCC",
    marginRight: 8,
    borderRadius: 30,
  },
  dayText: {
    fontSize: 12,
    fontFamily: "Sego",
    color: "#000000",
  },
  chartContr: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    width: 190,
    marginTop: 0,
    left: 30,
  },
  chartChange: {
    width: 15,
    height: 15,
  },
});
