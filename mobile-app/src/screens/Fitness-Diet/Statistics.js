import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import DietStats from "../Stats/DietStats";
import FitnessStats from "../Stats/FitnessStats";
import { ValueSheet } from "../../ValueSheet";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";

export default function Statistics({ dietGoals, day, updateStats }) {
  var thisSunday = moment(day).day(0);
  const [sunday, setSunday] = useState(moment(thisSunday));
  const theme = useContext(ThemeContext).value;
  const [isLoading, setIsLoading] = useState(false);

  const decreaseWeek = () => {
    var newSunday = moment(sunday).day(-7);
    setSunday(newSunday);
  };

  const increaseWeek = () => {
    var newSunday = moment(sunday).day(+7);
    setSunday(newSunday);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Spinner visible={isLoading}></Spinner>
      <View
        style={[
          sharedStyles.headerImageContainer,
          sharedStyles["purpleContainer_" + theme],
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/stats.png")}
        />
      </View>
      <View style={sharedStyles.datePickerView}>
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
          {thisSunday.isSame(sunday, "day")
            ? "This week"
            : sunday.format("[Week of] MMM D")}
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
      <DietStats
        sunday={sunday.format("YYYYMMDD")}
        dietGoals={dietGoals}
        updateStats={updateStats}
        setIsLoading={setIsLoading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
});
