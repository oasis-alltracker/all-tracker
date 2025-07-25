import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ValueSheet } from "../../ValueSheet";
import Toast from "react-native-root-toast";

const workouts = [
  {
    name: "Push",
    date: "Aug 13",
  },
  {
    name: "Pull",
    date: "Aug 12",
  },
  {
    name: "Legs",
    date: "Aug 11",
  },
];
const plans = [
  {
    name: "Push",
    date: "Aug 13",
  },
  {
    name: "Legs",
    date: "Aug 11",
  },
];

export default function Fitness() {
  const showToast = () => {
    //basic toast based on other toasts in the app
    //all uncommented toasts will appear at the same time according to their specifications
    //position can be specified by a number instead of the constants for top, bottom, center
    //positive number to offset from top, negative to offset from bottom
    Toast.show("Test toast in the center", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER, //center: position = 0
    });
    Toast.show("Test toast at the top", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP, //top: position = 20
    });
    Toast.show("Test toast at the bottom", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM, //bottom: position = -20
    });
    Toast.show("Test toast offset from the bottom by 75", {
      duration: Toast.durations.SHORT,
      position: -75,
    });
    Toast.show("Test toast offset from the top by 75", {
      duration: Toast.durations.SHORT,
      position: 75,
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/fitness.png")}
        />
      </View>
      <View style={[styles.line]}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity>
          <Image
            style={styles.threedot}
            source={require("../../assets/images/three-dot.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.workouts}>
        <TouchableOpacity style={styles.workout} onPress={() => showToast()}>
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
        {workouts.map((item, index) => (
          <View style={styles.workout} key={index}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.line]}>
        <Text style={styles.title}>Exercise plans</Text>
        <TouchableOpacity>
          <Image
            style={styles.threedot}
            source={require("../../assets/images/three-dot.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.workouts}>
        {plans.map((item, index) => (
          <View style={styles.workout} key={index}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: ValueSheet.colours.purple,
    borderColor: ValueSheet.colours.borderPurple70,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  plus: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  threedot: {
    width: 40,
    height: 30,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 33,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  workouts: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
  workout: {
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
    width: "48%",
    height: 160,
    padding: 20,
    borderRadius: 40,
    marginBottom: 15,
  },
  itemName: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 24,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  itemDate: {
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
});
