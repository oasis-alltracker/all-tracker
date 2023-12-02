import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";

const Step9 = () => {
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
        <Text style={styles.title}>
          You'll reach your goal in <Text style={styles.boldText}>5 weeks</Text>
        </Text>
        <Button style={styles.bigButtons}>
          <Image
            style={styles.selectImage}
            resizeMode="contain"
            source={require("../../../assets/images/calories.png")}
          />
          <View style={styles.flex}>
            <Text style={[styles.text]}>3354 kcal</Text>
            <Text style={[styles.text, styles.minitext]}>
              Daily calorie intake
            </Text>
          </View>
        </Button>
        <Button style={styles.bigButtons}>
          <Image
            style={styles.selectImage}
            resizeMode="contain"
            source={require("../../../assets/images/carbs.png")}
          />
          <View style={styles.flex}>
            <Text style={[styles.text]}>200 g</Text>
            <Text style={[styles.text, styles.minitext]}>
              Daily carb intake
            </Text>
          </View>
        </Button>
        <Button style={styles.bigButtons}>
          <Image
            style={styles.selectImage}
            resizeMode="contain"
            source={require("../../../assets/images/protein.png")}
          />
          <View style={styles.flex}>
            <Text style={[styles.text]}>178 g</Text>
            <Text style={[styles.text, styles.minitext]}>
              Daily protein intake
            </Text>
          </View>
        </Button>
        <Button style={styles.bigButtons}>
          <Image
            style={styles.selectImage}
            resizeMode="contain"
            source={require("../../../assets/images/fats.png")}
          />
          <View style={styles.flex}>
            <Text style={[styles.text]}>55 g</Text>
            <Text style={[styles.text, styles.minitext]}>Daily fat intake</Text>
          </View>
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
          onPress={() => navigationService.navigate("step10")}
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
  boldText: {
    fontFamily: "Sego-Bold",
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
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
  },
  selectImage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex: {
    flex: 1,
    justifyContent: "center",
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

export default Step9;
