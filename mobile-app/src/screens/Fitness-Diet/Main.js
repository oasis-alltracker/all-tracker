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
import Spinner from "react-native-loading-spinner-overlay";
import { ValueSheet } from "../../ValueSheet";

export default function Main({
  day,
  trackingPreferences,
  isLoading = false,
  updateDate,
  meals,
  totalMacros,
  dietGoals,
  setDietModalVisible,
}) {
  const today = new Date();
  const colours = [
    ValueSheet.colours.borderGrey,
    ValueSheet.colours.secondaryColour,
    ValueSheet.colours.progressLightTeal,
    ValueSheet.colours.progressTeal,
  ];

  const CalorieBar = () => {
    var percentage = totalMacros.calorieCount / dietGoals.calorieGoal.value;
    var consumedPercent = `${((percentage % 1) * 100).toFixed(0)}%`;
    var index = Math.floor(percentage);
    var innerColor;
    var outerColor;
    if (percentage > 3) {
      innerColor = colours[3];
      outerColor = colours[3];
    } else {
      innerColor = colours[index];
      outerColor = colours[index + 1];
    }

    return (
      <View
        style={[
          styles.progress,
          { backgroundColor: innerColor, borderColor: innerColor },
        ]}
      >
        <View
          style={[
            styles.filler,
            { width: consumedPercent, backgroundColor: outerColor },
          ]}
        />
      </View>
    );
  };

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
      <Spinner visible={isLoading}></Spinner>

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
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setDietModalVisible(true);
            }}
          >
            <Image
              style={styles.plus}
              source={require("../../assets/images/add-food.png")}
            />
          </TouchableOpacity>
          <CalorieBar />
          <Text style={styles.desc}>
            <Text style={styles.boldText}>{totalMacros["calorieCount"]}</Text> /{" "}
            {dietGoals["calorieGoal"]["value"]}{" "}
            {dietGoals["calorieGoal"]["units"]}
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
    borderWidth: 1,
    borderColor: ValueSheet.colours.borderGrey,
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: ValueSheet.colours.secondaryColour,
    borderWidth: 1,
    borderColor: ValueSheet.colours.grey,
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  plus: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 33,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 20,
    marginLeft: 20,
  },
  desc: {
    fontSize: 22,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  boldText: {
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 26,
  },
  addBtn: {
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
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
    borderColor: ValueSheet.colours.borderGrey,
    backgroundColor: ValueSheet.colours.borderGrey,
    marginHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  filler: {
    backgroundColor: ValueSheet.colours.secondaryColour,
    maxWidth: "100%",
    height: "100%",
  },
});
