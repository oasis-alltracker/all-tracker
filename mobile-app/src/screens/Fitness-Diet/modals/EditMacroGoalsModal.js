import { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";
import { Header } from "../../../components";
import DietGoalsAPI from "../../../api/diet/dietGoalsAPI";
import { getAccessToken } from "../../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import UpdateMacrosModal from "../../Setup/Diet/UpdateMacrosModal";

export default function EditMacroGoalsModal({ isVisible, setVisible }) {
  const [macroData, setMacroData] = useState([
    {
      title: "0",
      img: require("../../../assets/images/carbs.png"),
      text: "Carbs:",
    },
    {
      title: "0",
      img: require("../../../assets/images/protein.png"),
      text: "Protein:",
    },
    {
      title: "0 g",
      img: require("../../../assets/images/fats.png"),
      text: "Fats:",
    },
  ]);
  const [calorieGoalValue, setCalorieGoalValue] = useState({
    value: 0,
    units: "kcal",
  });
  const [calories, setCalories] = useState(0);
  const [calorieUnit, setCalorieUnit] = useState("kcal");
  const [carbGoalValue, setCarbGoalValue] = useState(0);
  const [proteinGoalValue, setProteinGoalValue] = useState(0);
  const [fatGoalValue, setFatGoalValue] = useState(0);
  const [isCaloriesChanged, setIsCaloriesChanged] = useState(false);
  const [isMacroDataChanged, setIsMacroDataChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateMacrosRef = useRef(null);
  const macroUnitText = " g";

  const onUpdateMacroValue = async (title, value, units) => {
    var newCalories = calorieGoalValue;
    var newFats = fatGoalValue;
    var newProteins = proteinGoalValue;
    var newCarbs = carbGoalValue;
    if (title === "Calories") {
      newCalories = { value: value, units: units };
      setCalorieGoalValue(newCalories);
      setIsCaloriesChanged(true);
    } else {
      let newMacroData = macroData.map((item) => {
        if (item.text === title) {
          if (title === "Carbs:") {
            newCarbs = value;
            setCarbGoalValue(value);
          }
          if (title === "Protein:") {
            newProteins = value;
            setProteinGoalValue(value);
          }
          if (title === "Fats:") {
            newFats = value;
            setFatGoalValue(value);
          }
          return {
            ...item,
            title: value + " " + units,
          };
        }
        return item;
      });
      setIsMacroDataChanged(true);
    }
  };

  const setMacros = async () => {
    const dietGoals = await DietGoalsAPI.getDietGoals(token);

    setCalorieGoalValue(dietGoals.calorieGoal);
    setCarbGoalValue(dietGoals.carbGoal);
    setProteinGoalValue(dietGoals.proteinGoal);
    setFatGoalValue(dietGoals.fatGoal);

    setCalorieUnit(dietGoals.calorieGoal.units);
    setCalories(dietGoals.calorieGoal.value);

    setMacroData([
      {
        title: `${Math.round(dietGoals.carbGoal)}` + macroUnitText,
        img: require("../../../assets/images/carbs.png"),
        text: "Carbs:",
      },
      {
        title: `${Math.round(dietGoals.proteinGoal)}` + macroUnitText,
        img: require("../../../assets/images/protein.png"),
        text: "Protein:",
      },
      {
        title: `${Math.round(dietGoals.fatGoal)}` + macroUnitText,
        img: require("../../../assets/images/fats.png"),
        text: "Fats:",
      },
    ]);

    // if (isCaloriesChanged) {
    //   setCalorieUnit(calorieGoalValue.units);
    //   setCalories(calorieGoalValue.value);
    //   setIsCaloriesChanged(false);
    // } else {
    //   setCalorieUnit(dietGoals.calorieGoal.units);
    //   setCalories(dietGoals.calorieGoal.value);
    // }

    // if (isMacroDataChanged) {
    //   setMacroData([
    //     {
    //       title: `${Math.round(carbGoalValue)} g`,
    //       img: require("../../../assets/images/carbs.png"),
    //       text: "Carbs:",
    //     },
    //     {
    //       title: `${Math.round(proteinGoalValue)} g`,
    //       img: require("../../../assets/images/protein.png"),
    //       text: "Protein:",
    //     },
    //     {
    //       title: `${Math.round(fatgoalValue)} g`,
    //       img: require("../../../assets/images/fats.png"),
    //       text: "Fats:",
    //     },
    //   ]);
    //   setIsMacroDataChanged(false);
    // } else {
    //   setMacroData([
    //     {
    //       title: `${Math.round(dietGoals.carbGoal)} g`,
    //       img: require("../../../assets/images/carbs.png"),
    //       text: "Carbs:",
    //     },
    //     {
    //       title: `${Math.round(dietGoals.proteinGoal)} g`,
    //       img: require("../../../assets/images/protein.png"),
    //       text: "Protein:",
    //     },
    //     {
    //       title: `${Math.round(dietGoals.fatGoal)} g`,
    //       img: require("../../../assets/images/fats.png"),
    //       text: "Fats:",
    //     },
    //   ]);
    // }
  };

  const resetGoals = () => {
    if (isCaloriesChanged) {
      setCalorieGoalValue({ value: calories, units: calorieUnit });
      setIsCaloriesChanged(false);
    }
    if (isMacroDataChanged) {
      macroData.map((item) => {
        if (item.text === "Carbs:") {
          setCarbGoalValue(item.title);
        }
        if (item.text === "Protein:") {
          setProteinGoalValue(item.title);
        }
        if (item.text === "Fats:") {
          setFatGoalValue(item.title);
        }
      });
      setIsMacroDataChanged(false);
    }
  };

  const macroDisplayText = (text) => {
    var value = "0";
    macroData.map((item) => {
      if (text === "Carbs:") {
        text = carbGoalValue;
      }
      if (text === "Protein:") {
        text = proteinGoalValue;
      }
      if (text === "Fats:") {
        text = fatGoalValue;
      }
    });
    return text + macroUnitText;
  };

  const onSave = async () => {
    setIsLoading(true);
    const token = await getAccessToken();
    await DietGoalsAPI.updateDietGoals(token, {
      carbGoal: carbGoalValue,
      proteinGoal: proteinGoalValue,
      fatGoal: fatGoalValue,
      calorieGoal: calorieGoalValue,
    });
    setMacros();
    setVisible(false);
    setIsLoading(false);
  };

  const closeModal = async () => {
    resetGoals();
    setVisible(false);
  };

  useEffect(() => {
    const getDataOnLoad = async () => {
      setIsLoading(true);
      setMacros();
      setIsLoading(false);
    };

    getDataOnLoad();
  }, []);

  return (
    <RNModal
      isVisible={isVisible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropOpacity={0}
      style={styles.modal}
    >
      <View style={styles.container}>
        <Spinner visible={isLoading}></Spinner>
        <View style={styles.macroContainerStyle}>
          <View style={[styles.item, styles.head]}>
            <View style={[styles.item, styles.headItem]}>
              <View style={styles.row}>
                <Image
                  source={require("../../../assets/images/calories.png")}
                  style={styles.calorieItemImg}
                />
                <Text style={styles.calorieText}>Calories</Text>
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
                  style={styles.calorieEditImg}
                  source={require("../../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.calorieTitle}>
              {isCaloriesChanged
                ? calorieGoalValue.value + " " + calorieGoalValue.units
                : calories + " " + calorieUnit}
            </Text>
          </View>
          {macroData.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={styles.row}>
                <Image source={item.img} style={styles.itemImg} />
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.itemTitle}>
                  {isMacroDataChanged
                    ? macroDisplayText(item.text)
                    : item.title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  updateMacrosRef.current.open({
                    title: item.text,
                    isCal: false,
                    units: "g",
                    value: item.title,
                  });
                }}
              >
                <Image
                  style={styles.editImg}
                  source={require("../../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, styles.recalculateButton]}
            onPress={() => closeModal()}
          >
            <Text style={styles.buttonText}>Recalculate goals</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => closeModal()}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={() => onSave()}
            >
              <Text style={styles.buttonText}>Save</Text>
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
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },
  macroContainerStyle: {
    paddingTop: 20,
  },
  title: {
    fontFamily: "Sego-Bold",
    fontSize: 36,
    color: "#25436B",
    marginVertical: 25,
    alignSelf: "center",
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
    borderColor: "#CCCCCC",
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginLeft: 15,
  },
  calorieTitle: {
    fontFamily: "Sego-Bold",
    color: "#25436B",
    fontSize: 22,
  },
  calorieText: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
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
    fontFamily: "Sego",
    color: "#25436B",
  },
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    alignItems: "center",
    padding: 10,
    alignSelf: "center",
    alignContent: "center",
    marginVertical: 5,
  },
  recalculateButton: {
    width: "70%",
    backgroundColor: "#CABDFF",
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  closeButton: {
    width: "35%",
    marginHorizontal: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  saveButton: {
    width: "35%",
    marginHorizontal: 2,
    backgroundColor: "#D7F6FF",
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Sego-Bold",
    color: "#25436B",
  },
});
