import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

//TO DOs:
//1. replace serving from textinput to dropdown - requires an import :D
//2. make a call to the api to get further details like serving options (?) or just use the measurement given
//3. recalculate

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

export default function AddEntryModal({ isVisible, setVisible, foodItem }) {
  const [quantity, setQuantity] = useState(`${foodItem.quantity}`);
  const [serving, setServing] = useState(`${foodItem.measurement}`);
  var currentMacros = {
    Fats: (foodItem.fatCount / foodItem.quantity) * quantity,
    Protein: (foodItem.carbCount / foodItem.quantity) * quantity,
    Carbs: (foodItem.proteinCount / foodItem.quantity) * quantity,
    Calories: (foodItem.calorieCount / foodItem.quantity) * quantity,
  };

  return (
    <RNModal
      visible={isVisible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropOpacity={0}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>{foodItem.name} </Text>
        <View style={styles.serving}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Serving Size: </Text>
            <TextInput
              style={[styles.borderedContainer, styles.input]}
              onChangeText={setServing}
              value={serving}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowText}>Quantity: </Text>
            <TextInput
              style={[styles.borderedContainer, styles.input]}
              inputMode="numeric"
              onChangeText={setQuantity}
              value={quantity}
            />
          </View>
        </View>

        {macroTitles.map((item, index) => (
          <View
            key={index}
            style={[styles.borderedContainer, styles.macroContainer]}
          >
            <View style={styles.row}>
              <Image style={styles.icon} source={item.icon} />
              <Text style={styles.buttonText}>{item.name}</Text>
            </View>

            <Text style={[styles.rowText, { fontFamily: "Sego-Bold" }]}>
              {currentMacros[item.name]} {item.measurement}
            </Text>
          </View>
        ))}

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.borderedContainer]}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text style={[styles.buttonText]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.borderedContainer,
              { backgroundColor: "#D7F6FF" },
            ]}
            onPress={() => {
              console.log(foodItem);
            }}
          >
            <Text style={[styles.buttonText]}>Save</Text>
          </TouchableOpacity>
        </View>
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
  borderedContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    alignItems: "center",
    padding: 5,
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
    fontFamily: "Sego-Bold",
    fontSize: 33,
    color: "#25436B",
    alignSelf: "center",
  },
  rowText: {
    fontSize: 24,
    color: "#25436B",
    fontFamily: "Sego",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    justifyContent: "space-between",
  },
  icon: {
    height: 30,
    width: 30,
  },
  button: {
    width: "45%",
    alignContent: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Sego",
    color: "#25436B",
  },
  macroContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
  },
  input: {
    width: "40%",
    fontSize: 18,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
  serving: {
    marginBottom: 20,
  },
});
