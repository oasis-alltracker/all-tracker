import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";

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

export default function SelectMealModal({ isVisible, setVisible, dayString }) {
  const [selectedIndex, setSelected] = useState(-1);

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
      <View style={styles.container}>
        <Text style={styles.titleText}>Select Meal </Text>
        {mealTitles.map((item, index) => (
          <View key={index}>
            <View style={styles.line} />
            <TouchableOpacity
              style={[
                selectedIndex == index && {
                  backgroundColor: "rgba(179,179,179,0.2)",
                },
              ]}
              onPress={() => updateSelected(index)}
            >
              <View style={styles.row}>
                <Image style={styles.icon} source={item.icon}></Image>
                <Text style={styles.rowText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.line} />

        <TouchableOpacity
          style={[
            styles.button,
            selectedIndex == -1
              ? { backgroundColor: "#D3D3D3", borderColor: "#B3B3B3" }
              : {
                  backgroundColor: "#D7F6FF",
                  borderColor: "rgba(172, 197, 204, 0.75)",
                },
          ]}
          disabled={selectedIndex == -1}
          onPress={() => {
            navigationService.navigate("searchFood", {
              mealName: mealTitles[selectedIndex].name,
              dayString: dayString,
            });
            setVisible(false);
            setSelected(-1);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedIndex == -1 && { color: "#666666" },
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
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  titleText: {
    fontFamily: "Sego",
    fontSize: 33,
    color: "#25436B",
    marginVertical: 20,
    alignSelf: "center",
  },
  rowText: {
    fontSize: 24,
    fontFamily: "Sego-Bold",
    color: "#25436B",
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
    padding: 5,
    alignSelf: "center",
    alignContent: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 24,
    fontFamily: "Sego",
    color: "#25436B",
  },
});
