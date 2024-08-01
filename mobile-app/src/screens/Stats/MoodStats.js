import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import StatsAPI from "../../api/stats/statsAPI";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../user/keychain";
import { LineChart } from "react-native-gifted-charts";
const { width, height } = Dimensions.get("window");
import Toast from "react-native-root-toast";

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

const labels = ["S", "M", "T", "W", "T", "F", "S"];

const MoodStats = ({ sunday, updateStats }) => {
  const [moodStats, setMoodStats] = useState([
    { value: 0, label: labels[0] },
    { value: 0, label: labels[1] },
    { value: 0, label: labels[2] },
    { value: 0, label: labels[3] },
    { value: 0, label: labels[4] },
    { value: 0, label: labels[5] },
    { value: 0, label: labels[6] },
  ]);
  const [averageRating, setAveragerRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStatsOnLoad = async () => {
      try {
        var token = await getAccessToken();
        var ratings = await StatsAPI.getMoodStats(token, sunday);

        var ratingSum = 0;

        for (var i = 0; i < ratings.length; i++) {
          rating = 1;
          if (ratings[i].rating != 0) {
            rating = ratings[i].rating;
          }
          ratingSum += rating;
          ratings[i] = {
            label: labels[i],
            value: Number(rating),
          };
        }

        var newAverage = (ratingSum * 1.0) / 7;
        setAveragerRating(newAverage);
        setMoodStats(ratings);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        Toast.show("Something went wrong. Please refresh the page.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      }
    };
    setIsLoading(true);
    getStatsOnLoad();
  }, [sunday, updateStats]);

  return (
    <View style={styles.chartBox}>
      <Spinner visible={isLoading}></Spinner>
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
          maxValue={5}
          areaChart
          hideRules
          yAxisTextNumberOfLines={1}
          yAxisLabelWidth={0}
          hideYAxisText
          hideDataPoints
          data={moodStats}
          startFillColor1={"#FFEFBD"}
          endFillColor1={"#FFEFBD"}
          startOpacity={0.8}
          labelTextStyle={{ fontFamily: "Sego", fontSize: 8 }}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={0}
          initialSpacing={0}
          yAxisColor="#B3B3B3"
          xAxisColor="#B3B3B3"
          height={height * 0.15}
          width={190}
          spacing={40}
        />
        <Text style={styles.xLabel}>
          Average rating: {Math.round(averageRating * 10) / 10}/5
        </Text>
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
    borderColor: "#ffe8a1",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginRight: 35,
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
