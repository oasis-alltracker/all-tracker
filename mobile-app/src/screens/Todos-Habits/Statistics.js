import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import TaskStats from "../Stats/TaskStats";
import HabitStats from "../Stats/HabitStats";

export default function Statistics(trackingPreferences) {
  var thisMonday = new Date();
  thisMonday.setDate(thisMonday.getDate() - ((thisMonday.getDay() + 6) % 7));

  const [selectedMonday, setSelectedMonday] = useState(new Date());

  const updateWeek = (dateChange) => {
    var newDate = new Date(
      selectedMonday.setDate(selectedMonday.getDate() + dateChange)
    );
    setSelectedMonday(newDate);
  };

  useEffect(() => {
    var newDate = new Date(
      thisMonday.setDate(thisMonday.getDate() - ((thisMonday.getDay() + 6) % 7))
    );
    setSelectedMonday(newDate);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/stats.png")}
        />
      </View>

      <View style={styles.dateLineMain}>
        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => updateWeek(-7)}
        >
          <Image
            style={[styles.preButtonMain, styles.nextButtonMain]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <>
          {moment(thisMonday).format("YYYYMMDD") ==
          moment(selectedMonday).format("YYYYMMDD") ? (
            <Text style={styles.dateNameMain}>This week</Text>
          ) : (
            <Text style={styles.dateNameMain}>
              Week of {selectedMonday.toDateString().slice(4, -4)}
            </Text>
          )}
        </>
        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => updateWeek(7)}
        >
          <Image
            style={styles.preButtonMain}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      {trackingPreferences.trackingPreferences.habitsSelected && <HabitStats />}
      {trackingPreferences.trackingPreferences.toDosSelected && <TaskStats />}
    </ScrollView>
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
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
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
    // borderWidth: 1,
    // borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // backgroundColor: "#D7F6FF",
    // borderWidth: 1,
    // borderColor: "#CCCCCC",
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego",
  },
  chartBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    paddingRight: 35,
  },
  chartCircle: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    marginRight: 40,
  },
  imageCircle: {
    width: 28,
    height: 28,
  },
  text: {
    fontSize: 13,
    fontFamily: "Sego",
    color: "#25436B",
  },
  xLabel: {
    fontSize: 12,
    fontFamily: "Sego",
  },
  chartContainer: {
    alignItems: "center",
  },
  dateLineMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  buttonMain: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderRightColor: "#ccc",
    borderLeftColor: "#ccc",
  },
  dateNameMain: {
    fontSize: 26,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  preButtonMain: {
    width: 30,
    height: 30,
  },
  nextButtonMain: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
});
