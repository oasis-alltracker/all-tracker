import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Spinner from "react-native-loading-spinner-overlay";

const { width, height } = Dimensions.get("window");

export default function MyHabits({
  isLoading,
  habits,
  createHabitRef,
  updateHabitRef,
}) {
  const Habits = () => (
    <View style={{ height: 365 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {habits.map((val, key) => {
          return (
            <TouchableOpacity
              key={key.toString()}
              onPress={() => {
                updateHabitRef.current.open(true, {
                  isPositive: val.isPositive,
                  habitName: val.name,
                  pngURL: val.pngURL,
                  threshold: val.threshold,
                  time: val.time,
                  habitID: val.SK,
                });
              }}
              style={[
                styles.item,
                key === habits.length - 1 && { borderBottomWidth: 2 },
              ]}
            >
              <Text style={styles.itemText}>{val.name}</Text>
              <Text
                style={[
                  styles.itemText2,
                  val.isPositive && { color: "#7FE5FF" },
                ]}
              >
                {val.isPositive ? "Good" : "Bad"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const CreatHabits = () => (
    <TouchableOpacity
      onPress={() => {
        createHabitRef.current.open();
      }}
      style={styles.addButton}
    >
      <Text style={styles.buttonText}>
        Click here to create your first habit
      </Text>
      <View style={styles.plusCon}>
        <Image
          style={styles.plusImage}
          source={require("../../assets/images/plus.png")}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Spinner visible={isLoading}></Spinner>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        removeClippedSubviews={false}
      >
        <View style={styles.headerImageCon}>
          <Image
            style={styles.headerImage}
            source={require("../../assets/images/habits512.png")}
          />
        </View>

        <View style={[styles.line, { paddingTop: 15, marginBottom: 15 }]}>
          <Text style={styles.habitsTitle}>My habits</Text>
          <View style={styles.buttonItems}>
            <TouchableOpacity
              onPress={() => {
                createHabitRef.current.open();
              }}
            >
              <Image
                style={styles.plus}
                source={require("../../assets/images/plus512.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.center}>
          {habits.length > 0 ? <Habits /> : <CreatHabits />}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
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
  headerImageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  headerImage: {
    width: 90,
    height: 90,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  title: {
    padding: 10,
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
    paddingTop: 20,
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
    backgroundColor: "rgba(215, 246, 255, 0.35)",
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: "rgba(204, 204, 204, 0.728)",
    width: width - 30,
    height: 350,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 80,
    width: width - 30,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  habitsTitle: {
    fontSize: 31,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  plus: {
    width: 40,
    height: 40,
  },
  itemText: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",

    flex: 1,
  },
  itemText2: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "rgba(37, 67, 107, 0.6)",
    fontFamily: "Sego",
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
  buttonItems: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
  refresh: {
    width: 30,
    height: 30,
  },
});
