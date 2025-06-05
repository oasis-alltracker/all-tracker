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
  const [datas, setDatas] = useState([
      {
        title: "0 g",
        img: require("../../../assets/images/carbs.png"),
        text: "Carbs:",
      },
      {
        title: "0 g",
        img: require("../../../assets/images/protein.png"),
        text: "Protein:",
      },
      {
        title: "0 g",
        img: require("../../../assets/images/fats.png"),
        text: "Fats:",
      },
    ]);
    const [calorieGoalValue, setCalorieGoalValue] = useState(0);
    const [calories, setCalories] = useState(0);
    const [calorieUnit, setCalorieUnit] = useState("kcal");
    const [carbGoalValue, setCarbGoalValue] = useState(0);
    const [proteinGoalValue, setProteinGoalValue] = useState(0);
    const [fatGoalValue, setFatGoalValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
    const updateMacrosRef = useRef(null);

const onUpdateMacroValue = async (title, value, units) => {
    var newCalories = calorieGoalValue;
    var newFats = fatGoalValue;
    var newProteins = proteinGoalValue;
    var newCarbs = carbGoalValue;
    if (title === "Calories") {
      setCalories(value);
      setCalorieUnit(units);
      newCalories = { value: value, units: units };
      setCalorieGoalValue(newCalories);
    } else {
      let newDatas = datas.map((item) => {
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
      setDatas(newDatas);
      const token = await getAccessToken();
      DietGoalsAPI.updateDietGoals(token, {
        carbGoal: newCarbs,
        proteinGoal: newProteins,
        fatGoal: newFats,
        calorieGoal: newCalories,
      });
    }
  };

  useEffect(() => {
    const getDataOnLoad = async () => {
      setIsLoading(true);
      const token = await getAccessToken();
      const dietGoals = await DietGoalsAPI.getDietGoals(token);

      setCalorieGoalValue(dietGoals.calorieGoal);
      setCalorieUnit(dietGoals.calorieGoal.units);
      setCalories(dietGoals.calorieGoal.value);
      setCarbGoalValue(dietGoals.carbGoal);
      setProteinGoalValue(dietGoals.proteinGoal);
      setFatGoalValue(dietGoals.fatGoal);

      setDatas([
        {
          title: `${Math.round(dietGoals.carbGoal)} g`,
          img: require("../../../assets/images/carbs.png"),
          text: "Carbs:",
        },
        {
          title: `${Math.round(dietGoals.proteinGoal)} g`,
          img: require("../../../assets/images/protein.png"),
          text: "Protein:",
        },
        {
          title: `${Math.round(dietGoals.fatGoal)} g`,
          img: require("../../../assets/images/fats.png"),
          text: "Fats:",
        },
      ]);
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
              {calories} {calorieUnit}
            </Text>
          </View>
          {datas.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={styles.row}>
                <Image source={item.img} style={styles.itemImg} />
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  updateMacrosRef.current.open({
                    title: item.text,
                    isCal: false,
                    units: "g",
                    value: item.title,
                  });
                }} >
                <Image
                  style={styles.editImg}
                  source={require("../../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View>
            <TouchableOpacity style={[styles.button, styles.recalculateButton]}>
                <Text style={styles.buttonText}>Recalculate goals</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.closeButton]}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]}>
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
    borderColor: "rgba(172, 197, 204, 0.75)"
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