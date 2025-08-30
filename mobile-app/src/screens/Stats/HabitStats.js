import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  Animated,
  Platform,
} from "react-native";
import StatsAPI from "../../api/stats/statsAPI";
import { getAccessToken } from "../../user/keychain";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../ValueSheet";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";

const labels = ["S", "M", "T", "W", "T", "F", "S"];

const HabitStats = ({ sunday, updateStats, setIsLoading }) => {
  const { width, height } = useWindowDimensions();
  const [totalCountMath, setTotalCountMath] = useState(1);
  const [totalCompletionsMath, setTotalCompletionsMath] = useState(1);
  const [totalCountDisplay, setTotalCountDisplay] = useState(0);
  const [totalCompletionsDisplay, setTotalCompletionsDisplay] = useState(0);
  const theme = useContext(ThemeContext).value;

  useEffect(() => {
    const getStatsOnLoad = async () => {
      try {
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
        setIsLoading(false);
        Toast.show({
          type: "info",
          text1: "Failed to retrieve habit stats",
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
      <View
        style={[styles.chartCircle, sharedStyles["pinkContainer_" + theme]]}
      >
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/habits.png")}
        />
        <Text style={[styles.statTitle, sharedStyles["textColour_light"]]}>
          habits
        </Text>
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
              styles["bar_" + theme],
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
    paddingTop: 20,
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
  statTitle: {
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  xLabel: {
    paddingTop: 6,
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 210,
  },
});

export default HabitStats;
