import React, { useState, useEffect, useContext } from "react";
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
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { sharedStyles } from "../styles";

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

const MoodStats = ({ sunday, updateStats, setIsLoading }) => {
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
  const theme = useContext(ThemeContext).value;

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
        Toast.show({
          type: "info",
          text1: "Failed to retrieve habit stats",
          text2: "Please refresh the page by exiting and returning to it.",
        });
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
      <View
        style={[styles.chartCircle, sharedStyles["yellowContainer_" + theme]]}
      >
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/mood.png")}
        />
        <Text style={[styles.statsTitle, sharedStyles["textColour_light"]]}>
          mood
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          thickness={2}
          color={ValueSheet.colours[theme].yellow}
          maxValue={5}
          areaChart
          hideRules
          yAxisTextNumberOfLines={1}
          yAxisLabelWidth={0}
          hideYAxisText
          hideDataPoints
          data={moodStats}
          startFillColor1={ValueSheet.colours[theme].yellow}
          endFillColor1={ValueSheet.colours[theme].yellow}
          startOpacity={0.8}
          xAxisLabelTextStyle={{
            fontFamily: ValueSheet.fonts.primaryFont,
            color: ValueSheet.colours[theme].primaryColour,
          }}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={220}
          yAxisColor={ValueSheet.colours[theme].primaryColour}
          xAxisColor={ValueSheet.colours[theme].primaryColour}
          height={height * 0.15}
          width={220}
          spacing={220 / 7}
        />
        <Text style={[styles.xLabel, sharedStyles["textColour_" + theme]]}>
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
    marginTop: 30,
    marginLeft: 25,
    marginRight: 20,
  },
  imageCircle: {
    width: 28,
    height: 28,
  },
  statsTitle: {
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

export default MoodStats;
