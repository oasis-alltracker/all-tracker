import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import moment from "moment";
import { sharedStyles } from "../styles";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";
import navigationService from "../../navigators/navigationService";
import { useContext } from "react";

const moodData = [
  {
    light: require("../../assets/images/moodRating/1_light.png"),
    dark: require("../../assets/images/moodRating/1_dark.png"),
  },
  {
    light: require("../../assets/images/moodRating/2_light.png"),
    dark: require("../../assets/images/moodRating/2_dark.png"),
  },
  {
    light: require("../../assets/images/moodRating/3_light.png"),
    dark: require("../../assets/images/moodRating/3_dark.png"),
  },
  {
    light: require("../../assets/images/moodRating/4_light.png"),
    dark: require("../../assets/images/moodRating/4_dark.png"),
  },
  {
    light: require("../../assets/images/moodRating/5_light.png"),
    dark: require("../../assets/images/moodRating/5_dark.png"),
  },
];

const sleepData = [
  {
    light: require("../../assets/images/sleepRating/1_light.png"),
    dark: require("../../assets/images/sleepRating/1_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/2_light.png"),
    dark: require("../../assets/images/sleepRating/2_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/3_light.png"),
    dark: require("../../assets/images/sleepRating/3_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/4_light.png"),
    dark: require("../../assets/images/sleepRating/4_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/5_light.png"),
    dark: require("../../assets/images/sleepRating/5_dark.png"),
  },
];

export default function Main({
  day,
  trackingPreferences,
  updateDate,
  moodRef,
  sleepRef,
  wellnessReportForDay,
  sleepReportForDay,
}) {
  const theme = useContext(ThemeContext).value;
  const today = new Date();
  const { width, height } = useWindowDimensions();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={sharedStyles.container}
      scrollEnabled={false}
    >
      <View
        style={[
          sharedStyles.headerImageContainer,
          sharedStyles["yellowContainer_" + theme],
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/soul-blue.png")}
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
          onPress={() => updateDate(-1)}
        >
          <Image
            style={[sharedStyles.decreaseDateImage]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <>
          <View style={sharedStyles.dateTextContainer}>
            {moment(day).format("YYYYMMDD") ==
            moment(today).format("YYYYMMDD") ? (
              <Text
                style={[
                  sharedStyles.dateText,
                  sharedStyles["textColour_" + theme],
                ]}
              >
                Today
              </Text>
            ) : (
              <Text
                style={[
                  sharedStyles.dateText,
                  sharedStyles["textColour_" + theme],
                ]}
              >
                {day.toDateString().slice(4, -5)}
              </Text>
            )}
          </View>
        </>
        <TouchableOpacity
          style={[
            sharedStyles.changeDateButton,
            sharedStyles["changeDateButton_" + theme],
          ]}
          onPress={() => updateDate(1)}
        >
          <Image
            style={sharedStyles.increaseDateImage}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>

      {trackingPreferences.moodSelected && (
        <>
          <View style={[sharedStyles.trackerDashView]}>
            <Text
              style={[
                sharedStyles.trackerTitle,
                sharedStyles["textColour_" + theme],
              ]}
            >
              Mood
            </Text>
          </View>
          {wellnessReportForDay ? (
            <TouchableOpacity
              style={[
                styles.ratingBtn,
                sharedStyles["borderedContainer_" + theme],
                { height: height * 0.1 },
              ]}
              onPress={() => {
                moodRef.current.open(wellnessReportForDay);
              }}
            >
              <Image
                style={{ width: height * 0.08, height: height * 0.08 }}
                source={
                  moodData[Number(wellnessReportForDay.feeling) - 1][theme]
                }
              />
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.questionContainer}>
                <Text
                  style={[
                    styles.questionText,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  How are you feeling?
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.addBtn,
                  sharedStyles["borderedContainer_" + theme],
                  { height: height * 0.065 },
                ]}
                onPress={() => {
                  navigationService.navigate("moodTest", {
                    screen: "moodStep1",
                    params: {
                      dateString: day.toDateString(),
                      dateStamp: moment(day).format("YYYYMMDD"),
                    },
                  });
                }}
              >
                <Image
                  style={[styles.plus, sharedStyles["tint_" + theme]]}
                  source={require("../../assets/images/plus512.png")}
                />
              </TouchableOpacity>
            </>
          )}
        </>
      )}
      {trackingPreferences.sleepSelected && (
        <>
          <View style={[sharedStyles.trackerDashView]}>
            <Text
              style={[
                sharedStyles.trackerTitle,
                sharedStyles["textColour_" + theme],
              ]}
            >
              Sleep
            </Text>
          </View>

          {sleepReportForDay ? (
            <TouchableOpacity
              style={[
                styles.ratingBtn,
                sharedStyles["borderedContainer_" + theme],
                { height: height * 0.1 },
              ]}
              onPress={() => {
                sleepRef.current.open(sleepReportForDay);
              }}
            >
              <Image
                style={{ width: height * 0.08, height: height * 0.08 }}
                source={sleepData[Number(sleepReportForDay.rating) - 1][theme]}
              />
            </TouchableOpacity>
          ) : (
            <>
              <View style={styles.questionContainer}>
                <Text
                  style={[
                    styles.questionText,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  How was your sleep?
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.addBtn,
                  sharedStyles["borderedContainer_" + theme],
                  { height: height * 0.065 },
                ]}
                onPress={() => {
                  navigationService.navigate("sleepTest", {
                    screen: "sleepStep1",
                    params: {
                      dateString: day.toDateString(),
                      dateStamp: moment(day).format("YYYYMMDD"),
                    },
                  });
                }}
              >
                <Image
                  style={[styles.plus, sharedStyles["tint_" + theme]]}
                  source={require("../../assets/images/plus512.png")}
                />
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  plus: {
    width: 35,
    height: 35,
  },
  questionText: {
    fontSize: 26,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  addBtn: {
    borderWidth: 2,
    borderRadius: 30,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  ratingBtn: {
    borderWidth: 2,
    borderRadius: 30,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
  },
  questionContainer: {
    justifyContent: "center",
    marginBottom: 5,
  },
});
