import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

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
        <TouchableOpacity style={styles.workout}>
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus-2.png")}
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
    backgroundColor: "rgba(202, 189, 255, 65)",
    borderColor: "rgba(162, 151, 204, 0.7)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
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
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  workouts: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
  workout: {
    borderWidth: 2,
    borderColor: "#ccc",
    width: "48%",
    height: 160,
    padding: 20,
    borderRadius: 40,
    marginBottom: 15,
  },
  itemName: {
    color: "#25436B",
    fontSize: 24,
    fontFamily: "Sego-Bold",
  },
  itemDate: {
    color: "#25436B",
    fontFamily: "Sego",
  },
});
