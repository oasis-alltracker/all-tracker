import { useEffect, useState, useRef, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";
import FoodEntriesAPI from "../../../api/diet/foodEntriesAPI";
import { getAccessToken } from "../../../user/keychain";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import DropDownPicker from "react-native-dropdown-picker";
import { ValueSheet } from "../../../ValueSheet";
import UpdateMacrosModal from "../../Setup/Diet/UpdateMacrosModal";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";

const macroTitles = [
  {
    name: "Calories",
    icon: require("../../../assets/images/calories.png"),
    measurement: "cal",
    macro: "calorieCount",
  },
  {
    name: "Carbs",
    icon: require("../../../assets/images/carbs.png"),
    measurement: "g",
    macro: "carbCount",
  },
  {
    name: "Protein",
    icon: require("../../../assets/images/protein.png"),
    measurement: "g",
    macro: "proteinCount",
  },
  {
    name: "Fats",
    icon: require("../../../assets/images/fats.png"),
    measurement: "g",
    macro: "fatCount",
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
  const theme = useContext(ThemeContext).value;
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

  const [macros, setMacros] = useState({
    calorieCount: 0,
    carbCount: 0,
    fatCount: 0,
    proteinCount: 0,
  });
  const [prevQuantity, setPrevQuantity] = useState(0);
  const editedMacros = useRef(false);

  const [energyMultiplier, setMultiplier] = useState(1);
  const [dietUnit, setDietUnit] = useState("kcal");

  useEffect(() => {
    let ref = {
      open(foodEntry, dietUnit) {
        setDietUnit(dietUnit);
        var tempEnergyMultiplier = dietUnit == "kcal" ? 1 : 4.184;
        setMultiplier(tempEnergyMultiplier);

        setFoodEntry(foodEntry);
        setVisible(true);
        setSelectOpen(false);

        //serving options related
        var details = [];
        var options = foodEntry.servingsDetails;
        options = options.map((item, index) => {
          details.push(item);
          return { label: item.measurement, value: index };
        });

        if (editing) {
          var convertedMacros = { ...foodEntry };
          convertedMacros.calorieCount = +(
            convertedMacros.calorieCount * tempEnergyMultiplier
          ).toFixed(2);

          editedMacros.current = false;
          setLabels(options);
          setSelectedServing(
            options.find((element) => element.label == foodEntry.measurement)
              ?.value
          );
          setMacros(convertedMacros);
          setQuantity(`${+foodEntry.quantity}`);
          setPrevQuantity(`${+foodEntry.quantity}`);
          setServing(`${foodEntry.measurement}`);
          setDetails(details);
        } else {
          var index = options.findIndex(
            (element) => element.label == foodEntry.measurement
          );
          var convertedMacros = { ...details[index] };
          convertedMacros.calorieCount = +(
            convertedMacros.calorieCount * tempEnergyMultiplier
          ).toFixed(2);

          setLabels(options);
          setSelectedServing(options[index].value);
          setMacros(convertedMacros);
          setQuantity("1");
          setPrevQuantity("1");
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
    num1 = Number(num1);
    num2 = Number(num2);
    return (num1 * 100 + num2 * 100) / 100;
  };

  const onAddFoodEntry = async () => {
    try {
      var newFoodEntry = {
        name: foodEntry.name,
        meal: mealName.toLowerCase(),
        calorieCount: +(macros.calorieCount / energyMultiplier).toFixed(2),
        fatCount: macros.fatCount,
        foodItemID: foodEntry.foodItemID,
        proteinCount: macros.proteinCount,
        carbCount: macros.carbCount,
        quantity: +quantity,
        measurement: serving,
        dateStamp: moment(day).format("YYYYMMDD"),
        servingsDetails: servingsDetails,
      };
      setIsLoading(true);
      token = await getAccessToken();
      response = await FoodEntriesAPI.createFoodEntry(token, newFoodEntry);

      var params = {
        refreshMeal: mealName.toLowerCase(),
      };

      if (prevPage == "mealPage") {
        newFoodEntry.SK = response.ID;

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
        params["dietUnit"] = dietUnit;
      }

      setIsLoading(false);
      setVisible(false);

      navigationService.navigate(prevPage, params);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const updateMealMacro = (origTotal, origVal, newVal) => {
    return Number((origTotal - origVal + newVal).toFixed(2));
  };

  const onEditSave = async () => {
    try {
      if (
        editedMacros.current == true ||
        foodEntry.measurement != serving ||
        foodEntry.quantity != quantity
      ) {
        var updatedEntry = {
          name: foodEntry.name,
          calorieCount: +(macros.calorieCount / energyMultiplier).toFixed(2),
          fatCount: +macros.fatCount,
          foodItemID: foodEntry.foodItemID,
          proteinCount: +macros.proteinCount,
          carbCount: +macros.carbCount,
          quantity: +quantity,
          measurement: serving,
        };
        setIsLoading(true);
        token = await getAccessToken();
        await FoodEntriesAPI.updateFoodEntry(token, foodEntry.SK, updatedEntry);

        var updatedMeal = { ...meal };
        updatedEntry.SK = foodEntry.SK;
        updatedEntry.PK = foodEntry.PK;
        updatedEntry.servingsDetails = servingsDetails;

        var index = updatedMeal.entries.indexOf(foodEntry);
        updatedMeal.entries[index] = updatedEntry;

        updatedMeal.calorieCount = updateMealMacro(
          meal.calorieCount,
          foodEntry.calorieCount,
          updatedEntry.calorieCount
        );
        updatedMeal.proteinCount = updateMealMacro(
          meal.proteinCount,
          foodEntry.proteinCount,
          updatedEntry.proteinCount
        );
        updatedMeal.fatCount = updateMealMacro(
          meal.fatCount,
          foodEntry.fatCount,
          updatedEntry.fatCount
        );
        updatedMeal.carbCount = updateMealMacro(
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

  const onEditMacroValue = (title, value) => {
    var index;
    value = Number(value);
    value = +value.toFixed(2);
    if (title == "Calories") index = "calorieCount";
    else if (title == "Carbs") index = "carbCount";
    else if (title == "Protein") index = "proteinCount";
    else if (title == "Fats") index = "fatCount";
    if (macros[index] != value) {
      editedMacros.current = true;

      var newMacros = { ...macros };
      newMacros[index] = value;
      setMacros(newMacros);
    }
  };

  const recalMacrosByQuantity = () => {
    if (!isNaN(Number(quantity)) && Number(quantity) > 0) {
      var newMacros = {
        calorieCount: +(
          (macros.calorieCount / prevQuantity) *
          quantity
        ).toFixed(2),
        carbCount: +((macros.carbCount / prevQuantity) * quantity).toFixed(2),
        fatCount: +((macros.fatCount / prevQuantity) * quantity).toFixed(2),
        proteinCount: +(
          (macros.proteinCount / prevQuantity) *
          quantity
        ).toFixed(2),
      };
      setMacros(newMacros);
      setPrevQuantity(quantity);
    } else {
      setQuantity(prevQuantity);
      Toast.show({
        type: "info",
        text1: "Invalid quantity",
        text2: "Please enter a valid number greater than 0.",
        topOffset: 15,
        visibilityTime: 2500,
      });
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
      <SafeAreaView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setSelectOpen(false);
          }}
        >
          <View
            style={[styles.container, sharedStyles["modalBackground_" + theme]]}
          >
            <Text
              style={[styles.titleText, sharedStyles["textColour_" + theme]]}
              adjustsFontSizeToFit={true}
              numberOfLines={2}
            >
              {foodEntry.name}
            </Text>
            <Spinner visible={isLoading}></Spinner>
            <View style={styles.serving}>
              <View style={[styles.row, { zIndex: 1000 }]}>
                <Text
                  style={[styles.rowText, sharedStyles["textColour_" + theme]]}
                >
                  Serving:{" "}
                </Text>
                <View style={{ width: "60%" }}>
                  <DropDownPicker
                    open={selectOpen}
                    setOpen={setSelectOpen}
                    value={selectedServing}
                    setValue={setSelectedServing}
                    items={servingLabels}
                    onSelectItem={(item) => {
                      setServing(item.label);
                      var convertedMacros = { ...servingsDetails[item.value] };
                      convertedMacros.calorieCount = +(
                        convertedMacros.calorieCount * energyMultiplier
                      ).toFixed(2);
                      setMacros(convertedMacros);
                      setQuantity("1");
                      setPrevQuantity("1");
                    }}
                    onOpen={() => Keyboard.dismiss()}
                    style={[
                      styles.borderedContainer,
                      sharedStyles["borderedContainer_" + theme],
                    ]}
                    dropDownContainerStyle={[
                      styles.dropdownContainer,
                      sharedStyles["borderedContainer_" + theme],
                    ]}
                    textStyle={[
                      styles.selectText,
                      sharedStyles["textColour_" + theme],
                    ]}
                    itemSeparator={true}
                    itemSeparatorStyle={{
                      backgroundColor: ValueSheet.colours[theme].borderGrey75,
                    }}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <Text
                  style={[styles.rowText, sharedStyles["textColour_" + theme]]}
                >
                  Quantity:{" "}
                </Text>
                <TextInput
                  style={[
                    styles.borderedContainer,
                    styles.input,
                    sharedStyles["textColour_" + theme],
                    sharedStyles["borderedContainer_" + theme],
                  ]}
                  inputMode="decimal"
                  onChangeText={setQuantity}
                  value={quantity}
                  textAlign={"center"}
                  onEndEditing={recalMacrosByQuantity}
                />
              </View>
            </View>

            {macroTitles.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.borderedContainer,
                  styles.macroContainer,
                  sharedStyles["borderedContainer_" + theme],
                ]}
              >
                <View style={styles.row}>
                  <Image
                    style={[styles.icon, sharedStyles["tint_" + theme]]}
                    source={item.icon}
                  />
                  <Text
                    style={[
                      styles.rowText,
                      sharedStyles["textColour_" + theme],
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text
                    style={[
                      styles.rowText,
                      sharedStyles["textColour_" + theme],
                      { fontFamily: ValueSheet.fonts.primaryBold },
                    ]}
                  >
                    {macros[item.macro]}{" "}
                    {item.name == "Calories" ? dietUnit : item.measurement}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      updateMacrosRef.current.open({
                        title: item.name,
                        isCal: false,
                        units: item.measurement,
                        value: `${macros[item.macro]}`,
                        isEntry: true,
                        icon: item.icon,
                      });
                    }}
                  >
                    <Image
                      style={[styles.icon, sharedStyles["tint_" + theme]]}
                      source={require("../../../assets/images/edit.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.borderedContainer,
                  sharedStyles["borderedContainer_" + theme],
                ]}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Text
                  style={[styles.rowText, sharedStyles["textColour_" + theme]]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.borderedContainer,
                  sharedStyles["button_" + theme],
                ]}
                onPress={() => {
                  editing == false ? onAddFoodEntry() : onEditSave();
                }}
              >
                <Text
                  style={[styles.rowText, sharedStyles["textColour_light"]]}
                >
                  {editing == true ? "Save" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
            <UpdateMacrosModal
              getRef={(ref) => (updateMacrosRef.current = ref)}
              onUpdateMacroValue={(title, value, units) => {
                onEditMacroValue(title, value);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <Toast />
      </SafeAreaView>
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
    alignItems: "center",
    padding: 5,
  },
  container: {
    width: "90%",
    padding: 20,
    borderRadius: 30,
    borderWidth: 1,
  },
  titleText: {
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 33,
    alignSelf: "left",
    marginBottom: 15,
  },
  rowText: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    marginHorizontal: 2,
  },
  button: {
    width: "45%",
    alignContent: "center",
    marginTop: 20,
    paddingBottom: 10,
  },
  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    width: "60%",
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  serving: {
    marginBottom: 20,
  },
  selectText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  dropdownContainer: {
    borderColor: ValueSheet.colours.borderGrey75,
    borderWidth: 2,
    maxHeight: 80,
  },
});
