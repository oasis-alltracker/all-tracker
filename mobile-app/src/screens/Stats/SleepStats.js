import React, { useState, useEffect } from "react";
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

import Toast from "react-native-root-toast";

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
          yAxisLabelWidth={35}
          hideYAxisText
          hideDataPoints
          data={sleepStats}
          startFillColor1={ValueSheet.colours.yellow}
          endFillColor1={ValueSheet.colours.yellow}
          startOpacity={0.8}
          labelTextStyle={{
            fontFamily: ValueSheet.fonts.primaryFont,
            fontSize: 8,
          }}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={220}
          yAxisColor={ValueSheet.colours.black25}
          xAxisColor={ValueSheet.colours.black25}
          height={height * 0.15}
          width={220}
          spacing={220 / 7}
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
    marginLeft: 25,
    marginRight: 10,
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

export default SleepStats;
