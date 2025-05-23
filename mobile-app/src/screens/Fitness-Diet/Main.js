import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { sharedStyles } from "../styles";
import moment from "moment";

export default function Main({ 
  day,
  trackingPreferences, 
  updateDate, 
  meals,
  totalMacros, 
  dietGoals 
}) {
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
            backgroundColor: "rgba(202, 189, 255, 65)",
            borderColor: "rgba(162, 151, 204, 0.7)",
          },
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/body-white.png")}
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

      {trackingPreferences.dietSelected && (
        <>
          <View style={[sharedStyles.trackerDashView]}>
            <Text style={sharedStyles.trackerTitle}>Diet</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Image
              style={styles.plus}
              source={require("../../assets/images/add-food.png")}
            />
          </TouchableOpacity>
          <View style={styles.progress}>
            <View style={styles.filler} />
          </View>
          <Text style={styles.desc}>
            <Text style={styles.boldText}>{totalMacros["calorieCount"]}</Text> / {dietGoals["calorieGoal"]["value"]} {dietGoals["calorieGoal"]["units"]}
          </Text>
        </>
      )}

      {trackingPreferences.fitnessSelected && (
        <>
          <View style={[sharedStyles.trackerDashView]}>
            <Text style={sharedStyles.trackerTitle}>Fitness</Text>
          </View>

          <TouchableOpacity style={styles.addBtn}>
            <Image
              style={styles.plus}
              source={require("../../assets/images/add-excercise.png")}
            />
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
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
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego",
  },
  plus: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 33,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 20,
    marginLeft: 20,
  },
  desc: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
  },
  boldText: {
    fontFamily: "Sego-Bold",
    fontSize: 26,
  },
  addBtn: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    width: 350,
  },
  progress: {
    height: 20,
    width: 350,
    borderWidth: 2,
    borderColor: "#ACC5CC",
    backgroundColor: "#E4CCFF",
    marginHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  filler: {
    backgroundColor: "#D7F6FF",
    width: "70%",
    height: "100%",
  },
});
