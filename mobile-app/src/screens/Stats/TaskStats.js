import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import StatsAPI from "../../api/stats/statsAPI";
import { getAccessToken } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { sharedStyles } from "../styles";

const labels = ["S", "M", "T", "W", "T", "F", "S"];
const [width, height] = [
  Dimensions.get("window").width,
  Dimensions.get("window").height,
];

const TaskStats = ({ sunday, updateStats }) => {
  const [totalCountMath, setTotalCountMath] = useState(1);
  const [totalCompletionsMath, setTotalCompletionsMath] = useState(1);
  const [totalCountDisplay, setTotalCountDisplay] = useState(0);
  const [totalCompletionsDisplay, setTotalCompletionsDisplay] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useContext(ThemeContext).value;

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
        if (count <= 0) {
          setTotalCountMath(1);
          setTotalCompletionsMath(1);
        } else {
          setTotalCountMath(count);
          setTotalCompletionsMath(completions);
        }

        setTotalCountDisplay(count);
        setTotalCompletionsDisplay(completions);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        Toast.show({
          type: "info",
          text1: "Failed to retrieve task stats",
          text2: "Please refresh the page by exiting and returning to it.",
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
      <View
        style={[styles.chartCircle, sharedStyles["pinkContainer_" + theme]]}
      >
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/to-dos.png")}
        />
        <Text style={styles.statsTitle}>to-dos</Text>
      </View>
      <View style={[styles.chartContainer, { height: height * 0.15 }]}>
        <View
          style={[
            styles.barContainer,
            sharedStyles["pinkContainer_" + theme],
            { marginTop: height * 0.035 },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              { width: ((totalCompletionsMath * 1.0) / totalCountMath) * 210 },
            ]}
          />
        </View>
        {totalCountDisplay > 0 ? (
          <>
            <Text style={[styles.xLabel, sharedStyles["textColour_" + theme]]}>
              Completed - {totalCompletionsDisplay}/{totalCountDisplay} -{" "}
              {Math.floor(
                ((totalCompletionsMath * 1.0) / totalCountMath) * 100
              )}
              %
            </Text>
          </>
        ) : (
          <Text style={[styles.xLabel, sharedStyles["textColour_" + theme]]}>
            Completed - {totalCompletionsDisplay}/{totalCountDisplay} - 100%
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    borderRadius: 10,
    height: 60,
    width: "100%",
  },
  bar: {
    height: 60,
    borderRadius: 10,
  },
  bar_light: {
    backgroundColor: ValueSheet.colours.light.pink,
  },
  bar_dark: {
    backgroundColor: ValueSheet.colours.dark.pink,
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
  statsTitle: {
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  xLabel: {
    fontSize: 14,
    paddingTop: 6,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 210,
  },
});

export default TaskStats;
