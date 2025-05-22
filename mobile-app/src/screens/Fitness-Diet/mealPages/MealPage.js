//TOFO: figure out which imports are needed and which are redundant
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
//import navigationService from "../../../navigators/navigationService";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";

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
                <Text style={styles.textStyle}>Calories</Text>
                </TouchableOpacity>
                <View style={styles.macroSection}>
                    <TouchableOpacity style={styles.macros}>
                    <Text style={styles.textStyle}>Carbs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.macros}>
                        <Text style={styles.textStyle}>Protein</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.macros}>
                        <Text style={styles.textStyle}>Fats</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addFood}>
                    <Text style={styles.textStyle}>Add Food</Text>
                </TouchableOpacity>
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
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 100,
  },
  macros: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  addFood: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
  imageCon: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "#CCCCCC",
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
  },
  title: {
    fontSize: 45,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  bigButtons: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
    height: 60,
    borderRadius: 20,
    marginTop: 0,
  },
  center: {
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
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
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});

export default MealPage;