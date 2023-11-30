import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button } from "../../../components";

export default function Modal({ getRef }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ref = {
      open() {
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);
  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Name</Text>
          <Image
            style={styles.searchImage}
            source={require("../../../assets/images/search.png")}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Good or bad:</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Threshold:</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.row}>
          <Image
            style={styles.searchImage}
            source={require("../../../assets/images/reminder.png")}
          />
        </View>
        <View style={styles.row}>
          <Button
            onPress={() => setVisible(false)}
            style={[styles.button, styles.back]}
          >
            Back
          </Button>
          <Button onPress={() => setVisible(false)} style={styles.button}>
            Next
          </Button>
        </View>
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
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  searchImage: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  title: {
    color: "#25436B",
    fontSize: 35,
    fontFamily: "Sego-Bold",
  },
  key: {
    color: "#25436B",
    fontSize: 25,
    fontFamily: "Sego",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.8)",
    borderRadius: 20,
    width: 100,
    height: 40,
    paddingHorizontal: 20,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
});
