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
      <View style={[sharedStyles.headerImageContainer, styles.imageContainer]}>
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
  imageContainer: {
    backgroundColor: ValueSheet.colours.pink65,
    borderColor: ValueSheet.colours.borderPink70,
  },
});
