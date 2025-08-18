import { useState, useEffect, useRef, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";
import UpdateMacrosModal from "../../Setup/Diet/UpdateMacrosModal";
import { ValueSheet } from "../../../ValueSheet";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";

export default function EditMacroGoalsModal({
  getRef,
  updateGoals,
  selectedTrackers,
}) {
  const [datas, setDatas] = useState([
    {
      value: "0 g",
      img: require("../../../assets/images/carbs.png"),
      label: "Carbs:",
    },
    {
      value: "0 g",
      img: require("../../../assets/images/protein.png"),
      label: "Protein:",
    },
    {
      value: "0 g",
      img: require("../../../assets/images/fats.png"),
      label: "Fats:",
    },
  ]);
  const [calorieGoalValue, setCalorieGoalValue] = useState(0);
  const [calories, setCalories] = useState(0);
  const [calorieUnit, setCalorieUnit] = useState("kcal");
  const [carbGoalValue, setCarbGoalValue] = useState(0);
  const [proteinGoalValue, setProteinGoalValue] = useState(0);
  const [fatGoalValue, setFatGoalValue] = useState(0);

  const [isVisible, setVisible] = useState(false);
  const updateMacrosRef = useRef(null);
  const isEditingMacros = true;
  const theme = useContext(ThemeContext).value;

  const onUpdateMacroValue = async (macroLabel, macroValue, units) => {
    var newCalories = calorieGoalValue;
    var newFats = fatGoalValue;
    var newProteins = proteinGoalValue;
    var newCarbs = carbGoalValue;
    if (macroLabel === "Calories") {
      setCalories(macroValue);
      setCalorieUnit(units);
      newCalories = { value: macroValue, units: units };
      setCalorieGoalValue(newCalories);
    } else {
      let newDatas = datas.map((item) => {
        if (item.label === macroLabel) {
          if (macroLabel === "Carbs:") {
            newCarbs = macroValue;
            setCarbGoalValue(macroValue);
          }
          if (macroLabel === "Protein:") {
            newProteins = macroValue;
            setProteinGoalValue(macroValue);
          }
          if (macroLabel === "Fats:") {
            newFats = macroValue;
            setFatGoalValue(macroValue);
          }
          return {
            ...item,
            value: macroValue + " " + units,
          };
        }
        return item;
      });
      setDatas(newDatas);
    }
  };

  const onRecalculate = () => {
    if (selectedTrackers.dietSelected) {
      setVisible(false);
      navigationService.navigate("setup", {
        screen: "goalSelection",
        params: {
          selectedTrackers: selectedTrackers,
          isEditingMacros: isEditingMacros,
        },
      });
    }
  };

  const onSave = async () => {
    const newGoals = {
      carbGoal: carbGoalValue,
      proteinGoal: proteinGoalValue,
      fatGoal: fatGoalValue,
      calorieGoal: calorieGoalValue,
    };
    updateGoals(newGoals);
    setVisible(false);
  };

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    let ref = {
      open(props) {
        setVisible(true);

        setCalorieUnit(props.calorieGoalUnits);
        setCalories(props.calorieGoalValue);
        setCalorieGoalValue({
          value: props.calorieGoalValue,
          units: props.calorieGoalUnits,
        });
        setCarbGoalValue(props.carbGoal);
        setProteinGoalValue(props.proteinGoal);
        setFatGoalValue(props.fatGoal);

        setDatas([
          {
            value: `${Math.round(props.carbGoal)} g`,
            img: require("../../../assets/images/carbs.png"),
            label: "Carbs:",
          },
          {
            value: `${Math.round(props.proteinGoal)} g`,
            img: require("../../../assets/images/protein.png"),
            label: "Protein:",
          },
          {
            value: `${Math.round(props.fatGoal)} g`,
            img: require("../../../assets/images/fats.png"),
            label: "Fats:",
          },
        ]);
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
      <View
        style={[styles.container, sharedStyles["modalBackground_" + theme]]}
      >
        <View style={styles.macroContainerStyle}>
          <View
            style={[
              styles.item,
              styles.head,
              sharedStyles["borderedContainer_" + theme],
            ]}
          >
            <View style={[styles.item, styles.headItem]}>
              <View style={styles.row}>
                <Image
                  source={require("../../../assets/images/calories.png")}
                  style={[styles.calorieItemImg, sharedStyles["tint_" + theme]]}
                />
                <Text
                  style={[
                    styles.calorieText,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  Calories
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  updateMacrosRef.current.open({
                    title: "Calories",
                    isCal: true,
                    units: calorieUnit,
                    value: calories,
                  });
                }}
              >
                <Image
                  style={[styles.calorieEditImg, sharedStyles["tint_" + theme]]}
                  source={require("../../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[styles.calorieValue, sharedStyles["textColour_" + theme]]}
            >
              {calories} {calorieUnit}
            </Text>
          </View>
          {datas.map((item, index) => (
            <View
              style={[styles.item, sharedStyles["borderedContainer_" + theme]]}
              key={index}
            >
              <View style={styles.row}>
                <Image
                  source={item.img}
                  style={[styles.itemImg, sharedStyles["tint_" + theme]]}
                />
                <Text
                  style={[styles.text, sharedStyles["textColour_" + theme]]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.itemValue,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  {item.value}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  updateMacrosRef.current.open({
                    title: item.label,
                    isCal: false,
                    units: "g",
                    value: item.value,
                  });
                }}
              >
                <Image
                  style={[styles.editImg, sharedStyles["tint_" + theme]]}
                  source={require("../../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.button,
              styles.recalculateButton,
              {
                backgroundColor: ValueSheet.colours[theme].purple,
                borderColor: ValueSheet.colours[theme].borderPurple,
              },
            ]}
            onPress={() => onRecalculate()}
          >
            <Text
              style={[styles.buttonText, sharedStyles["textColour_" + theme]]}
            >
              Recalculate goals
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.bottomButton,
                sharedStyles["borderedContainer_" + theme],
              ]}
              onPress={() => closeModal()}
            >
              <Text
                style={[styles.buttonText, sharedStyles["textColour_" + theme]]}
              >
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.bottomButton,
                {
                  backgroundColor: ValueSheet.colours[theme].secondaryColour70,
                  borderColor: ValueSheet.colours[theme].borderGrey75,
                },
              ]}
              onPress={() => onSave()}
            >
              <Text
                style={[styles.buttonText, sharedStyles["textColour_" + theme]]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <UpdateMacrosModal
          getRef={(ref) => (updateMacrosRef.current = ref)}
          onUpdateMacroValue={onUpdateMacroValue}
        />
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
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 2,
  },
  macroContainerStyle: {
    paddingTop: 20,
  },
  head: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  headItem: {
    borderWidth: 0,
    padding: 0,
    width: "100%",
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  item: {
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemValue: {
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginLeft: 15,
  },
  calorieValue: {
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 22,
  },
  calorieText: {
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  calorieEditImg: {
    width: 30,
    height: 30,
  },
  calorieItemImg: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  itemImg: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  editImg: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 25,
    borderWidth: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 13,
    alignSelf: "center",
    alignContent: "center",
    marginVertical: 5,
  },
  recalculateButton: {
    width: "70%",
  },
  bottomButton: {
    width: "35%",
    marginHorizontal: 2,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
});
