import React, { useState, useEffect } from "react";
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
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import { ValueSheet } from "../../ValueSheet";

const labels = ["S", "M", "T", "W", "T", "F", "S"];

const HabitStats = ({ sunday, updateStats }) => {
  const { width, height } = useWindowDimensions();
  const [totalCountMath, setTotalCountMath] = useState(1);
  const [totalCompletionsMath, setTotalCompletionsMath] = useState(1);
  const [totalCountDisplay, setTotalCountDisplay] = useState(0);
  const [totalCompletionsDisplay, setTotalCompletionsDisplay] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
          source={require("../../assets/images/habits.png")}
        />
        <Text style={styles.text}>habits</Text>
      </View>
      <View style={[styles.chartContainer, { height: height * 0.15 }]}>
        <View style={[styles.barContainer, { marginTop: height * 0.035 }]}>
          <Animated.View
            style={[
              styles.bar,
              { width: ((totalCompletionsMath * 1.0) / totalCountMath) * 210 },
            ]}
          />
        </View>

        {totalCountDisplay > 0 ? (
          <>
            <Text style={styles.xLabel}>
              Completed - {totalCompletionsDisplay}/{totalCountDisplay} -{" "}
              {Math.floor(
                ((totalCompletionsMath * 1.0) / totalCountMath) * 100
              )}
              %
            </Text>
          </>
        ) : (
          <Text style={styles.xLabel}>
            Completed - {totalCompletionsDisplay}/{totalCountDisplay} - 100%
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
    paddingTop: 20,
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
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  xLabel: {
    paddingTop: 6,
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 210,
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
});

export default HabitStats;
