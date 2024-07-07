import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { sharedStyles } from "../styles";
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
            borderColor: "#CCBF98",
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
              {day.toDateString().slice(4, -4)}
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
              style={styles.ratingBtn}
              onPress={() => {
                moodRef.current.open(wellnessReportForDay);
              }}
            >
              <Image
                style={styles.ratingImage}
                source={
                  moodData[Number(wellnessReportForDay.feeling) - 1].image
                }
              />
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.questionText}>How are you feeling?</Text>
              <TouchableOpacity
                style={styles.addBtn}
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
              style={styles.ratingBtn}
              onPress={() => {
                sleepRef.current.open(sleepReportForDay);
              }}
            >
              <Image
                style={styles.ratingImage}
                source={sleepData[Number(sleepReportForDay.rating) - 1].image}
              />
            </TouchableOpacity>
          ) : (
            <>
              <Text style={styles.questionText}>How was your sleep?</Text>
              <TouchableOpacity
                style={styles.addBtn}
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
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 33,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 20,
    marginLeft: 20,
  },
  questionText: {
    fontSize: 26,
    color: "#25436B",
    fontFamily: "Sego",
  },
  addBtn: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    height: 80,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  ratingBtn: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    height: 105,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  ratingImage: {
    width: 65,
    height: 65,
  },
});
