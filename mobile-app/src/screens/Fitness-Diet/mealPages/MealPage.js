//TOFO: figure out which imports are needed and which are redundant
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

//TODO: set up consts for the sections/button looking things for the macros

const MealPage = (props) => {
    //TODO: determine state vars needed, if any 
    //TODO: determine props needed, if any

  //TODO: configure async function for "add food" button --> just add a hardcoded food item for now
  //TODO: configure async function for trash icon on food item --> remove the food icon for now
  //TODO: configure async function for back button (< in top left of page)
  //no toasts needed?

  //TODO: configure jsx for visuals
    //top blue area with meal name and date 
    //the rest with the white background beneath it

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topArea}>
                <TouchableOpacity>
                    <Image style={styles.backArrow} source={require("../../../assets/images/back-arrow.png")}></Image>
                </TouchableOpacity>
                <View style={styles.topAreaBody}>
                    <View style={styles.mealHeader}>
                        <Image style={styles.mealIcon} source={require("../../../assets/images/breakfast.png")}></Image>
                        <Text style={styles.title}>Meal</Text>
                    </View>
                    <Text style={styles.textStyle}>January 1, 2025</Text>
                </View>
            </View>
            <View style={styles.mainArea}> 
                <TouchableOpacity style={styles.calories}>
                    <Image style={styles.mealIcon} source={require("../../../assets/images/calories.png")}></Image>
                    <View style={styles.calorieText}>
                        <Text style={styles.caloriesLabel}>Calories</Text>
                        <View style={styles.calorieInfo}>                        
                            <Text style={styles.caloriesAmount}>99999</Text>
                            <Text style={styles.caloriesUnit}>kcal</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.macroSection}>
                    <TouchableOpacity style={styles.macros}>
                        <Image style={styles.macroIcon} source={require("../../../assets/images/carbs.png")}></Image>
                        <Text style={styles.textStyle}>Carbs</Text>
                        <Text style={styles.macroAmount}>0</Text>
                        <Text style={styles.macroUnit}>g</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.macros}>
                        <Image style={styles.macroIcon} source={require("../../../assets/images/protein.png")}></Image>
                        <Text style={styles.textStyle}>Protein</Text>
                        <Text style={styles.macroAmount}>0</Text>
                        <Text style={styles.macroUnit}>g</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.macros}>
                        <Image style={styles.macroIcon} source={require("../../../assets/images/fats.png")}></Image>
                        <Text style={styles.textStyle}>Fats</Text>
                        <Text style={styles.macroAmount}>0</Text>
                        <Text style={styles.macroUnit}>g</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSection}>
                    <TouchableOpacity style={styles.addFood}>
                        <Text style={styles.textStyle}>Add Food</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  topArea: {
    backgroundColor: "#D7F6FF",
    flex: 1,
  },
  mainArea: {
    backgroundColor: "#fff",
    flex: 3,
    minWidth: 0,
    justifyContent: "flex-start",
    padding: 20,
  },
  calories: {
    flexDirection: "row",
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 100,
    padding: 10,
  },
  macros: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    marginBottom: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    padding: 10,
  },
  buttonSection: {
    alignItems: "center",
    marginTop: 50,
  },
  addFood: {
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: "#D7F6FF",
    borderColor: "rgba(172, 197, 204, 0.75)",
    width: "50%",
  },
  topAreaBody: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 30,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  macroSection: {
    marginTop: 30,
  },
  calorieText: {
    alignItems: "center",
    width: "75%",
  },
  title: {
    fontSize: 45,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    textAlign: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
  },
  macroAmount: {
    fontSize: 20,
    fontFamily: "Sego",
    position: "absolute", right: 0,
    marginRight: 35,
    color: "#25436B",
  },
  macroUnit: {
    fontSize: 20,
    fontFamily: "Sego",
    position: "absolute", right: 0,
    marginRight: 15,
    color: "#25436B",
  },
  caloriesLabel: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
  },
  calorieInfo: {
    flexDirection: "row",
  },
  caloriesAmount: {
    fontSize: 25,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginRight: 15,
  },
  caloriesUnit: {
    fontSize: 25,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
  backArrow: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  mealIcon: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  macroIcon: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});

export default MealPage;