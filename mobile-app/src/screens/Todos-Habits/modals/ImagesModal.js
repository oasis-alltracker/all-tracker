import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import RNModal from "react-native-modal";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValueSheet } from "../../../ValueSheet";

export default function ImagesModal({
  getRef,
  selectImage,
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

  const selectImageHandler = (image) => {
    selectImage(image);
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
      <SafeAreaView style={[styles.safeAreaContainer, { width: width }]}>
        <ScrollView style={[styles.tcContainer, { height: height * 0.7 }]}>
          <View style={styles.scrollViewView}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setIsLoading(false);
                setIsVisible(false);
                reopenMain();
              }}
            >
              <Image
                style={styles.backImage}
                resizeMode="cover"
                source={require("../../../assets/images/back-arrow.png")}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/jumpsuit.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/jumpsuit.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/herbs.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/herbs.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/drum.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/drum.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/piano.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/piano.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/console.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/console.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/audio-jack.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/audio-jack.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/party-music.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/party-music.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/eco-idea.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/eco-idea.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/flipflop.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/flipflop.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/multimedia.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/multimedia.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/music-note.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/music-note.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/add-to-cart.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/add-to-cart.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/gym.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/gym.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/electric-guitar.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/electric-guitar.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/news.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/news.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/runner.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/runner.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/yoga.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/yoga.png",
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/exercise.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/exercise.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/smoking.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/smoking.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-food.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-food.png",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImageHandler(
                    "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png"
                  )
                }
              >
                <Image
                  style={styles.imageOption}
                  source={{
                    uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png",
                  }}
                />
              </TouchableOpacity>
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
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: ValueSheet.colours.black50,
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
    color: ValueSheet.colours.primaryColour,
    fontSize: 32,
    fontFamily: ValueSheet.fonts.primaryBold,
    width: 240,
  },
  key: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 23,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  input: {
    borderWidth: 1.5,
    borderColor: ValueSheet.colours.borderGrey75,
    borderRadius: 20,
    width: 120,
    height: 40,
    paddingHorizontal: 20,
    color: ValueSheet.colours.primaryColour,
    textAlign: "center",
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
  },
  button: {
    width: "47%",
  },
  timeButton: {
    borderWidth: 1.5,
    borderColor: ValueSheet.colours.borderGrey75,
    height: 40,
    borderRadius: 20,
    width: 130,
    marginLeft: 12,
  },
  back: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
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
    borderColor: ValueSheet.colours.borderGrey75,
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
    borderColor: ValueSheet.colours.borderGrey75,
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
  timeValueButton: {
    flex: 1,
    alignSelf: "flex-end",
  },
  timeValue: {
    flex: 1,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: ValueSheet.colours.primaryColour,
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
    borderColor: ValueSheet.colours.borderGrey75,
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
    borderColor: ValueSheet.colours.borderGrey75,
    width: 59,
    alignItems: "center",
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 22,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
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
    color: ValueSheet.colours.primaryColour,
    fontSize: 12,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingHorizontal: 5,
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
  text: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
    color: ValueSheet.colours.primaryColour,
    marginTop: 2,
    textAlign: "center",
  },
  timeText: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 18,
    color: ValueSheet.colours.primaryColour,
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
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 12,
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
});
