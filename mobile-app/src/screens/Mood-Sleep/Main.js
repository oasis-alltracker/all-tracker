import React, { useEffect } from "react";
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
import navigationService from "../../navigators/navigationService";

const moodData = [
  {
    image: require("../../assets/images/moodRating/1.png"),
  },
  {
    image: require("../../assets/images/moodRating/2.png"),
  },
  {
    image: require("../../assets/images/moodRating/3.png"),
  },
  {
    image: require("../../assets/images/moodRating/4.png"),
  },
  {
    image: require("../../assets/images/moodRating/5.png"),
  },
];

const sleepData = [
  {
    image: require("../../assets/images/sleepRating/1.png"),
  },
  {
    image: require("../../assets/images/sleepRating/2.png"),
  },
  {
    image: require("../../assets/images/sleepRating/3.png"),
  },
  {
    image: require("../../assets/images/sleepRating/4.png"),
  },
  {
    image: require("../../assets/images/sleepRating/5.png"),
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
          {
            backgroundColor: "#FFEFBD",
            borderColor: "#ffe8a1",
          },
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/soul-white.png")}
        />
      </View>
      <View style={sharedStyles.datePickerView}>
        <TouchableOpacity
          style={sharedStyles.changeDateButton}
          onPress={() => updateDate(-1)}
        >
          <Image
            style={[sharedStyles.decreaseDateImage]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <>
          {moment(day).format("YYYYMMDD") ==
          moment(today).format("YYYYMMDD") ? (
            <Text style={sharedStyles.dateText}>Today</Text>
          ) : (
            <Text style={sharedStyles.dateText}>
              {day.toDateString().slice(4, -5)}
            </Text>
          )}
        </>
        <TouchableOpacity
          style={sharedStyles.changeDateButton}
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
            <Text style={sharedStyles.trackerTitle}>Mood</Text>
          </View>
          {wellnessReportForDay ? (
            <TouchableOpacity
              style={[styles.ratingBtn, { height: height * 0.1 }]}
              onPress={() => {
                moodRef.current.open(wellnessReportForDay);
              }}
            >
              <Image
                style={{ width: height * 0.08, height: height * 0.08 }}
                source={
                  moodData[Number(wellnessReportForDay.feeling) - 1].image
                }
              />
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.questionText}>How are you feeling?</Text>
              <TouchableOpacity
                style={[styles.addBtn, { height: height * 0.065 }]}
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
                  style={styles.plus}
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
            <Text style={sharedStyles.trackerTitle}>Sleep</Text>
          </View>

          {sleepReportForDay ? (
            <TouchableOpacity
              style={[styles.ratingBtn, { height: height * 0.1 }]}
              onPress={() => {
                sleepRef.current.open(sleepReportForDay);
              }}
            >
              <Image
                style={{ width: height * 0.08, height: height * 0.08 }}
                source={sleepData[Number(sleepReportForDay.rating) - 1].image}
              />
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.questionText}>How was your sleep?</Text>
              <TouchableOpacity
                style={[styles.addBtn, { height: height * 0.065 }]}
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
                  style={styles.plus}
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
    fontSize: 24,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  addBtn: {
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
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
    borderColor: ValueSheet.colours.grey,
    borderRadius: 30,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
  },
});
