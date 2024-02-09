import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const items = [
  {
    name: "Aug 18-19",
  },
  {
    name: "Aug 17-18",
  },
  {
    name: "Aug 9-10",
  },
];

export default function Sleep() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/sleep.png")}
        />
      </View>
      <View style={[styles.line, { marginBottom: 15 }]}>
        <Text style={styles.title}>Sleep Journal</Text>
        <TouchableOpacity>
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
      {items.map((val, key) => {
        return <RenderItems key={key} item={val} />;
      })}
    </ScrollView>
  );
}

export const RenderItems = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

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
    backgroundColor: "#FFEFBD",
    borderColor: "#CCBF98",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  plus: {
    width: 40,
    height: 40,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 33,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#ccc",
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    color: "#1E1E1E",
    fontSize: 24,
    fontFamily: "Sego",
    flex: 1,
  },
});
