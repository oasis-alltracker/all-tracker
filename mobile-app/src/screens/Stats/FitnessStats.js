import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const FitnessStats = () => {
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

export default FitnessStats;
