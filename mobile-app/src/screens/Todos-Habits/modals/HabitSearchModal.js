import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import RNModal from "react-native-modal";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValueSheet } from "../../../ValueSheet";

export default function HabitSearchModal({
  getRef,
  selectHabit,
  backDropPressed,
}) {
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
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          style={[
            styles.habitSearchContainer,
            { height: height * 0.7, width: width },
          ]}
        >
          <View style={styles.scrollViewView}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Image
                style={styles.backImage}
                resizeMode="cover"
                source={require("../../../assets/images/back-arrow.png")}
              />
            </TouchableOpacity>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Meditate")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Meditate</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Drink water")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Drink water</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Walk dog")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Walk dog</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Go on a walk")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Go on a walk</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Cold shower")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Cold shower</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Play music")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Play music</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Drink tea")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Drink tea</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Read")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Read</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Run")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Run</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Stretch")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Stretch</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Exercise")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Exercise</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Eat food")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Eat food</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Journal")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Journal</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Be outdoors")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Be outdoors</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Bike ride")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Bike ride</Text>
              </View>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabitHandler("Swim")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>Swim</Text>
              </View>
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
  habitSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 15,
    marginBottom: 5,
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
    backgroundColor: ValueSheet.colours.secondaryColour65,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
  },
  scrollViewView: {
    paddingTop: 30,
    paddingBottom: 60,
  },
  text: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
    color: ValueSheet.colours.primaryColour,
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
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 12,
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
});
