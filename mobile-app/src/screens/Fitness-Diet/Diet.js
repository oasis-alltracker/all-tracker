import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import navigationService from "../../navigators/navigationService";

const items = [
  {
    name: "Breakfast",
  },
  {
    name: "Lunch",
  },
  {
    name: "Dinner",
  },
  {
    name: "Snack",
  },
];

const foods = [
  {
    title: "Carbs",
  },
  {
    title: "Protein",
  },
  {
    title: "Fats",
  },
];

export default function Diet() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/diet.png")}
        />
      </View>
      <View style={styles.dateLine}>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.preButton}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <Text style={styles.dateName}>Today</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            style={[styles.preButton, styles.nextButton]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.progressCon}>
        <View style={styles.row}>
          <Text style={styles.miniText}>Eaten</Text>
          <Text style={styles.miniText}>Remaining</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.desc}>
            <Text style={styles.boldText}>0</Text> kcal
          </Text>
          <Text style={styles.boldText}>3452</Text>
        </View>
        <View style={styles.progress}>
          <View style={styles.filler} />
        </View>
      </View>
      <View style={styles.items}>
        {foods.map((item, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.round}>
              <Text style={styles.boldText}>0</Text>
              <Text style={styles.miniText}>/100g</Text>
            </View>
            <Text style={styles.desc}>{item.title}</Text>
          </View>
        ))}
      </View>
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.addBtn} onPress={() => {navigationService.navigate("mealPage")}}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      ))}
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
    width: 100,
    height: 100,
    tintColor: "#25436B",
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  preButton: {
    width: 30,
    height: 30,
  },
  nextButton: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  dateLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego",
  },
  plus: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 33,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 20,
    marginLeft: 20,
  },
  desc: {
    fontSize: 24,
    color: "#25436B",
    fontFamily: "Sego",
  },
  boldText: {
    fontFamily: "Sego-Bold",
    fontSize: 30,
  },
  miniText: {
    fontFamily: "Sego",
  },
  addBtn: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    height: 80,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  progressCon: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 40,
    marginHorizontal: 20,
    marginTop: 30,
    padding: 20,
  },
  progress: {
    height: 20,
    borderWidth: 2,
    borderColor: "#ACC5CC",
    backgroundColor: "#E4CCFF",
    borderRadius: 5,
    marginVertical: 20,
  },
  filler: {
    backgroundColor: "#D7F6FF",
    width: "70%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemText: {
    fontFamily: "Sego",
    fontSize: 32,
  },
  items: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  round: {
    width: "80%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: "#B3B3B3",
    borderRadius: 100,
  },
});
