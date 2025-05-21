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
            </View>
            <View style={styles.mainArea}> 
                <TouchableOpacity style={styles.calories}>
                <Text style={styles.textStyle}>Calories</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.macros}>
                    <Text style={styles.textStyle}>Carbs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.macros}>
                    <Text style={styles.textStyle}>Protein</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.macros}>
                    <Text style={styles.textStyle}>Fats</Text>
                </TouchableOpacity>
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
    flex: 0.5,
  },
  mainArea: {
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "space-around"
  },
  calories: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  macros: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 40,
    marginBottom: 35,
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
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});

export default MealPage;