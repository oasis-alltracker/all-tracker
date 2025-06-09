import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";
import { TextInput } from "react-native-gesture-handler";

const macroTitles = [
  {
    name: "Calories",
    icon: require("../../../assets/images/calories.png"),
    measurement: "cal",
    slay: "calorieCount",
  },
  {
    name: "Carbs",
    icon: require("../../../assets/images/carbs.png"),
    measurement: "g",
    slay: "carbCount",
  },
  {
    name: "Protein",
    icon: require("../../../assets/images/protein.png"),
    measurement: "g",
    slay: "proteinCount",
  },
  {
    name: "Fats",
    icon: require("../../../assets/images/fats.png"),
    measurement: "g",
    slay: "fatCount",
  },
];

export default function AddEntryModal({ isVisible, setVisible, foodItem2 }) {
  const foodItem = {
    PK: "basmabdlrzq@gmail.com-foodEntry",
    SK: "20250522-dinner-63902880-358d-11f0-bd82-ddda49483cae",
    calorieCount: 300,
    carbCount: 60,
    fatCount: 0,
    foodItemID: "bcbcbcbc",
    meal: "dinner",
    measurement: "cup",
    name: "sandy",
    proteinCount: 10,
    quantity: 1,
  };
  return (
    <RNModal
      isVisible={true}
      //onBackButtonPress={() => setVisible(false)}
      //onBackdropPress={() => setVisible(false)}
      backdropOpacity={0}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>{foodItem.name} </Text>
        <View style={styles.row}>
          <Text style={styles.titleText}>Serving: </Text>
          <TextInput
            style={{
              width: "30%",
              fontSize: 18,
              borderWidth: 2,
            }}
          />
        </View>

        <Text style={styles.titleText}>Quantity: </Text>

        {macroTitles.map((item, index) => (
          <View key={index} style={styles.macroContainer}>
            <View style={styles.row}>
              <Image style={styles.icon} source={item.icon} />
              <Text style={styles.buttonText}>{item.name}</Text>
            </View>

            <Text style={styles.rowText}>
              {foodItem[item.slay]} {item.measurement}
            </Text>
          </View>
        ))}

        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText]}>Continue</Text>
        </TouchableOpacity>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  titleText: {
    fontFamily: "Sego",
    fontSize: 33,
    color: "#25436B",
    alignSelf: "center",
  },
  rowText: {
    fontSize: 24,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  icon: {
    height: 30,
    width: 30,
  },
  button: {
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    width: "60%",
    padding: 5,
    alignSelf: "center",
    alignContent: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Sego",
    color: "#25436B",
  },
  macroContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    padding: 10,
  },
});
