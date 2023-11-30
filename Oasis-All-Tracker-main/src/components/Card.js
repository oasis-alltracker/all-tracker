import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import PayPassIcon from "../assets/icons/paypass";

const { width } = Dimensions.get("screen");

const Card = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container} disabled>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Actual Balance</Text>
        <PayPassIcon />
      </View>
      <Text style={styles.balance}>${item.balance}</Text>
      <View style={styles.header}>
        <View style={styles.row}>
          <View
            style={[
              styles.round,
              {
                zIndex: 2,
                backgroundColor: "#82AC99",
                opacity: 0.8,
              },
            ]}
          />
          <View style={[styles.round, { zIndex: 0, left: -10 }]} />
        </View>
        <Text style={styles.card}>{item.card}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    aspectRatio: 2 / 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#B2EDD3",
    borderRadius: 20,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Sego",
    fontSize: 16,
    color: "#1C1B20",
  },
  balance: {
    fontFamily: "Sego-Bold",
    color: "#1C1B20",
    fontSize: 34,
  },
  row: {
    flexDirection: "row",
  },
  card: {
    fontFamily: "Sego",
    color: "#000000",
  },
  round: {
    backgroundColor: "#1C1B20",
    width: 23,
    height: 23,
    borderRadius: 20,
  },
});

export default Card;
