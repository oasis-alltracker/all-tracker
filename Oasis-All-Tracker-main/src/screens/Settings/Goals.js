import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Header } from "../../components";

const Goals = () => {
  const [datas] = useState([
    {
      title: "200 g/day",
      img: require("../../assets/images/rice.png"),
      text: "Carbs",
    },
    {
      title: "178 g/day",
      img: require("../../assets/images/protein.png"),
      text: "Protein",
    },
    {
      title: "55 g/day",
      img: require("../../assets/images/fats.png"),
      text: "Fats",
    },
  ]);
  return (
    <View style={styles.container}>
      <Header showCenter={false} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Goals</Text>
        <View style={[styles.item, styles.head]}>
          <View style={[styles.item, styles.headItem]}>
            <View style={styles.row}>
              <Image
                source={require("../../assets/images/calories.png")}
                style={styles.itemImg}
              />
              <Text style={styles.text}>Calorie Intake</Text>
            </View>
            <TouchableOpacity>
              <Image
                style={styles.editImg}
                source={require("../../assets/images/edit.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.itemTitle, { fontSize: 32 }]}>
            3267 kcal/day
          </Text>
        </View>
        {datas.map((item, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.row}>
              <Image source={item.img} style={styles.itemImg} />
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity>
              <Image
                style={styles.editImg}
                source={require("../../assets/images/edit.png")}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  title: {
    fontFamily: "Sego-Bold",
    fontSize: 36,
    color: "#25436B",
    marginVertical: 25,
    alignSelf: "center",
  },
  head: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  headItem: {
    borderWidth: 0,
    padding: 0,
    width: "100%",
    marginHorizontal: 0,
    paddingVertical: 5,
  },
  item: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 22,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginLeft: 15,
  },
  itemImg: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  editImg: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 22,
    fontFamily: "Sego",
    color: "#25436B",
  },
});

export default Goals;
