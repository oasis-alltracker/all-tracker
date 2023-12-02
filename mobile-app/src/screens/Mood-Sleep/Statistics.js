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

const data2 = [
  {
    src: require("../../assets/images/sleep.png"),
    title: "sleep",
  },
  {
    src: require("../../assets/images/mood.png"),
    title: "mood",
  },
];

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
        <Text style={styles.dateName}> This week</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            style={[styles.preButton, styles.nextButton]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      {data2.map((val, key) => {
        return (
          <View key={key.toString()} style={styles.chartBox}>
            <View style={styles.chartCircle}>
              <Image style={styles.imageCircle} source={val.src} />
              <Text style={styles.text}>{val.title}</Text>
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
                height={130}
                width={150}
                curved
              />
              <Text style={styles.xLabel}>Average sleep rating: 3.7</Text>
            </View>
          </View>
        );
      })}
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
    backgroundColor: "#FFEFBD",
    borderColor: "#CCBF98",
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
    marginTop: 50,
  },
  chartCircle: {
    width: 65,
    height: 65,
    borderRadius: 45,
    backgroundColor: "#FFEFBD",
    borderColor: "#CCBF98",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginRight: 30,
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
    fontSize: 12,
    fontFamily: "Sego",
  },
  chartContainer: {
    alignItems: "center",
  },
});
