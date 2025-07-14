import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sharedStyles } from "../styles";
import { ValueSheet } from "../../ValueSheet";

export default function MyHabits({
  isLoading,
  setIsLoading,
  habits,
  createHabitRef,
  updateHabitRef,
}) {
  const { width, height } = useWindowDimensions();

  const Habits = () => (
    <View style={{ height: height * 0.43 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer, { width: width - 30 }]}
      >
        {habits.map((val, key) => {
          return (
            <TouchableOpacity
              key={key.toString()}
              onPress={() => {
                setIsLoading(true);
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
              <Text>
                <View
                  style={styles.habitImageContainer}
                  onPress={() => searchImage()}
                >
                  <Image
                    style={styles.habitImage}
                    source={{ uri: val.pngURL }}
                  />
                </View>
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
        setIsLoading(true);
        createHabitRef.current.open();
      }}
      style={[styles.addButton, { width: width - 30, height: height * 0.4 }]}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        removeClippedSubviews={false}
      >
        <View
          style={[
            sharedStyles.headerImageContainer,
            {
              backgroundColor: "rgba(255, 207, 245, 0.65)",
              borderColor: "rgba(255, 207, 245, 0.70)",
            },
          ]}
        >
          <Image
            style={sharedStyles.headerImage}
            source={require("../../assets/images/habits512.png")}
          />
        </View>

        <View style={[styles.line, { paddingTop: 15, marginBottom: 15 }]}>
          <Text style={styles.habitsTitle}>My habits</Text>
          <View style={styles.buttonItems}>
            <TouchableOpacity
              onPress={() => {
                setIsLoading(true);
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
  habitImage: {
    width: 30,
    height: 30,
  },
  habitImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
  },
  center: {
    alignItems: "center",
  },
  plusImage: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  plusCon: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: ValueSheet.colours.secondaryColour27,
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: ValueSheet.colours.grey75,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 80,
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
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  plus: {
    width: 40,
    height: 40,
  },
  itemText: {
    color: ValueSheet.colours.black,
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: ValueSheet.colours.black50,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  buttonItems: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
});
