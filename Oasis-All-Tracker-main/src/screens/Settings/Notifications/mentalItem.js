import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Switch } from "../../../components";

const MentalItem = ({ item }) => {
  const [active, setActive] = useState(1);
  return (
    <View style={[styles.itemContainer, styles.itemContainer2]}>
      <View style={styles.line}>
        <Switch />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      <View style={styles.bottomItems}>
        {item.items.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setActive(index);
              }}
              key={index.toString()}
              style={[
                styles.itemContainer,
                styles.itemContainer3,
                index === active && { backgroundColor: "#D7F6FF" },
              ]}
            >
              <Text style={styles.smallText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
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

  line: {
    flexDirection: "row",
    alignItems: "center",
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

export default MentalItem;
