import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Header, Switch } from "../../../components";
import MentalItem from "./mentalItem";
import EmotionalItem from "./emotionalItem";

const mentalData = [
  {
    title: "Habits",
    items: ["Day before", "Hour before", "Custom"],
  },
  {
    title: "To-dos",
    items: ["Day before", "Hour before", "Custom"],
  },
];

const physicalData = [
  {
    title: "Breakfast",
    time: "8:00 AM",
  },
  {
    title: "Lunch",
    time: "8:00 AM",
  },
  {
    title: "Dinner",
    time: "8:00 AM",
  },
];

const emotionalData = [
  "Wellness check-in",
  "Bedtime reminder",
  "Morning alarm",
];

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Header showCenter={false} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.screenName}>Notifications</Text>
          <Switch width={55} height={33} />
        </View>
        <Text style={styles.sectionTitle}>mental</Text>
        {mentalData.map((val, key) => {
          return <MentalItem item={val} key={key.toString()} />;
        })}
        <Text style={styles.sectionTitle}>Physical</Text>
        {physicalData.map((val, key) => {
          return (
            <View
              key={key.toString()}
              style={[styles.itemContainer, styles.itemContainer4]}
            >
              <Switch />
              <Text style={styles.itemTitle}>{val.title}</Text>
              <View
                style={[
                  styles.itemContainer,
                  styles.itemContainer3,
                  { backgroundColor: "#D7F6FF" },
                ]}
              >
                <Text style={styles.smallText}>{val.time}</Text>
              </View>
            </View>
          );
        })}
        <Text style={styles.sectionTitle}>Emotional</Text>
        {emotionalData.map((val, key) => {
          return <EmotionalItem item={val} key={key} />;
        })}
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
  },
  itemContainer3: {
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginBottom: 0,
  },
  itemContainer4: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenName: {
    color: "#25436B",
    fontSize: 30,
    fontFamily: "Sego-Bold",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 40,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  itemTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginLeft: 15,
    flex: 1,
  },
  bottomItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  smallText: {
    color: "#25436B",
    fontSize: 12,
    fontFamily: "Sego",
  },
});

export default Notifications;
