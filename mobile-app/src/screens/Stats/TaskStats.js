import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import StatsAPI from "../../api/stats/statsAPI";
import { getAccessToken } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";

const labels = ["S", "M", "T", "W", "T", "F", "S"];
const [width, height] = [
  Dimensions.get("window").width,
  Dimensions.get("window").height,
];

const TaskStats = ({ sunday, updateStats }) => {
  const [taskStats, setTaskStats] = useState([
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
      try {
        var token = await getAccessToken();
        var data = await StatsAPI.getTaskStats(token, sunday);

        var count = 0;
        var completions = 0;

        for (var i = 0; i < data.length; i++) {
          count += data[i].taskCount;
          completions += data[i].completionCount;

          if (data[i].taskCount == 0) {
            data[i] = { value: 100, label: labels[i] };
          } else {
            data[i] = {
              label: labels[i],
              value: Math.floor(
                ((data[i].completionCount * 1.0) / data[i].taskCount) * 100
              ),
            };
          }
        }

        setTotalCount(count);
        setTotalCompletions(completions);
        setTaskStats(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        Toast.show("Something went wrong. Please refresh the page.", {
          ...styles.errorToast,
          duration: Toast.durations.SHORT,
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
          source={require("../../assets/images/to-dos.png")}
        />
        <Text style={styles.text}>to-dos</Text>
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
          data={taskStats}
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
          height={height * 0.15}
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
  errorToast: { textColor: "#fff" },
});

export default TaskStats;
