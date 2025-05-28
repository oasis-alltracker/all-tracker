import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import navigationService from "../../navigators/navigationService";
import moment from "moment";
import { sharedStyles } from "../styles";
import MealPage from "./mealPages/MealPage";

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
  day,
  updateDate,
  meals,
  dietGoals,
  totalMacros,
  mealItems,
  setMealItems,
  mealItemCount,
  setMealItemCount, 
  deleteFoodEntry
}) {
  const consumedPercent = `${(totalMacros.calorieCount / dietGoals.calorieGoal.value * 100).toFixed(0)}%`;

  const EmptyMeal = ({ item }) => (
    <TouchableOpacity style={styles.borderedContainer} 
      onPress={() => { 
        console.log("passing into meal page:\n mealItems= " + mealItems +
          "\nmealItemCount= " + mealItemCount +
          "\nsetMealItems= " + setMealItems +
          "\nsetMealItemCount= " + setMealItemCount +
          "\ndeleteFoodEntry= " + deleteFoodEntry);
        navigationService.navigate("mealPage", { 
          mealName: item.name,
          mealItems: mealItems,
          setMealItems: setMealItems,
          mealItemCount: mealItemCount,
          setMealItemCount: setMealItemCount,
          deleteFoodEntry: deleteFoodEntry, }) }}
      >
      <View style={[styles.row, {marginBottom: 0}]}>
        <Text style={styles.itemText}>{item?.name}</Text>
        <TouchableOpacity>
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const MealWithEntries = ({ item }) => (
    <TouchableOpacity style={styles.borderedContainer} 
      onPress={() => { 
        console.log("passing into meal page:\n mealItems= " + mealItems +
          "\nmealItemCount= " + mealItemCount +
          "\nsetMealItems= " + setMealItems +
          "\nsetMealItemCount= " + setMealItemCount +
          "\ndeleteFoodEntry= " + deleteFoodEntry);
        navigationService.navigate("mealPage", { 
          mealName: item.name,
          mealItems: mealItems,
          setMealItems: setMealItems,
          mealItemCount: mealItemCount,
          setMealItemCount: setMealItemCount,
          deleteFoodEntry: deleteFoodEntry, }) }}
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
        <View style={[styles.row, {marginBottom: 4}]} key={index}>
          <Text style={styles.subItemText} >{item.name}</Text>
          <Text style={styles.subItemText}>{item.calorieCount} {dietGoals.calorieGoal.units}</Text>
        </View>
      ))}
      <View style={styles.line} />
      <Text style={[styles.subItemText, { textAlign: "center", }]}>{meals[item.name].calorieCount} {dietGoals.calorieGoal.units}</Text>
    </TouchableOpacity>
  );

  return (
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
          <TouchableOpacity>
            <Image
              style={styles.plus}
              source={require("../../assets/images/edit.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.miniText}>Eaten</Text>
          <Text style={styles.miniText}>Remaining</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.desc}>
            <Text style={styles.boldText}>{totalMacros.calorieCount}</Text> kcal
          </Text>
          <Text style={styles.boldText}>{dietGoals.calorieGoal.value - totalMacros.calorieCount}</Text>
        </View>

        <View style={styles.progress}>
          <View style={[styles.filler, {width: consumedPercent,},]}/>
        </View>
        <View style={[styles.row, { gap: 10 }]}>
          {macroKeys.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={styles.round}>
                <Text style={[
                  styles.boldText,
                  {
                    fontSize: 24,
                  }
                ]}
                >
                  {totalMacros[item.consumed]}g
                </Text>
                <Text style={styles.miniText}>/{dietGoals[item.goal]}g</Text>
              </View>
              <Text style={styles.desc}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {mealTitles.map((item, index) => (
        meals[item.name].entries.length > 0 ? (
          <MealWithEntries item={item} key={index} />
        ) : (
          <EmptyMeal item={item} key={index} />
        )
      ))}
    </ScrollView>
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
    borderColor: "#ACC5CC",
    backgroundColor: "#E4CCFF",
    borderRadius: 5,
    marginBottom: 50,
  },
  filler: {
    backgroundColor: "#D7F6FF",
    width: "70%",
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
  round: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: "#B3B3B3",
    borderRadius: 100,
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
