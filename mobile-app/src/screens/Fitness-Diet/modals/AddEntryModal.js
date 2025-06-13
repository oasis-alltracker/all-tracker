import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";

//TO DOs:
//1. replace serving from textinput to dropdown - requires an import as select component isnt built into react
//2. maybe: make a call to the api to get further details like serving options (?) - will need to decide later as we integrate with our selected third party database
//3. send api call to save entry that when "add" is pressed

const macroTitles = [
  {
    name: "Calories",
    icon: require("../../../assets/images/calories.png"),
    measurement: "cal",
  },
  {
    name: "Carbs",
    icon: require("../../../assets/images/carbs.png"),
    measurement: "g",
  },
  {
    name: "Protein",
    icon: require("../../../assets/images/protein.png"),
    measurement: "g",
  },
  {
    name: "Fats",
    icon: require("../../../assets/images/fats.png"),
    measurement: "g",
  },
];

export default function AddEntryModal({ getRef }) {
  const [isVisible, setVisible] = useState(false);
  const [foodEntry, setFoodEntry] = useState({
    calorieCount: 0,
    carbCount: 0,
    fatCount: 0,
    meal: "dinner",
    measurement: "cup",
    name: "",
    proteinCount: 0,
    quantity: 1,
  });

  const [quantity, setQuantity] = useState();
  const [serving, setServing] = useState();
  var currentMacros = {
    Fats: ((foodEntry.fatCount / foodEntry.quantity) * quantity).toFixed(0),
    Protein: ((foodEntry.carbCount / foodEntry.quantity) * quantity).toFixed(0),
    Carbs: ((foodEntry.proteinCount / foodEntry.quantity) * quantity).toFixed(
      0
    ),
    Calories: (
      (foodEntry.calorieCount / foodEntry.quantity) *
      quantity
    ).toFixed(0),
  };

  useEffect(() => {
    let ref = {
      open(foodEntry) {
        setQuantity(`${foodEntry.quantity}`);
        setServing(`${foodEntry.measurement}`);
        setFoodEntry(foodEntry);
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  return (
    <RNModal
      isVisible={isVisible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropOpacity={0}
      style={styles.modal}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titleText}>{foodEntry.name} </Text>
          <View style={styles.serving}>
            <View style={styles.row}>
              <Text style={styles.rowText}>Serving Size: </Text>
              <TextInput
                style={[styles.borderedContainer, styles.input]}
                onChangeText={setServing}
                value={serving}
                textAlign={"center"}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>Quantity: </Text>
              <TextInput
                style={[styles.borderedContainer, styles.input]}
                inputMode="numeric"
                onChangeText={setQuantity}
                value={quantity}
                textAlign={"center"}
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
                setVisible(false);
                navigationService.navigate("fitness-diet");
              }}
            >
              <Text style={[styles.buttonText]}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    justifyContent: "space-between",
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
