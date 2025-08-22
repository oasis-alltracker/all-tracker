import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useContext } from "react";
import navigationService from "../../navigators/navigationService";
import moment from "moment";
import { sharedStyles } from "../styles";
import * as Progress from "react-native-progress";
import EditMacroGoalsModal from "./modals/EditMacroGoalsModal";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";

const mealTitles = [
  {
    name: "Breakfast",
  },
  {
    name: "Lunch",
  },
  {
    name: "Dinner",
  },
  {
    name: "Snacks",
  },
];

const macroKeys = [
  {
    title: "Carbs",
    goal: "carbGoal",
    consumed: "carbCount",
  },
  {
    title: "Protein",
    goal: "proteinGoal",
    consumed: "proteinCount",
  },
  {
    title: "Fats",
    goal: "fatGoal",
    consumed: "fatCount",
  },
];

const today = new Date();

export default function Diet({
  trackingPreferences,
  day,
  updateDate,
  meals,
  dietGoals,
  totalMacros,
  updateGoals,
}) {
  const energyMultiplier = dietGoals.calorieGoal.units == "kcal" ? 1 : 4.184;
  const editMacroGoalsRef = useRef(null);
  const calorieDif = Math.round(
    dietGoals.calorieGoal.value - totalMacros.calorieCount * energyMultiplier
  );
  const theme = useContext(ThemeContext).value;
  const colours = [
    ValueSheet.colours[theme].borderGrey,
    ValueSheet.colours[theme].secondaryColour,
    ValueSheet.colours[theme].progressLightTeal,
    ValueSheet.colours[theme].progressTeal,
  ];

  const EmptyMeal = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.borderedContainer,
        sharedStyles["borderedContainer_" + theme],
      ]}
      onPress={() => {
        navigationService.navigate("mealPage", {
          dateString: day.toLocaleDateString(),
          mealName: item.name,
          meal: meals[item.name],
          dietUnit: dietGoals.calorieGoal.units,
        });
      }}
    >
      <View style={[styles.row, { marginBottom: 0 }]}>
        <Text style={[styles.itemText, sharedStyles["textColour_" + theme]]}>
          {item?.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate("searchFood", {
              mealName: item?.name,
              dayString: day.toISOString(),
              dietUnit: dietGoals.calorieGoal.units,
            });
          }}
        >
          <Image
            style={[styles.plus, sharedStyles["tint_" + theme]]}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const MealWithEntries = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.borderedContainer,
        sharedStyles["borderedContainer_" + theme],
      ]}
      onPress={() => {
        navigationService.navigate("mealPage", {
          dateString: day.toLocaleDateString(),
          mealName: item.name,
          meal: meals[item.name],
          dietUnit: dietGoals.calorieGoal.units,
        });
      }}
    >
      <View style={styles.row}>
        <Text style={[styles.itemText, sharedStyles["textColour_" + theme]]}>
          {item.name}
        </Text>
        <TouchableOpacity>
          <Image
            style={[styles.plus, sharedStyles["tint_" + theme]]}
            source={require("../../assets/images/edit.png")}
          />
        </TouchableOpacity>
      </View>
      {meals[item.name].entries.map((item, index) => (
        <View
          style={[styles.row, { marginBottom: 4, gap: 5, flex: 1 }]}
          key={index}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              styles.subItemText,
              sharedStyles["textColour_" + theme],
              { flexShrink: 1 },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.subItemText, sharedStyles["textColour_" + theme]]}
          >
            {Math.round(item.calorieCount * energyMultiplier)}{" "}
            {dietGoals.calorieGoal.units}
          </Text>
        </View>
      ))}
      <View style={[styles.line, styles["line_" + theme]]} />
      <Text
        style={[
          styles.subItemText,
          sharedStyles["textColour_" + theme],
          { textAlign: "center" },
        ]}
      >
        {Math.round(meals[item.name].calorieCount * energyMultiplier)}{" "}
        {dietGoals.calorieGoal.units}
      </Text>
    </TouchableOpacity>
  );

  const MacroProgressCircle = ({ item }) => {
    var percentage = (
      totalMacros[item.consumed] / dietGoals[item.goal]
    ).toFixed(1);
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
      <View>
        <Progress.Circle
          progress={percentage % 1}
          strokeCap="round"
          size={93}
          thickness={9}
          unfilledColor={innerColor}
          color={outerColor}
          borderWidth={1}
          borderColor={ValueSheet.colours[theme].borderGrey}
        >
          <View style={styles.progressCircleContent}>
            <Text
              style={[
                styles.boldText,
                sharedStyles["textColour_" + theme],
                { fontSize: 22 },
              ]}
            >
              {totalMacros[item.consumed]}g
            </Text>
            <Text
              style={[styles.miniText, sharedStyles["textColour_" + theme]]}
            >
              /{dietGoals[item.goal]}g
            </Text>
          </View>
        </Progress.Circle>
      </View>
    );
  };

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
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              sharedStyles.headerImageContainer,
              styles.imageContainer,
              sharedStyles["tint_" + theme],
              sharedStyles["purpleContainer_" + theme],
            ]}
          >
            <Image
              style={sharedStyles.headerImage}
              source={require("../../assets/images/diet.png")}
            />
          </View>
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

        <View
          style={[
            styles.borderedContainer,
            sharedStyles["borderedContainer_" + theme],
          ]}
        >
          <View style={styles.row}>
            <Text
              style={[
                styles.boldText,
                sharedStyles["textColour_" + theme],
                { marginBottom: 10 },
              ]}
            >
              Macros
            </Text>
            <TouchableOpacity
              onPress={() => {
                editMacroGoalsRef.current.open({
                  calorieGoalUnits: dietGoals.calorieGoal.units,
                  calorieGoalValue: dietGoals.calorieGoal.value,
                  carbGoal: dietGoals.carbGoal,
                  fatGoal: dietGoals.fatGoal,
                  proteinGoal: dietGoals.proteinGoal,
                });
              }}
            >
              <Image
                style={[styles.plus, sharedStyles["tint_" + theme]]}
                source={require("../../assets/images/edit.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text
              style={[styles.miniText, sharedStyles["textColour_" + theme]]}
            >
              Eaten
            </Text>
            <Text
              style={[styles.miniText, sharedStyles["textColour_" + theme]]}
            >
              {calorieDif > 0 ? "Remaining" : "Exceeded"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.desc, sharedStyles["textColour_" + theme]]}>
              <Text
                style={[styles.boldText, sharedStyles["textColour_" + theme]]}
              >
                {Math.round(totalMacros.calorieCount * energyMultiplier)}
              </Text>{" "}
              {dietGoals.calorieGoal.units}
            </Text>
            <Text
              style={[styles.boldText, sharedStyles["textColour_" + theme]]}
            >
              {Math.abs(calorieDif)}
            </Text>
          </View>
          <CalorieBar />
          <View style={[styles.row, { gap: 10 }]}>
            {macroKeys.map((item, index) => (
              <View style={styles.item} key={index}>
                <MacroProgressCircle item={item} />
                <Text
                  style={[styles.desc, sharedStyles["textColour_" + theme]]}
                >
                  {item.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {mealTitles.map((item, index) =>
          meals[item.name].entries.length > 0 ? (
            <MealWithEntries item={item} key={index} />
          ) : (
            <EmptyMeal item={item} key={index} />
          )
        )}
      </ScrollView>
      <EditMacroGoalsModal
        getRef={(ref) => (editMacroGoalsRef.current = ref)}
        updateGoals={updateGoals}
        selectedTrackers={trackingPreferences}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  plus: {
    width: 40,
    height: 40,
  },
  desc: {
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  boldText: {
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 30,
  },
  miniText: {
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  borderedContainer: {
    borderWidth: 2,
    borderRadius: 40,
    marginHorizontal: 20,
    marginTop: 30,
    padding: 20,
  },
  progress: {
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 50,
  },
  filler: {
    maxWidth: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemText: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 32,
  },
  subItemText: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 22,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  progressCircleContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  line_dark: {
    borderBottomColor: ValueSheet.colours.dark.grey,
  },
  line_light: {
    borderBottomColor: ValueSheet.colours.light.grey,
  },
});
