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

const Personal = () => {
  const [datas] = useState([
    {
      title: "20 years",
      img: require("../../assets/images/birthday.png"),
      text: "Age",
    },
    {
      title: "67 kg",
      img: require("../../assets/images/weight.png"),
      text: "Weight",
    },
    {
      title: "185 cm",
      img: require("../../assets/images/height.png"),
      text: "Height",
    },
    {
      title: "Male",
      img: require("../../assets/images/gender.png"),
      text: "Gender",
    },
  ]);
  return (
    <View style={styles.container}>
      <Header showCenter={false} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Personal Details</Text>
        {datas.map((item, index) => (
          <View style={styles.item} key={index}>
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.row}>
                <Image source={item.img} style={styles.itemImg} />
                <Text style={styles.text}>{item.text}</Text>
              </View>
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
  item: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 30,
    fontFamily: "Sego",
    color: "#25436B",
  },
  itemImg: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  editImg: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 16,
    fontFamily: "Sego",
    color: "#25436B",
  },
});

export default Personal;
