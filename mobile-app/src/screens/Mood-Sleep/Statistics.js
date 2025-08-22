import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import MoodStats from "../Stats/MoodStats";
import SleepStats from "../Stats/SleepStats";
import { sharedStyles } from "../styles";
import { ValueSheet } from "../../ValueSheet";
import InAppReview from "react-native-in-app-review";
import Spinner from "react-native-loading-spinner-overlay";
import { ThemeContext } from "../../contexts/ThemeProvider";

const Statistics = ({ trackingPreferences, updateStats }) => {
  var day = new Date();
  var thisSunday = moment(day).day(0);
  const theme = useContext(ThemeContext).value;

  const [selectedSunday, setSelectedSunday] = useState(thisSunday);
  const [isLoading, setIsLoading] = useState(false);

  const decreaseWeek = () => {
    var newSunday = moment(selectedSunday).day(-7);
    setSelectedSunday(newSunday);
  };

  const increaseWeek = () => {
    var newSunday = moment(selectedSunday).day(+7);
    setSelectedSunday(newSunday);
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
      <Spinner visible={isLoading}></Spinner>
      <View
        style={[
          sharedStyles.headerImageContainer,
          {
            backgroundColor: ValueSheet.colours[theme].yellow75,
            borderColor: ValueSheet.colours[theme].borderYellow,
          },
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/stats.png")}
        />
      </View>

      <View
        style={[
          sharedStyles.datePickerView,
          sharedStyles["datePickerView_" + theme],
        ]}
      >
        <TouchableOpacity
          style={[
            sharedStyles.changeDateButton,
            sharedStyles["changeDateButton_" + theme],
          ]}
          onPress={decreaseWeek}
        >
          <Image
            style={sharedStyles.decreaseDateImage}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>

        <Text
          style={[
            sharedStyles.dateText,
            sharedStyles["textColour_" + theme],
            { fontSize: 26, marginVertical: 3.5 },
          ]}
        >
          {thisSunday.isSame(selectedSunday, "day")
            ? "This week"
            : selectedSunday.format("[Week of] MMM D")}
        </Text>
        <TouchableOpacity
          style={[
            sharedStyles.changeDateButton,
            sharedStyles["changeDateButton_" + theme],
          ]}
          onPress={increaseWeek}
        >
          <Image
            style={sharedStyles.increaseDateImage}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      {trackingPreferences.moodSelected && (
        <MoodStats
          sunday={moment(selectedSunday).format("YYYYMMDD")}
          updateStats={updateStats}
          setIsLoading={setIsLoading}
        />
      )}
      {trackingPreferences.sleepSelected && (
        <SleepStats
          sunday={moment(selectedSunday).format("YYYYMMDD")}
          updateStats={updateStats}
          setIsLoading={setIsLoading}
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
});
