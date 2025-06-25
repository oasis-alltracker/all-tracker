import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import navigationService from "../../navigators/navigationService";
import moment from "moment";
import { sharedStyles } from "../styles";
import * as Progress from "react-native-progress";
import EditMacroGoalsModal from "./modals/EditMacroGoalsModal";

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
  const editMacroGoalsRef = useRef(null);
  const calorieDif = dietGoals.calorieGoal.value - totalMacros.calorieCount;
  const colours = ["#ACC5CC", "#D7F6FF", "#76BBCF", "#008ab3"];

  const EmptyMeal = ({ item }) => (
    <TouchableOpacity
      style={styles.borderedContainer}
      onPress={() => {
        navigationService.navigate("mealPage", {
          dateString: day.toLocaleDateString(),
          mealName: item.name,
          meal: meals[item.name],
        });
      }}
    >
      <View style={[styles.row, { marginBottom: 0 }]}>
        <Text style={styles.itemText}>{item?.name}</Text>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate("searchFood", {
              mealName: item?.name,
              dayString: day.toISOString(),
            });
          }}
        >
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const MealWithEntries = ({ item }) => (
    <TouchableOpacity
      style={styles.borderedContainer}
      onPress={() => {
        navigationService.navigate("mealPage", {
          dateString: day.toLocaleDateString(),
          mealName: item.name,
          meal: meals[item.name],
        });
      }}
    >
      <View style={styles.row}>
        <Text style={styles.itemText}>{item.name}</Text>
        <TouchableOpacity>
          <Image
            style={styles.plus}
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
            style={[styles.subItemText, { flexShrink: 1 }]}
          >
            {item.name}
          </Text>
          <Text style={styles.subItemText}>
            {Math.round(item.calorieCount)} {dietGoals.calorieGoal.units}
          </Text>
        </View>
      ))}
      <View style={styles.line} />
      <Text style={[styles.subItemText, { textAlign: "center" }]}>
        {Math.round(meals[item.name].calorieCount)}{" "}
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
          borderColor="#ACC5CC"
        >
          <View style={styles.progressCircleContent}>
            <Text style={[styles.boldText, { fontSize: 22 }]}>
              {totalMacros[item.consumed]}g
            </Text>
            <Text style={styles.miniText}>/{dietGoals[item.goal]}g</Text>
          </View>
        </Progress.Circle>
      </View>
    );
  };

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
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={{ alignItems: "center" }}>
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
              source={require("../../assets/images/diet.png")}
            />
          </View>
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

        <View style={styles.borderedContainer}>
          <View style={styles.row}>
            <Text style={[styles.boldText, { marginBottom: 10 }]}>Macros</Text>
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
                style={styles.plus}
                source={require("../../assets/images/edit.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.miniText}>Eaten</Text>
            <Text style={styles.miniText}>
              {calorieDif > 0 ? "Remaining" : "Exceeded"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.desc}>
              <Text style={styles.boldText}>{totalMacros.calorieCount}</Text>{" "}
              kcal
            </Text>
            <Text style={styles.boldText}>{Math.abs(calorieDif)}</Text>
          </View>
          <CalorieBar />
          <View style={[styles.row, { gap: 10 }]}>
            {macroKeys.map((item, index) => (
              <View style={styles.item} key={index}>
                <MacroProgressCircle item={item} />
                <Text style={styles.desc}>{item.title}</Text>
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
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(202, 189, 255, 65)",
    borderColor: "rgba(162, 151, 204, 0.7)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
    tintColor: "#25436B",
  },
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
  desc: {
    fontSize: 20,
    color: "#25436B",
    fontFamily: "Sego",
  },
  boldText: {
    fontFamily: "Sego-Bold",
    fontSize: 30,
    color: "#25436B",
  },
  miniText: {
    fontFamily: "Sego",
    color: "#25436B",
  },
  addBtn: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    height: 80,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  borderedContainer: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
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
    backgroundColor: "#D7F6FF",
    maxWidth: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemText: {
    fontFamily: "Sego",
    fontSize: 32,
    color: "#25436B",
  },
  subItemText: {
    fontFamily: "Sego",
    fontSize: 22,
    color: "#25436B",
  },
  items: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 50,
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
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
