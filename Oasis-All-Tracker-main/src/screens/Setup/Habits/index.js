import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "./Modal";

const { width, height } = Dimensions.get("window");

const Habits = () => {
  const modalRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/all-apps.png")}
          />
          <Text style={styles.imageText}>habits</Text>
        </View>
        <Text style={styles.title}>
          Get stated by creating new habits you’d like to adopt
        </Text>
        <TouchableOpacity
          onPress={() => {
            modalRef.current.open();
          }}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>
            You can do this later if you'd like
          </Text>
          <View style={styles.plusCon}>
            <Image
              style={styles.plusImage}
              source={require("../../../assets/images/plus.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button
          onPress={() => navigationService.navigate("todos")}
          style={styles.button}
        >
          Next
        </Button>
      </View>
      <Modal getRef={(ref) => (modalRef.current = ref)} />
    </SafeAreaView>
  );
};

export default Habits;

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
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
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
    fontSize: 22,
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
  center: {
    alignItems: "center",
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  plusCon: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderRadius: 30,
    backgroundColor: "rgba(215, 246, 255, 0.35)",
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "rgba(204, 204, 204, 0.728)",
    width: width - 30,
    height: 350,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  buttonText: {
    color: "rgba(37, 67, 107, 0.6)",
    fontFamily: "Sego",
  },
});
