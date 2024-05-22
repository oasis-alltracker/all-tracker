import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import moment from "moment";
import { sharedStyles } from "../styles";

export default function Main(
  day,
  trackingPreferences,
  updateDate,
  moodRef,
  sleepRef,
  createMoodReport,
  createSleepReport,
  wellnessReportsForDay,
  sleepReportsForDay
) {
  const today = new Date();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={sharedStyles.container}
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
          <Text style={styles.questionText}>How are you feeling?</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Image
              style={styles.plus}
              source={require("../../assets/images/plus512.png")}
            />
          </TouchableOpacity>
        </>
      )}
      {trackingPreferences.sleepSelected && (
        <>
          <View style={[sharedStyles.trackerDashView]}>
            <Text style={sharedStyles.trackerTitle}>Sleep</Text>
          </View>
          <Text style={styles.questionText}>How was your sleep?</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Image
              style={styles.plus}
              source={require("../../assets/images/plus512.png")}
            />
          </TouchableOpacity>
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
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
});
