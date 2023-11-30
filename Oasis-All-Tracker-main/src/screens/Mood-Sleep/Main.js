import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

export default function Main() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/soul-white.png")}
        />
      </View>
      <View style={styles.dateLine}>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.preButton}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <Text style={styles.dateName}>Today</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            style={[styles.preButton, styles.nextButton]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Mood</Text>
      <Text style={styles.desc}>How are you feeling?</Text>
      <TouchableOpacity style={styles.addBtn}>
        <Image
          style={styles.plus}
          source={require("../../assets/images/plus-2.png")}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Sleep</Text>
      <Text style={styles.desc}>How was your sleep?</Text>
      <TouchableOpacity style={styles.addBtn}>
        <Image
          style={styles.plus}
          source={require("../../assets/images/plus-2.png")}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

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
    tintColor: "#25436B",
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
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego",
  },
  plus: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 33,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 20,
    marginLeft: 20,
  },
  desc: {
    fontSize: 24,
    color: "#25436B",
    fontFamily: "Sego",
    marginLeft: 20,
  },
  addBtn: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
});
