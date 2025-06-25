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
import FoodEntriesAPI from "../../../api/diet/foodEntriesAPI";
import { getAccessToken } from "../../../user/keychain";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import DropDownPicker from "react-native-dropdown-picker";

//TO DOs:
//1. replace serving from textinput to dropdown - requires an import as select component isnt built into react
//2. maybe: make a call to the api to get further details like serving options (?) - will need to decide later as we integrate with our selected third party database

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

export default function AddEntryModal({
  getRef,
  mealName,
  day,
  prevPage,
  meal,
}) {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  var currentMacros = {
    Fats: +((foodEntry.fatCount / foodEntry.quantity) * quantity).toFixed(2),
    Protein: +((foodEntry.carbCount / foodEntry.quantity) * quantity).toFixed(
      2
    ),
    Carbs: +((foodEntry.proteinCount / foodEntry.quantity) * quantity).toFixed(
      2
    ),
    Calories: +(
      (foodEntry.calorieCount / foodEntry.quantity) *
      quantity
    ).toFixed(2),
  };

  const [quantity, setQuantity] = useState();
  const [serving, setServing] = useState();
  const [servingOptions, setOptions] = useState();
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedServing, setSelected] = useState(null);

  useEffect(() => {
    let ref = {
      open(foodEntry) {
        setQuantity(`${+foodEntry.quantity}`);
        setServing(`${foodEntry.measurement}`);
        setOptions([{ label: foodEntry.measurement, value: null }]);
        setFoodEntry(foodEntry);
        setVisible(true);
        //serving work!
        //step 1: identify if this is a search result - by seeing if the altServings field is populated
        //step 2: IF it is -> create a dropdown

        //real step 1: try to make a dropdown
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  const add2Decimals = (num1, num2) => {
    return (num1 * 100 + num2 * 100) / 100;
  };

  const addFoodEntry = async () => {
    try {
      var newFoodEntry = {
        name: foodEntry.name,
        meal: mealName.toLowerCase(),
        calorieCount: currentMacros.Calories,
        fatCount: currentMacros.Fats,
        foodItemID: foodEntry.foodItemID,
        proteinCount: currentMacros.Protein,
        carbCount: currentMacros.Carbs,
        quantity: +quantity,
        measurement: serving,
        dateStamp: moment(day).format("YYYYMMDD"),
      };
      setIsLoading(true);
      token = await getAccessToken();
      await FoodEntriesAPI.createFoodEntry(token, newFoodEntry);

      setIsLoading(false);
      setVisible(false);

      var params = {
        refreshMeal: mealName.toLowerCase(),
      };

      if (prevPage == "mealPage") {
        meal.calorieCount = add2Decimals(
          meal.calorieCount,
          newFoodEntry.calorieCount
        );
        meal.proteinCount = add2Decimals(
          meal.proteinCount,
          newFoodEntry.proteinCount
        );
        meal.carbCount = add2Decimals(meal.carbCount, newFoodEntry.carbCount);
        meal.fatCount = add2Decimals(meal.fatCount, newFoodEntry.fatCount);
        meal.entries.push(newFoodEntry);

        params["dateString"] = day.toLocaleDateString();
        params["mealName"] = mealName;
        params["meal"] = meal;
      }

      navigationService.navigate(prevPage, params);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

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
          <Spinner visible={isLoading}></Spinner>
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
            <DropDownPicker
              open={selectOpen}
              value={selectedServing}
              items={servingOptions}
              setOpen={setSelectOpen}
              setValue={setSelected}
              setItems={setOptions}
              onSelectItem={(value) => {
                console.log(value);
              }}
              placeholder={selectedServing}
            />
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
                addFoodEntry();
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
    padding: 20,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  titleText: {
    fontFamily: "Sego-Bold",
    fontSize: 33,
    color: "#25436B",
    alignSelf: "left",
    marginBottom: 15,
  },
  rowText: {
    fontSize: 22,
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
    marginTop: 20,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: "Sego",
    color: "#25436B",
  },
  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  input: {
    width: "40%",
    fontSize: 20,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
  serving: {
    marginBottom: 20,
  },
});
