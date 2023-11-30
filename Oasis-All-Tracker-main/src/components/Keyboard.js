import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { memo } from "react";
import ClearIcon from "../assets/icons/clear";

const Keyboard = ({ clearHandler, pressKeys }) => {
  return (
    <View style={styles.keys}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => {
        return (
          <TouchableOpacity
            onPress={() => pressKeys(item)}
            style={styles.key}
            key={i}
          >
            <Text style={styles.keyTxt}>{item}</Text>
          </TouchableOpacity>
        );
      })}
      <View style={[styles.key, { backgroundColor: "transparent" }]} />
      <TouchableOpacity onPress={() => pressKeys(0)} style={styles.key}>
        <Text style={styles.keyTxt}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={clearHandler}
        style={[styles.key, { backgroundColor: "transparent" }]}
      >
        <ClearIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  keys: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  key: {
    backgroundColor: "#F0EEF5",
    borderRadius: 16,
    width: "30%",
    marginHorizontal: "1%",
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  keyTxt: {
    fontSize: 20,
    fontFamily: "Sego-Bold",
    color: "#1C1B20",
  },
});

export default memo(Keyboard);
