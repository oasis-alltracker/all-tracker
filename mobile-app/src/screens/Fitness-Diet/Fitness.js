import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { ValueSheet } from "../../ValueSheet";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";

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
  const theme = useContext(ThemeContext).value;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.imageCon, sharedStyles["purpleContainer_" + theme]]}>
        <Image
          style={styles.image}
          source={require("../../assets/images/fitness.png")}
        />
      </View>
      <View style={[styles.line]}>
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          Workouts
        </Text>
        <TouchableOpacity>
          <Image
            style={[styles.threedot, sharedStyles["tint_" + theme]]}
            source={require("../../assets/images/three-dot.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.workouts}>
        <TouchableOpacity
          style={[styles.workout, sharedStyles["borderedContainer_" + theme]]}
        >
          <Image
            style={[styles.plus, sharedStyles["tint_" + theme]]}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
        {workouts.map((item, index) => (
          <View
            style={[styles.workout, sharedStyles["borderedContainer_" + theme]]}
            key={index}
          >
            <Text
              style={[styles.itemName, sharedStyles["textColour_" + theme]]}
            >
              {item.name}
            </Text>
            <Text
              style={[styles.itemDate, , sharedStyles["textColour_" + theme]]}
            >
              {item.date}
            </Text>
          </View>
        ))}
      </View>
      <View style={[styles.line]}>
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          Exercise plans
        </Text>
        <TouchableOpacity>
          <Image
            style={[styles.threedot, sharedStyles["tint_" + theme]]}
            source={require("../../assets/images/three-dot.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.workouts}>
        {plans.map((item, index) => (
          <View
            style={[styles.workout, sharedStyles["borderedContainer_" + theme]]}
            key={index}
          >
            <Text
              style={[styles.itemName, sharedStyles["textColour_" + theme]]}
            >
              {item.name}
            </Text>
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
    width: "48%",
    height: 160,
    padding: 20,
    borderRadius: 40,
    marginBottom: 15,
  },
  itemName: {
    fontSize: 24,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  itemDate: {
    fontFamily: ValueSheet.fonts.primaryFont,
  },
});
