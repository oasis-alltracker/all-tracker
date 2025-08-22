import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { ValueSheet } from "../../ValueSheet";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";

const days = ["M", "T", "W", "T", "F", "S", "S"];

const FitnessStats = ({ sunday, updateStats, setIsLoading }) => {
  const theme = useContext(ThemeContext).value;
  return (
    <View style={styles.chartBox}>
      <View
        style={[styles.chartCircle, sharedStyles["purpleContainer_" + theme]]}
      >
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/fitness.png")}
        />
        <Text style={[styles.statTitle, sharedStyles["textColour_light"]]}>
          fitness
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.days}
        ></ScrollView>
        <Text style={[styles.xLabel, sharedStyles["textColour_" + theme]]}>
          Days worked out: 6
        </Text>
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
  statTitle: {
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  xLabel: {
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default FitnessStats;
