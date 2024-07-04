import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import RNModal from "react-native-modal";
import { Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button } from "../../../components";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";

export default function UpdateMacrosModal({ getRef, onUpdateMacroValue }) {
  const [visible, setVisible] = useState(false);

  const [text, setText] = useState(false);
  const [title, setTitle] = useState(false);
  const [imageUri, setImageUri] = useState(false);
  const [isCal, setIsCal] = useState(false);
  const [units, setUnits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let ref = {
      open(props) {
        setVisible(true);

        setIsCal(props.isCal);
        setUnits(props.units);
        setTitle(props.title);

        if (props.title == "Calories") {
          setValue(props.value.toString());
          setText("Daily calorie intake");
          setImageUri(require("../../../assets/images/calories.png"));
        } else {
          setValue(props.value.split(" ")[0]);
          if (props.title == "Carbs:") {
            setText("Daily carb intake (g)");
            setImageUri(require("../../../assets/images/carbs.png"));
          } else if (props.title == "Protein:") {
            setText("Daily protein intake (g)");
            setImageUri(require("../../../assets/images/protein.png"));
          } else if (props.title == "Fats:") {
            setText("Daily fat intake (g)");
            setImageUri(require("../../../assets/images/fats.png"));
          }
        }
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  useEffect(() => {}, [value]);

  const backDropPressed = async () => {
    setVisible(false);
  };

  const onSave = async () => {
    if (value && value > 0 && !isNaN(Number(value))) {
      setIsLoading(true);
      await onUpdateMacroValue(title, value, units);

      setVisible(false);
      setIsLoading(false);
    } else {
      Toast.show("Please enter a number", {
        ...styles.errorToast,
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => backDropPressed()}
      onBackdropPress={() => backDropPressed()}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.modal}
    >
      <Spinner visible={isLoading}></Spinner>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={[styles.row, { paddingBottom: 10 }]}>
            <Image source={imageUri} style={styles.searchImage} />
            <Text style={styles.inputTitle}>{text}</Text>
          </View>

          <View style={styles.countContainer}>
            <TextInput
              style={styles.countText}
              placeholder="0"
              keyboardType="number-pad"
              onChangeText={setValue}
              value={value}
            />
          </View>

          {isCal && (
            <>
              <View style={[styles.buttons, styles.kgButtons]}>
                <Button
                  textStyle={styles.kgText}
                  onPress={() => setUnits("kcal")}
                  style={[styles.kgBtn, units != "kcal" && styles.inactive]}
                >
                  kcal
                </Button>
                <Button
                  textStyle={styles.kgText}
                  onPress={() => setUnits("kJ")}
                  style={[styles.kgBtn, units != "kJ" && styles.inactive]}
                >
                  kJ
                </Button>
              </View>
            </>
          )}

          <View style={styles.row2}>
            <Button
              onPress={() => backDropPressed()}
              style={[styles.button, styles.back]}
              textStyle={styles.closeModalText}
            >
              Close
            </Button>
            <Button
              textStyle={styles.closeModalText}
              onPress={() => onSave()}
              style={styles.button}
            >
              Ok
            </Button>
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
    flex: 1,
  },
  container: {
    width: "90%",
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchImage: {
    width: 35,
    height: 35,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 15,
  },
  inputTitle: {
    color: "#25436B",
    fontSize: 20,
    fontFamily: "Sego-Bold",
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
  },
  text: {
    color: "#25436B",
    fontSize: 27,
    fontFamily: "Sego",
  },
  countText: {
    color: "#25436B",
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Sego",
  },
  countContainer: {
    borderRadius: 5,
    width: 280,
    marginTop: 10,
    height: 40,
    borderColor: "rgba(172, 197, 204, 0.75)",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.8)",
    borderRadius: 20,
    width: 100,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: "Sego-Bold",
    fontSize: 20,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginHorizontal: 10,
    height: 50,
  },
  button: {
    width: 130,
    marginHorizontal: 10,
  },
  plusMain: {
    width: 40,
    height: 40,
  },
  countButton: {
    paddingHorizontal: 15,
  },
  positiveToast: {
    backgroundColor: "#D7F6FF",
    textColor: "#25436B",
  },
  negativeToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
  closeModalText: {
    color: "#25436B",
    fontFamily: "Sego",
    fontSize: 18,
  },
  kgButtons: {
    width: 170,
  },
  kgText: {
    fontSize: 18,
  },
  kgBtn: {
    width: 80,
    height: 35,
    borderRadius: 12,
  },
  inactive: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  buttons: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
