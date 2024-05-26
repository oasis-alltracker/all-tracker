import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import navigationService from "../../navigators/navigationService";
const { width, height } = Dimensions.get("window");

export default function Sleep({ sleepRef, allSleepReports }) {
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
        <TouchableOpacity
          onPress={() => navigationService.navigate("sleepStep1")}
        >
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
      {allSleepReports.length > 0 ? (
        <>
          {allSleepReports.map((val, key) => {
            return <RenderItems key={key} item={val} sleepRef={sleepRef} />;
          })}
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              sleepRef.current.open();
            }}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>
              Click here to review your sleep.
            </Text>
            <View style={styles.plusCon}>
              <Image
                style={styles.plusImage}
                source={require("../../assets/images/plus.png")}
              />
            </View>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

export const RenderItems = ({ item, sleepRef }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => sleepRef.current.open(item)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
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
  plusCon: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(215, 246, 255, 0.35)",
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: "rgba(204, 204, 204, 0.728)",
    width: width - 30,
    height: 190,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  buttonText: {
    color: "rgba(37, 67, 107, 0.6)",
    fontFamily: "Sego",
    paddingBottom: 15,
  },
  plusImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
