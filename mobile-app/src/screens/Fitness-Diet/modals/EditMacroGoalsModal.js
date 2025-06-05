import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNModal from "react-native-modal";
import navigationService from "../../../navigators/navigationService";


export default function EditMacroGoalsModal({ isVisible, setVisible }) {
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
        <Text>test</Text>
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