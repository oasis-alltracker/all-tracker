import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import RNModal from "react-native-modal";
import { Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button } from "../../../components";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

export default function UpdateMacrosModal({ getRef, onUpdateMacroValue }) {
  const theme = useContext(ThemeContext).value;
  const [visible, setVisible] = useState(false);

  const [text, setText] = useState(false);
  const [title, setTitle] = useState(false);
  const [imageUri, setImageUri] = useState(
    require("../../../assets/images/fats.png")
  );
  const [isCal, setIsCal] = useState(false);
  const [units, setUnits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("0");

  const [isEntry, setIsEntry] = useState(false);

  useEffect(() => {
    let ref = {
      open(props) {
        setVisible(true);

        setIsCal(props.isCal);
        setUnits(props.units);
        setTitle(props.title);

        if (props?.isEntry == true) {
          setIsEntry(true);
          setText(props.title);
          setImageUri(props.icon);
          setValue(props.value.toString());
        } else {
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
      Toast.show({
        type: "info",
        text1: "Invalid input",
        text2: "Please enter a valid number using digits from 0 to 9.",
      });
    }
  };

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => backDropPressed()}
      onBackdropPress={() => backDropPressed()}
      backdropColor={ValueSheet.colours[theme].secondaryColour27}
      style={styles.modal}
    >
      <Spinner visible={isLoading}></Spinner>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.container, sharedStyles["modalBackground_" + theme]]}
        >
          <View style={[styles.row, { paddingBottom: 10 }]}>
            <Image
              source={imageUri}
              style={[styles.searchImage, sharedStyles["tint_" + theme]]}
            />
            <Text
              style={[styles.inputTitle, sharedStyles["textColour_" + theme]]}
            >
              {text}
            </Text>
          </View>

          <View
            style={[
              styles.countContainer,
              sharedStyles["borderedContainer_" + theme],
            ]}
          >
            <TextInput
              placeholderTextColor={ValueSheet.colours[theme].inputGrey}
              style={[styles.countText, sharedStyles["textColour_" + theme]]}
              placeholder="0"
              keyboardType={isEntry ? "decimal-pad" : "number-pad"}
              onChangeText={setValue}
              value={value}
            />
          </View>

          {isCal && (
            <>
              <View style={[styles.buttons, styles.unitButtons]}>
                <Button
                  textStyle={styles.unitText}
                  onPress={() => setUnits("kcal")}
                  style={styles.unitBtn}
                  positiveSelect={units === "kcal"}
                >
                  kcal
                </Button>
                <Button
                  textStyle={styles.unitText}
                  onPress={() => setUnits("kJ")}
                  style={styles.unitBtn}
                  positiveSelect={units === "kJ"}
                >
                  kJ
                </Button>
              </View>
            </>
          )}

          <View style={styles.row2}>
            <Button
              onPress={() => backDropPressed()}
              style={styles.button}
              textStyle={styles.closeModalText}
            >
              Close
            </Button>
            <Button
              textStyle={styles.closeModalText}
              onPress={() => onSave()}
              style={styles.button}
              positiveSelect={true}
            >
              Ok
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Toast position="top" topOffset={25} visibilityTime={2500} />
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
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
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
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryBold,
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
    textAlign: "center",
  },
  countText: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  countContainer: {
    borderRadius: 5,
    width: 280,
    marginTop: 10,
    height: 40,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
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
  closeModalText: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
  },
  unitButtons: {
    width: 170,
  },
  unitText: {
    fontSize: 18,
  },
  unitBtn: {
    width: 80,
    height: 35,
    borderRadius: 12,
  },
  buttons: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
