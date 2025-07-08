import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import DietStats from "../Stats/DietStats";
import FitnessStats from "../Stats/FitnessStats";
import { ValueSheet } from "../../ValueSheet";

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
      <DietStats />
      <FitnessStats />
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
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  xLabel: {
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    borderColor: ValueSheet.colours.grey,
    marginRight: 8,
    borderRadius: 30,
  },
  dayText: {
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.black,
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
