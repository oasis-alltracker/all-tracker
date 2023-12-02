import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";

const Step8 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.center}
      >
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/diet.png")}
          />
          <Text style={styles.imageText}>diet</Text>
        </View>
        <Text style={styles.title}>Choose your intensity</Text>
        <Button style={styles.bigButtons}>
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/ultimate.png")}
            />
            <Text style={[styles.text, styles.flex]}>Ultimate</Text>
            <Text style={styles.text}>5 weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>1kg/week</Text>
        </Button>
        <Button style={styles.bigButtons}>
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/steady.png")}
            />
            <Text style={[styles.text, styles.flex]}>Steady</Text>
            <Text style={styles.text}>6 weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>0.75kg/week</Text>
        </Button>
        <Button style={styles.bigButtons}>
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/gradually.png")}
            />
            <Text style={[styles.text, styles.flex]}>Gradual</Text>
            <Text style={styles.text}>9 weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>0.5kg/week</Text>
        </Button>
        <Button style={styles.bigButtons}>
          <View style={styles.row}>
            <Image
              style={styles.selectImage}
              resizeMode="contain"
              source={require("../../../assets/images/relaxed.png")}
            />
            <Text style={[styles.text, styles.flex]}>Relaxed</Text>
            <Text style={styles.text}>18 weeks</Text>
          </View>
          <Text style={[styles.text, styles.minitext]}>0.25kg/week</Text>
        </Button>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button
          onPress={() => navigationService.navigate("step9")}
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
  bigButtons: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
    height: 90,
    borderRadius: 40,
    marginTop: 10,
    paddingHorizontal: 25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  center: {
    alignItems: "center",
  },
  selectImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex: {
    flex: 1,
  },
  text: {
    color: "#25436B",
    fontSize: 20,
    fontFamily: "Sego",
  },
  minitext: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Step8;
