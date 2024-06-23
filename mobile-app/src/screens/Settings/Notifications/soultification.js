import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Switch } from "../../../components";

const weekDays = ["Every day", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Soultification = ({ item }) => {
  const [active, setActive] = useState(0);

  return (
    <View style={[styles.itemContainer, styles.itemContainer2]}>
      <View style={styles.line}>
        <Text style={styles.itemTitle}>{item}</Text>
        <Switch />
      </View>
      <View style={styles.line}>
        {weekDays.map((val, key) => {
          return (
            <TouchableOpacity
              key={key.toString()}
              onPress={() => {
                setActive(key);
              }}
              style={
                key === active
                  ? [styles.itemContainer, styles.itemContainer4]
                  : {}
              }
            >
              <Text style={styles.smallText}>{val}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.line}>
        <Text style={[styles.smallText, { fontSize: 15 }]}>A what time ?</Text>
        <View style={[styles.itemContainer, styles.itemContainer3]}>
          <Text style={styles.smallText}>8:00 am</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/images/plus.png")}
          resizeMode="contain"
          style={styles.plusImage}
        />
      </TouchableOpacity>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
  },
  itemContainer3: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 0,
    backgroundColor: "#D7F6FF",
  },
  itemContainer4: {
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 3,
    marginBottom: 0,
    backgroundColor: "#D7F6FF",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 8,
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
  plusImage: {
    width: 22,
    height: 22,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default Soultification;
