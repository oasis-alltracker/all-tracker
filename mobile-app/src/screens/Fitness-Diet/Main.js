import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { sharedStyles } from "../styles";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";

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
  const energyMultiplier = dietGoals.calorieGoal.units == "kcal" ? 1 : 4.184;
  const today = new Date();
  const theme = useContext(ThemeContext).value;
  const [styles, setStyle] = useState(generateStyle("light"));
  const colours = [
    ValueSheet.colours[theme].borderGrey,
    ValueSheet.colours[theme].secondaryColour,
    ValueSheet.colours[theme].progressLightTeal,
    ValueSheet.colours[theme].progressTeal,
  ];

  useEffect(() => {
    setStyle(generateStyle(theme));
  }, [theme]);

  const CalorieBar = () => {
    var denom =
      dietGoals.calorieGoal.units == "kcal"
        ? dietGoals.calorieGoal.value
        : dietGoals.calorieGoal.value / 4.184;
    var percentage = totalMacros.calorieCount / denom;
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
      <View style={[sharedStyles.headerImageContainer, styles.imageContainer]}>
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
          <View style={sharedStyles.dateTextContainer}>
            {moment(day).format("YYYYMMDD") ==
            moment(today).format("YYYYMMDD") ? (
              <Text style={[sharedStyles.dateText, styles.textColor]}>
                Today
              </Text>
            ) : (
              <Text style={[sharedStyles.dateText, styles.textColor]}>
                {day.toDateString().slice(4, -5)}
              </Text>
            )}
          </View>
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
            <Text style={[sharedStyles.trackerTitle, styles.textColor]}>
              Diet
            </Text>
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
          <Text style={[styles.desc, styles.textColor]}>
            <Text style={[styles.boldText, styles.textColor]}>
              {Math.round(totalMacros.calorieCount * energyMultiplier)}
            </Text>{" "}
            / {dietGoals["calorieGoal"]["value"]}{" "}
            {dietGoals["calorieGoal"]["units"]}
          </Text>
        </>
      )}

      {trackingPreferences.fitnessSelected && (
        <>
          <View style={[sharedStyles.trackerDashView]}>
            <Text style={[sharedStyles.trackerTitle, styles.textColor]}>
              Fitness
            </Text>
          </View>

          <TouchableOpacity style={styles.addBtn}>
            <Image
              style={[styles.plus]}
              source={require("../../assets/images/add-excercise.png")}
            />
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const generateStyle = (theme) => {
  return StyleSheet.create({
    plus: {
      width: 70,
      height: 70,
      tintColor: ValueSheet.colours[theme].primaryColour,
    },
    textColor: {
      color: ValueSheet.colours[theme].primaryColour,
    },
    desc: {
      fontSize: 22,
      fontFamily: ValueSheet.fonts.primaryFont,
    },
    boldText: {
      fontFamily: ValueSheet.fonts.primaryBold,
      fontSize: 26,
    },
    addBtn: {
      borderWidth: 2,
      borderColor: ValueSheet.colours[theme].borderGrey,
      borderRadius: 20,
      backgroundColor: ValueSheet.colours[theme].backgroundVariation,
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
      borderColor: ValueSheet.colours[theme].borderGrey,
      backgroundColor: ValueSheet.colours[theme].borderGrey,
      marginHorizontal: 30,
      borderRadius: 5,
      marginBottom: 10,
    },
    filler: {
      backgroundColor: ValueSheet.colours[theme].secondaryColour,
      maxWidth: "100%",
      height: "100%",
    },
    imageContainer: {
      backgroundColor: ValueSheet.colours[theme].purple,
      borderColor: ValueSheet.colours[theme].borderPurple70,
    },
  });
};
