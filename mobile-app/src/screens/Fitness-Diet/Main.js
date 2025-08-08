import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { sharedStyles } from "../styles";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { Appearance, useColorScheme } from "react-native";

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
  const theme2 = useColorScheme();
  const theme = useContext(ThemeContext);
  const today = new Date();
  const colours = [
    ValueSheet[theme].borderGrey,
    ValueSheet[theme].secondaryColour,
    ValueSheet[theme].progressLightTeal,
    ValueSheet[theme].progressTeal,
  ];
  var [styles, setStyle] = useState(generateStyle("colours"));

  useEffect(() => {
    setStyle(generateStyle(theme));
  }, [theme]);

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
      <View style={[sharedStyles.headerImageContainer, styles.imageContainer]}>
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/body-white.png")}
        />
      </View>
      <Spinner visible={isLoading}></Spinner>

      <View style={sharedStyles.datePickerView}>
        <TouchableOpacity
          style={[
            sharedStyles.changeDateButton,
            { backgroundColor: ValueSheet[theme].secondaryColour },
          ]}
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
            <Text style={[sharedStyles.dateText, styles.textColor]}>Today</Text>
          ) : (
            <Text style={[sharedStyles.dateText, styles.textColor]}>
              {day.toDateString().slice(4, -5)}
            </Text>
          )}
        </>
        <TouchableOpacity
          style={[
            sharedStyles.changeDateButton,
            { backgroundColor: ValueSheet[theme].secondaryColour },
          ]}
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
            <Text style={[sharedStyles.trackerTitle, styles.textColor]}>
              Fitness
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              //prettier-ignore
              Appearance.setColorScheme('dark');
            }}
          >
            <Image
              style={styles.plus}
              source={require("../../assets/images/add-excercise.png")}
            />
          </TouchableOpacity>
        </>
      )}
      <Text>{theme}</Text>
    </ScrollView>
  );
}

const generateStyle = (theme) => {
  return StyleSheet.create({
    plus: {
      width: 70,
      height: 70,
    },
    textColor: {
      color: ValueSheet[theme].primaryColour,
    },
    desc: {
      fontSize: 22,
      color: ValueSheet[theme].primaryColour,
      fontFamily: ValueSheet.fonts.primaryFont,
    },
    boldText: {
      fontFamily: ValueSheet.fonts.primaryBold,
      fontSize: 26,
    },
    addBtn: {
      borderWidth: 2,
      borderColor: ValueSheet[theme].borderGrey,
      borderRadius: 20,
      backgroundColor: ValueSheet[theme].backgroundVariation,
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
      borderColor: ValueSheet[theme].borderGrey,
      backgroundColor: ValueSheet[theme].borderGrey,
      marginHorizontal: 30,
      borderRadius: 5,
      marginBottom: 10,
    },
    progressColorsDark: {},
    filler: {
      backgroundColor: ValueSheet[theme].secondaryColour,
      maxWidth: "100%",
      height: "100%",
    },
    imageContainer: {
      backgroundColor: ValueSheet[theme].purple,
      borderColor: ValueSheet[theme].borderPurple70,
    },
  });
};
