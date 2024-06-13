import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import StatsAPI from "../../api/stats/statsAPI";
import { getAccessToken } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";

const labels = ["S", "M", "T", "W", "T", "F", "S"];

const HabitStats = ({ sunday }) => {
  const [habitStats, setHabitStats] = useState([
    { value: 1, label: labels[0] },
    { value: 1, label: labels[1] },
    { value: 1, label: labels[2] },
    { value: 1, label: labels[3] },
    { value: 1, label: labels[4] },
    { value: 1, label: labels[5] },
    { value: 1, label: labels[6] },
  ]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalCompletions, setTotalCompletions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStatsOnLoad = async () => {
      var token = await getAccessToken();
      var data = await StatsAPI.getHabitStats(token, sunday);

      var count = 0;
      var completions = 0;

      for (var i = 0; i < data.length; i++) {
        count += data[i].habitCount;
        completions += data[i].completions;

        if (data[i].habitCount == 0) {
          data[i] = { value: 100, label: labels[i] };
        } else {
          data[i] = {
            label: labels[i],
            value: Math.floor(
              ((data[i].completions * 1.0) / data[i].habitCount) * 100
            ),
          };
        }
      }
      setTotalCount(count);
      setTotalCompletions(completions);
      setHabitStats(data);
      setIsLoading(false);
    };
    setIsLoading(true);
    getStatsOnLoad();
  }, [sunday]);

  return (
    <View style={styles.chartBox}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.chartCircle}>
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/habits.png")}
        />
        <Text style={styles.text}>habits</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          thickness={2}
          color="rgba(255, 207, 245, 1)"
          maxValue={100}
          areaChart
          hideRules
          yAxisTextNumberOfLines={1}
          yAxisLabelWidth={0}
          hideYAxisText
          hideDataPoints
          data={habitStats}
          startFillColor1={"rgba(255, 207, 245, 1)"}
          endFillColor1={"rgba(255, 207, 245, 1)"}
          startOpacity={0.8}
          labelTextStyle={{ fontFamily: "Sego", fontSize: 8 }}
          endOpacity={0.1}
          backgroundColor="transparent"
          xAxisLength={0}
          initialSpacing={0}
          yAxisColor="#B3B3B3"
          xAxisColor="#B3B3B3"
          height={130}
          width={190}
          spacing={40}
        />
        {totalCount > 0 ? (
          <>
            <Text style={styles.xLabel}>
              Completed - {totalCompletions}/{totalCount} -{" "}
              {Math.floor(((totalCompletions * 1.0) / totalCount) * 100)}%
            </Text>
          </>
        ) : (
          <Text style={styles.xLabel}>
            Completed - {totalCompletions}/{totalCount} - 100%
          </Text>
        )}
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
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
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
    marginTop: 20,
    paddingRight: 35,
  },
  chartCircle: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    marginRight: 40,
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
  dateLineMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  buttonMain: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderRightColor: "#ccc",
    borderLeftColor: "#ccc",
  },
  dateNameMain: {
    fontSize: 26,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  preButtonMain: {
    width: 30,
    height: 30,
  },
  nextButtonMain: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
});

export default HabitStats;
