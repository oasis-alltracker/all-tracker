import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";
import { ValueSheet } from "../../../ValueSheet";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";

const mealTitles = [
  {
    name: "Breakfast",
    icon: require("../../../assets/images/breakfast.png"),
  },
  {
    name: "Lunch",
    icon: require("../../../assets/images/lunch.png"),
  },
  {
    name: "Dinner",
    icon: require("../../../assets/images/dinner.png"),
  },
  {
    name: "Snacks",
    icon: require("../../../assets/images/snack.png"),
  },
];

export default function SelectMealModal({
  isVisible,
  setVisible,
  dayString,
  dietUnit,
}) {
  const [selectedIndex, setSelected] = useState(-1);
  const theme = useContext(ThemeContext).value;

  const updateSelected = (currIndex) => {
    if (selectedIndex == currIndex) setSelected(-1);
    else setSelected(currIndex);
  };

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
        <Text style={[styles.titleText, sharedStyles["textColour_" + theme]]}>
          Select Meal{" "}
        </Text>
        {mealTitles.map((item, index) => (
          <View key={index}>
            <View style={[styles.line, sharedStyles["border_" + theme]]} />
            <TouchableOpacity
              style={[
                selectedIndex == index && {
                  backgroundColor: ValueSheet.colours[theme].grey25,
                },
              ]}
              onPress={() => updateSelected(index)}
            >
              <View style={styles.row}>
                <Image
                  style={[styles.icon, sharedStyles["tint_" + theme]]}
                  source={item.icon}
                ></Image>
                <Text
                  style={[styles.rowText, sharedStyles["textColour_" + theme]]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <View style={[styles.line, sharedStyles["border_" + theme]]} />

        <TouchableOpacity
          style={[
            styles.button,
            selectedIndex == -1
              ? {
                  backgroundColor: ValueSheet.colours[theme].grey75,
                  borderColor: ValueSheet.colours[theme].grey,
                }
              : sharedStyles["button_" + theme],
            ,
          ]}
          disabled={selectedIndex == -1}
          onPress={() => {
            navigationService.navigate("searchFood", {
              mealName: mealTitles[selectedIndex].name,
              dayString: dayString,
              dietUnit: dietUnit,
            });
            setVisible(false);
            setSelected(-1);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              sharedStyles["textColour_light"],
              selectedIndex == -1 && {
                color: ValueSheet.colours[theme].black,
              },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
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
    borderWidth: 1,
  },
  line: {
    borderBottomWidth: 2,
  },
  titleText: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 33,
    marginVertical: 20,
    alignSelf: "center",
  },
  rowText: {
    fontSize: 24,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
    marginLeft: 50,
  },
  button: {
    borderRadius: 25,
    borderWidth: 2,
    alignItems: "center",
    width: "60%",
    paddingTop: 5,
    paddingBottom: 10,
    alignSelf: "center",
    alignContent: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
});
