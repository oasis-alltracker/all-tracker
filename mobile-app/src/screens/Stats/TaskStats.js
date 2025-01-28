import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Animated,
} from "react-native";
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
  const [totalCount, setTotalCount] = useState(1);
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
    if (updateStats > 0) {
      setIsLoading(true);
      getStatsOnLoad();
    }
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
      <View style={[styles.chartContainer, { height: height * 0.15 }]}>
        <View style={[styles.barContainer, { marginTop: height * 0.035 }]}>
          <Animated.View
            style={[
              styles.bar,
              { width: ((totalCompletions * 1.0) / totalCount) * 210 },
            ]}
          />
        </View>
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
  barContainer: {
    backgroundColor: "#DED1DB",
    borderRadius: 10,
    height: 60,
    width: "100%",
  },
  bar: {
    height: 60,
    backgroundColor: "#FFD9F7",
    borderRadius: 10,
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
    justifyContent: "center",
    width: 210,
  },
  errorToast: { textColor: "#fff" },
});

export default TaskStats;
