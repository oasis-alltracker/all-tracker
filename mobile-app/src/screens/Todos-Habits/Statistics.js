import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { InAppReview } from "react-native-in-app-review";
import TaskStats from "../Stats/TaskStats";
import HabitStats from "../Stats/HabitStats";
import { sharedStyles } from "../styles";
import { ValueSheet } from "../../ValueSheet";

const Statistics = ({ trackingPreferences, updateStats }) => {
  var thisSunday = new Date();
  thisSunday.setDate(thisSunday.getDate() - ((thisSunday.getDay() + 7) % 7));

  const [selectedSunday, setSelectedSunday] = useState(thisSunday);

  const updateWeek = (dateChange) => {
    var newDate = new Date(
      selectedSunday.setDate(selectedSunday.getDate() + dateChange)
    );
    setSelectedSunday(newDate);
  };

  useEffect(() => {
    const requestReview = async () => {
      try {
        const available = await InAppReview.isAvailable();
        if (available) {
          await InAppReview.RequestInAppReview();
        }
      } catch (error) {
        console.error(error);
      }
    };
    requestReview();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View
        style={[
          sharedStyles.headerImageContainer,
          {
            backgroundColor: "rgba(255, 207, 245, 0.65)",
            borderColor: "rgba(255, 207, 245, 0.70)",
          },
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/stats.png")}
        />
      </View>

      <View style={styles.dateLineMain}>
        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => updateWeek(-7)}
        >
          <Image
            style={[styles.preButtonMain, styles.nextButtonMain]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <>
          {moment(thisSunday).format("YYYYMMDD") ==
          moment(selectedSunday).format("YYYYMMDD") ? (
            <Text style={styles.dateNameMain}>This week</Text>
          ) : (
            <Text style={styles.dateNameMain}>
              Week of {selectedSunday.toDateString().slice(4, -5)}
            </Text>
          )}
        </>
        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => updateWeek(7)}
        >
          <Image
            style={styles.preButtonMain}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      {trackingPreferences.habitsSelected && (
        <HabitStats
          sunday={moment(selectedSunday).format("YYYYMMDD")}
          updateStats={updateStats}
        />
      )}
      {trackingPreferences.toDosSelected && (
        <TaskStats
          sunday={moment(selectedSunday).format("YYYYMMDD")}
          updateStats={updateStats}
        />
      )}
    </ScrollView>
  );
};
export default Statistics;

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
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  xLabel: {
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    borderColor: ValueSheet.colours.borderGrey,
    borderRadius: 2,
  },
  buttonMain: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: ValueSheet.colours.secondaryColour,
    borderWidth: 1,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: ValueSheet.colours.grey,
    borderLeftColor: ValueSheet.colours.grey,
  },
  dateNameMain: {
    fontSize: 26,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  preButtonMain: {
    width: 25,
    height: 25,
  },
  nextButtonMain: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
});
