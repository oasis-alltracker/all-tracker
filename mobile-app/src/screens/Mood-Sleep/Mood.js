import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import navigationService from "../../navigators/navigationService";
import moment from "moment";
import { sharedStyles } from "../styles";

const today = new Date();

const data = [
  {
    image: require("../../assets/images/moodRating/1.png"),
  },
  {
    image: require("../../assets/images/moodRating/2.png"),
  },
  {
    image: require("../../assets/images/moodRating/3.png"),
  },
  {
    image: require("../../assets/images/moodRating/4.png"),
  },
  {
    image: require("../../assets/images/moodRating/5.png"),
  },
];

export default function Mood({ moodRef, allWellnessReports }) {
  const { width, height } = useWindowDimensions();
  const Diaries = () => (
    <View style={{ height: 365 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer, { width: width - 30 }]}
      >
        {allWellnessReports.map((val, key) => {
          return (
            <TouchableOpacity
              key={key.toString()}
              onPress={() => {
                moodRef.current.open(val);
              }}
              style={[
                styles.item,
                key === allWellnessReports.length - 1 && {
                  borderBottomWidth: 2,
                },
              ]}
            >
              <Text style={styles.itemText}>{val.title}</Text>
              <Text>
                <View
                  style={styles.moodImageContainer}
                  onPress={() => searchImage()}
                >
                  <Image
                    style={styles.moodImage}
                    source={data[Number(val.feeling) - 1].image}
                  />
                </View>
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
  const CreateDiary = () => (
    <TouchableOpacity
      onPress={() => {
        navigationService.navigate("moodTest", {
          screen: "moodStep1",
          params: {
            dateString: today.toDateString(),
            dateStamp: moment(today).format("YYYYMMDD"),
          },
        });
      }}
      style={[styles.addButton, { width: width - 30, height: height * 0.43 }]}
    >
      <Text style={styles.buttonText}>
        Click here to do a wellness check-in.
      </Text>
      <View style={styles.plusCon}>
        <Image
          style={styles.plusImage}
          source={require("../../assets/images/plus.png")}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View
        style={[
          sharedStyles.headerImageContainer,
          {
            backgroundColor: "#FFEFBD",
            borderColor: "#ffe8a1",
          },
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/mood.png")}
        />
      </View>
      <View style={[styles.line, { paddingTop: 15, marginBottom: 15 }]}>
        <Text style={styles.title}>Wellness Diary</Text>
        <TouchableOpacity
          onPress={() =>
            navigationService.navigate("moodTest", {
              screen: "moodStep1",
              params: {
                dateString: today.toDateString(),
                dateStamp: moment(today).format("YYYYMMDD"),
              },
            })
          }
        >
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        {allWellnessReports.length > 0 ? <Diaries /> : <CreateDiary />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
    alignItems: "center",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#FFEFBD",
    borderColor: "#ffe8a1",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  center: {
    alignItems: "center",
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
  moodImage: {
    width: 30,
    height: 30,
  },
  moodImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },
  title: {
    fontSize: 31,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  itemText: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",

    flex: 1,
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
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
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  buttonText: {
    color: "rgba(37, 67, 107, 0.6)",
    fontFamily: "Sego",
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 80,
  },
});
