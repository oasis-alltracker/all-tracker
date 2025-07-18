import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  Platform,
} from "react-native";
import StatsAPI from "../../api/stats/statsAPI";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../user/keychain";
import { LineChart } from "react-native-gifted-charts";
import Toast from "react-native-root-toast";
import { ValueSheet } from "../../ValueSheet";

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
  const { width, height } = useWindowDimensions();
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
  const [isLoading, setIsLoading] = useState(false);

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
        if (Platform.OS === "ios") {
          Toast.show("Something went wrong. Please refresh the page.", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        } else {
          Toast.show("Something went wrong. Please refresh the page.", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
          });
        }
      }
    };
    if (updateStats > 0) {
      setTimeout(() => {
        setIsLoading(true);
        getStatsOnLoad();
      }, 300);
    }
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
          color={ValueSheet.colours.yellow}
          maxValue={5}
          areaChart
          hideRules
          yAxisTextNumberOfLines={1}
          yAxisLabelWidth={0}
          hideYAxisText
          hideDataPoints
          data={moodStats}
          startFillColor1={ValueSheet.colours.yellow}
          endFillColor1={ValueSheet.colours.yellow}
          startOpacity={0.8}
          labelTextStyle={{
            fontFamily: ValueSheet.fonts.primaryFont,
            fontSize: 8,
          }}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={0}
          initialSpacing={0}
          yAxisColor={ValueSheet.colours.black25}
          xAxisColor={ValueSheet.colours.black25}
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
    backgroundColor: ValueSheet.colours.yellow75,
    borderColor: ValueSheet.colours.borderYellow,
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
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  xLabel: {
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
  },
  chartContainer: {
    alignItems: "center",
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
});

export default MoodStats;
