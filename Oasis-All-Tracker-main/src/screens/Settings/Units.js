import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header } from "../../components";

const data = [
  {
    title: "Food",
    data: [
      {
        src: require("../../assets/images/weight-scales.png"),
        unit: "Weight",
        unitValue: "Grams (g)",
      },
      {
        src: require("../../assets/images/volume-up.png"),
        unit: "Volume",
        unitValue: "Millilitres (mL)",
      },
      {
        src: require("../../assets/images/energy.png"),
        unit: "Energy",
        unitValue: "  Kilocalories (kcal))",
      },
    ],
  },
  {
    title: "Body",
    data: [
      {
        src: require("../../assets/images/weight-2.png"),
        unit: "Weight",
        unitValue: "Kilograms (kg)",
      },
      {
        src: require("../../assets/images/height-2.png"),
        unit: "Height",
        unitValue: "Centimetres (cm)",
      },
    ],
  },
];

export default function Units() {
  return (
    <View style={styles.container}>
      <Header showCenter={false} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenName}>Units</Text>
        {data.map((val, key) => {
          return (
            <View key={key.toString()}>
              <Text style={styles.title}>{val.title}</Text>
              {val.data.map((item, index) => {
                return (
                  <View key={index.toString()} style={styles.renderItem}>
                    <Image style={styles.image} source={item.src} />
                    <Text style={styles.unit}>{item.unit}</Text>
                    <View style={styles.unitValueCon}>
                      <Text style={styles.unitValue}>{item.unitValue}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  screenName: {
    fontSize: 48,
    fontFamily: "Sego",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  renderItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#CCCCCC",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginBottom: 15,
  },
  image: {
    width: 32,
    height: 32,
  },
  unit: {
    fontSize: 20,
    color: "#25436B",
    fontFamily: "Sego",
    flex: 1,
    marginLeft: 15,
  },
  unitValueCon: {
    backgroundColor: "#D7F6FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ACC5CC",
  },
  unitValue: {
    fontSize: 12,
    color: "#25436B",
    fontFamily: "Sego",
  },
});
