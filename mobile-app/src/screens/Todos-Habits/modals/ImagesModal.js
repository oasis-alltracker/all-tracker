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
  scrollModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
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
  safeAreaContainer: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
  },
  scrollViewView: {
    paddingTop: 30,
    paddingBottom: 60,
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
