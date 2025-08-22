import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import RNModal from "react-native-modal";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const habitOptions = [
  {
    label: "Meditate",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png",
  },
  {
    label: "Drink water",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png",
  },
  {
    label: "Walk dog",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png",
  },
  {
    label: "Go on a walk",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png",
  },
  {
    label: "Cold shower",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png",
  },
  {
    label: "Play music",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png",
  },
  {
    label: "Drink tea",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png",
  },
  {
    label: "Read",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png",
  },
  {
    label: "Run",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png",
  },
  {
    label: "Stretch",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png",
  },
  {
    label: "Exercise",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png",
  },
  {
    label: "Eat food",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png",
  },
  {
    label: "Journal",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png",
  },
  {
    label: "Be outdoors",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png",
  },
  {
    label: "Bike ride",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png",
  },
  {
    label: "Swim",
    image: "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png",
  },
];

export default function HabitSearchModal({
  getRef,
  selectHabit,
  backDropPressed,
}) {
  const theme = useContext(ThemeContext).value;
  const { width, height } = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    let ref = {
      open() {
        setIsVisible(true);
      },
      close() {
        setIsVisible(false);
      },
    };

    getRef(ref);
  }, []);

  const selectHabitHandler = (habit) => {
    selectHabit(habit);
    setIsVisible(false);
  };

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
        backDropPressed();
      }}
      backdropOpacity={0}
      style={[styles.scrollModal, { height: height * 0.7 }]}
    >
      <SafeAreaView
        style={[
          styles.safeAreaContainer,
          sharedStyles["pageBackground_" + theme],
        ]}
      >
        <ScrollView
          style={[
            styles.habitSearchContainer,
            { height: height * 0.7, width: width },
          ]}
        >
          <View style={styles.scrollViewView}>
            <TouchableOpacity
              style={[
                styles.backButton,
                sharedStyles["pageBackground_" + theme],
              ]}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Image
                style={[styles.backImage, sharedStyles["tint_" + theme]]}
                resizeMode="cover"
                source={require("../../../assets/images/back-arrow.png")}
              />
            </TouchableOpacity>
            <View style={styles.habitOptionsContainer}>
              {habitOptions.map((item, index) => (
                <View key={index} style={styles.habitItem}>
                  <TouchableOpacity
                    style={[
                      styles.habitSelector,
                      sharedStyles["borderedContainer_" + theme],
                    ]}
                    onPress={() => selectHabitHandler(item.label)}
                  >
                    <Image
                      style={styles.habitOption}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={[styles.text, sharedStyles["textColour_" + theme]]}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  scrollModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  habitSearchContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  habitOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    alignContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  habitItem: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  habitOption: {
    width: 80,
    height: 80,
  },
  habitSelector: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollViewView: {
    paddingTop: 30,
    paddingBottom: 60,
  },
  text: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
    marginTop: 2,
    textAlign: "center",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 12,
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
});
