import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import RNModal from "react-native-modal";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HabitSearchModal({
  getRef,
  selectHabit,
  reopenMain,
  setIsLoading,
  backDropPressed,
}) {
  const { width, height } = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    let ref = {
      open() {
        setTimeout(() => {
          setIsVisible(true);
        }, 1700);
      },
      close() {
        setIsLoading(false);
        setIsVisible(false);
        reopenMain();
      },
    };

    getRef(ref);
  }, []);

  const selectHabitHandler = (habit) => {
    selectHabit(habit);
    setIsLoading(false);
    setIsVisible(false);
    reopenMain();
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
                setIsLoading(false);
                reopenMain();
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
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  searchImage: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
    padding: 40,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 25,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  title: {
    color: "#25436B",
    fontSize: 32,
    fontFamily: "Sego-Bold",
    width: 240,
  },
  key: {
    color: "#25436B",
    fontSize: 23,
    fontFamily: "Sego",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(172, 197, 204, 0.75)",
    borderRadius: 20,
    width: 120,
    height: 40,
    paddingHorizontal: 20,
    color: "#25436B",
    textAlign: "center",
    fontFamily: "Sego",
    fontSize: 18,
  },
  button: {
    width: "47%",
  },
  timeButton: {
    borderWidth: 1.5,
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 40,
    borderRadius: 20,
    width: 130,
    marginLeft: 12,
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  image: {
    width: 70,
    height: 70,
  },
  selectImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  imageOption: {
    width: 50,
    height: 50,
  },
  imageSelector: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
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
    borderColor: "rgba(0,0,0,0)",
    backgroundColor: "rgba(215, 246, 255, 0.65)",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewView: {
    paddingTop: 30,
    paddingBottom: 60,
  },
  timeValueButton: {
    flex: 1,
    alignSelf: "flex-end",
  },
  timeValue: {
    flex: 1,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "#25436B",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
    width: 150,
  },
  timeValueButton: {
    flex: 1,
    alignSelf: "flex-end",
  },
  timeValue: {
    flex: 1,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "rgba(172, 197, 204, 0.75)",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  timeContainer: {
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },

  itemContainer3: {
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    width: 59,
    alignItems: "center",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginLeft: 15,
    flex: 1,
  },
  bottomItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 15,
    width: 140,
  },
  smallText: {
    color: "#25436B",
    fontSize: 12,
    fontFamily: "Sego",
    paddingHorizontal: 5,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
  text: {
    fontFamily: "Sego",
    fontSize: 18,
    color: "#25436B",
    marginTop: 2,
    textAlign: "center",
  },
  timeText: {
    fontFamily: "Sego",
    fontSize: 18,
    color: "#25436B",
    textAlign: "center",
    alignItems: "center",
    marginTop: 5,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
});
