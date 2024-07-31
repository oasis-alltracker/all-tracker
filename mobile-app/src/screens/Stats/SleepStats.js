import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import StatsAPI from "../../api/stats/statsAPI";
import { getAccessToken } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
const { width, height } = Dimensions.get("window");

const labels = ["S", "M", "T", "W", "T", "F", "S"];

const SleepStats = ({ sunday, updateStats }) => {
  const [sleepStats, setSleepStats] = useState([
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
      var token = await getAccessToken();
      var ratings = await StatsAPI.getSleepStats(token, sunday);

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
      setSleepStats(ratings);
      setIsLoading(false);
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
          source={require("../../assets/images/sleep.png")}
        />
        <Text style={styles.text}>sleep</Text>
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
          data={sleepStats}
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

export default SleepStats;
