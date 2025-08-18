import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  Platform,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import StatsAPI from "../../api/stats/statsAPI";
import { getAccessToken } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import { ValueSheet } from "../../ValueSheet";
import Toast from "react-native-toast-message";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";

const labels = ["S", "M", "T", "W", "T", "F", "S"];

const SleepStats = ({ sunday, updateStats }) => {
  const { width, height } = useWindowDimensions();
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
  const [isLoading, setIsLoading] = useState(false);
  const theme = useContext(ThemeContext).value;
  useEffect(() => {
    const getStatsOnLoad = async () => {
      try {
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
      } catch (e) {
        setIsLoading(false);
        Toast.show({
          type: "info",
          text1: "Failed to retrieve sleep stats",
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
      <Spinner visible={isLoading}></Spinner>
      <View style={[styles.chartCircle, styles["chartCircle_" + theme]]}>
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/sleep.png")}
        />
        <Text style={styles.text}>sleep</Text>
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
          data={sleepStats}
          startFillColor1={ValueSheet.colours.yellow}
          endFillColor1={ValueSheet.colours.yellow}
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
  chartCircle_dark: {
    backgroundColor: ValueSheet.colours.dark.yellow75,
    borderColor: ValueSheet.colours.dark.borderYellow,
  },
  chartCircle_light: {
    backgroundColor: ValueSheet.colours.dark.yellow75,
    borderColor: ValueSheet.colours.dark.borderYellow,
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
});

export default SleepStats;
