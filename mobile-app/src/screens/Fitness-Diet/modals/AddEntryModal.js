import { useEffect, useState, useRef } from "react";
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
import UpdateMacrosModal from "../../Setup/Diet/UpdateMacrosModal";

//TO DOs:
//1. maybe: make a call to the api to get further details like serving options (?) - will need to decide later as we integrate with our selected third party database

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
  editing = false,
  foodEntriesChangedRef,
  setMeal,
}) {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const updateMacrosRef = useRef(null);
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

  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedServing, setSelectedServing] = useState();
  const [servingLabels, setLabels] = useState();
  const [servingsDetails, setDetails] = useState();
  const [baseMacros, setBaseMacros] = useState({
    calorieCount: 0,
    carbCount: 0,
    fatCount: 0,
    measurement: "cup",
    proteinCount: 0,
    quantity: 1,
  });

  var currentMacros = {
    Fats: +((baseMacros.fatCount / baseMacros.quantity) * quantity).toFixed(2),
    Protein: +(
      (baseMacros.proteinCount / baseMacros.quantity) *
      quantity
    ).toFixed(2),
    Carbs: +((baseMacros.carbCount / baseMacros.quantity) * quantity).toFixed(
      2
    ),
    Calories: +(
      (baseMacros.calorieCount / baseMacros.quantity) *
      quantity
    ).toFixed(2),
  };

  useEffect(() => {
    let ref = {
      open(foodEntry) {
        setFoodEntry(foodEntry);
        setVisible(true);
        setSelectOpen(false);

        //serving options related
        var details = [];
        var options = foodEntry.altServings;
        options = options.map((item, index) => {
          details.push(item);
          return { label: item.measurement, value: index };
        });

        if (editing) {
          setLabels(options);
          setSelectedServing(
            options.find((element) => element.label == foodEntry.measurement)
              ?.value
          );
          setBaseMacros(foodEntry);
          setQuantity(`${+foodEntry.quantity}`);
          setServing(`${foodEntry.measurement}`);
          setDetails(details);
        } else {
          var index = options.findIndex(
            (element) => element.label == foodEntry.measurement
          );
          setLabels(options);
          setSelectedServing(options[index].value);
          setBaseMacros(details[index]);
          setQuantity(`${+details[index].quantity}`);
          setServing(`${details[index].measurement}`);
          setDetails(details);
        }
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
        altServings: servingsDetails,
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

  const updateMacro = (origTotal, orig, newVal) => {
    return Math.round((origTotal - orig + newVal) * 100) / 100;
  };

  const editEntry = async () => {
    try {
      if (foodEntry.measurement != serving || foodEntry.quantity != quantity) {
        var updatedEntry = {
          name: foodEntry.name,
          calorieCount: currentMacros.Calories,
          fatCount: currentMacros.Fats,
          foodItemID: foodEntry.foodItemID,
          proteinCount: currentMacros.Protein,
          carbCount: currentMacros.Carbs,
          quantity: +quantity,
          measurement: serving,
        };
        setIsLoading(true);
        token = await getAccessToken();
        await FoodEntriesAPI.updateFoodEntry(token, foodEntry.SK, updatedEntry);

        var updatedMeal = { ...meal };
        updatedEntry.SK = foodEntry.SK;
        updatedEntry.PK = foodEntry.PK;
        updatedEntry.altServings = servingsDetails;

        var index = updatedMeal.entries.indexOf(foodEntry);
        updatedMeal.entries[index] = updatedEntry;

        updatedMeal.calorieCount = updateMacro(
          meal.calorieCount,
          foodEntry.calorieCount,
          updatedEntry.calorieCount
        );
        updatedMeal.proteinCount = updateMacro(
          meal.proteinCount,
          foodEntry.proteinCount,
          updatedEntry.proteinCount
        );
        updatedMeal.fatCount = updateMacro(
          meal.fatCount,
          foodEntry.fatCount,
          updatedEntry.fatCount
        );
        updatedMeal.carbCount = updateMacro(
          meal.carbCount,
          foodEntry.carbCount,
          updatedEntry.carbCount
        );

        setMeal(updatedMeal);
        foodEntriesChangedRef.current = true;

        setIsLoading(false);
        setVisible(false);
      } else {
        setVisible(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const editMacro = (title, value) => {
    var index;
    if (title == "Calories") index = "calorieCount";
    else if (title == "Carbs") index = "carbCount";
    else if (title == "Protein") index = "proteinCount";
    else if (title == "Fats") index = "fatCount";
    var newBaseMacros = { ...baseMacros };
    //option 1:
    // newBaseMacros[index] = (value / quantity).toFixed(2);
    // setBaseMacros(newBaseMacros);

    //option 2:
    newBaseMacros["calorieCount"] = currentMacros["Calories"];
    newBaseMacros["carbCount"] = currentMacros["Carbs"];
    newBaseMacros["proteinCount"] = currentMacros["Protein"];
    newBaseMacros["fatCount"] = currentMacros["Fats"];
    newBaseMacros[index] = (value / 1).toFixed(2);
    newBaseMacros["quantity"] = quantity;
    setBaseMacros(newBaseMacros);
  };

  return (
    <RNModal
      isVisible={isVisible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropOpacity={0}
      style={styles.modal}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setSelectOpen(false);
        }}
      >
        <View style={styles.container}>
          <Text
            style={styles.titleText}
            adjustsFontSizeToFit={true}
            numberOfLines={2}
          >
            {foodEntry.name}
          </Text>
          <Spinner visible={isLoading}></Spinner>
          <View style={styles.serving}>
            <View style={[styles.row, { zIndex: 1000 }]}>
              <Text style={styles.rowText}>Serving: </Text>
              <View style={{ width: "60%" }}>
                <DropDownPicker
                  open={selectOpen}
                  setOpen={setSelectOpen}
                  value={selectedServing}
                  setValue={setSelectedServing}
                  items={servingLabels}
                  onSelectItem={(item) => {
                    setServing(item.label);
                    setBaseMacros(servingsDetails[item.value]);
                    setQuantity(`${+servingsDetails[item.value].quantity}`);
                  }}
                  onOpen={() => Keyboard.dismiss()}
                  style={[styles.borderedContainer]}
                  dropDownContainerStyle={styles.dropdownContainer}
                  textStyle={styles.selectText}
                  itemSeparator={true}
                  itemSeparatorStyle={{
                    backgroundColor: "rgba(172, 197, 204, 0.75)",
                  }}
                />
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowText}>Quantity: </Text>
              <TextInput
                style={[styles.borderedContainer, styles.input]}
                inputMode="decimal"
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
                <Text style={styles.rowText}>{item.name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={[styles.rowText, { fontFamily: "Sego-Bold" }]}>
                  {currentMacros[item.name]} {item.measurement}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    updateMacrosRef.current.open({
                      title: item.name,
                      isCal: false,
                      units: item.measurement,
                      value: `${currentMacros[item.name]}`,
                      isEntry: true,
                      icon: item.icon,
                    });
                  }}
                >
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/edit.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.borderedContainer]}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={[styles.rowText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.borderedContainer,
                { backgroundColor: "#D7F6FF" },
              ]}
              onPress={() => {
                editing == false ? addFoodEntry() : editEntry();
              }}
            >
              <Text style={[styles.rowText]}>
                {editing == true ? "Save" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
          <UpdateMacrosModal
            getRef={(ref) => (updateMacrosRef.current = ref)}
            onUpdateMacroValue={(title, value, units) => {
              editMacro(title, value);
            }}
          />
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
  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  input: {
    width: "60%",
    fontSize: 20,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
  serving: {
    marginBottom: 20,
  },
  selectText: {
    color: "#25436B",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Sego-Bold",
  },
  dropdownContainer: {
    borderColor: "rgba(172, 197, 204, 0.75)",
    borderWidth: 2,
    maxHeight: 80,
  },
});
