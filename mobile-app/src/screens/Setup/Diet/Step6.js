import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";

const DietStep6 = (props) => {
  const { selectedTrackers } = props.route.params;
  const [isSm, setIsSm] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/diet.png")}
          />
          <Text style={styles.imageText}>diet</Text>
        </View>
        <Text style={styles.title}>How tall are you?</Text>
        <TextInput style={styles.input} placeholder={isSm ? "0cm" : "0ft"} />
        <View style={[styles.buttons, styles.kgButtons]}>
          <Button
            textStyle={styles.kgText}
            onPress={() => setIsSm(true)}
            style={[styles.kgBtn, !isSm && styles.inactive]}
          >
            cm
          </Button>
          <Button
            textStyle={styles.kgText}
            onPress={() => setIsSm(false)}
            style={[styles.kgBtn, isSm && styles.inactive]}
          >
            ft
          </Button>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button
          onPress={() =>
            navigationService.navigate("dietStep7", { selectedTrackers })
          }
          style={styles.button}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(202, 189, 255, 0.65)",
    borderWidth: 2,
    borderColor: "rgba(162, 151, 204, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  input: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#CCCCCC",
    height: 80,
    borderRadius: 30,
    marginTop: 10,
    textAlign: "center",
    fontSize: 40,
    marginBottom: 25,
    fontFamily: "Sego",
  },
  center: {
    alignItems: "center",
  },
  kgButtons: {
    width: 170,
    marginBottom: 20,
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
  kgText: {
    fontSize: 18,
  },
});

export default DietStep6;
