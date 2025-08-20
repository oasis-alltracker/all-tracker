import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import RNModal from "react-native-modal";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const imagesArray = [
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/meditate.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/drink-water.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/run.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/dog-walk.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/stretch.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/workout.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/cycling.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/walk.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/shower.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/journal.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/time-to-eat.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/guitar.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/tea.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/outdoors.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/swimming.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/jumpsuit.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/herbs.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/drum.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/piano.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/console.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/audio-jack.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/party-music.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/eco-idea.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/flipflop.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/multimedia.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/music-note.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/add-to-cart.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/gym.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/electric-guitar.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/news.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/runner.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/yoga.png",
  ],
  [
    "https://oasis-images.s3.ca-central-1.amazonaws.com/exercise.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/smoking.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/no-food.png",
    "https://oasis-images.s3.ca-central-1.amazonaws.com/read.png",
  ],
];

export default function ImagesModal({ getRef, selectImage, backDropPressed }) {
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

  const selectImageHandler = (image) => {
    selectImage(image);
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
          { width: width },
        ]}
      >
        <ScrollView style={[styles.tcContainer, { height: height * 0.7 }]}>
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
            {imagesArray.map((row, key) => {
              return (
                <View style={styles.row} key={key.toString()}>
                  {row.map((imageUrl, key2) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.imageSelector,
                          sharedStyles["borderedContainer_" + theme],
                        ]}
                        onPress={() => selectImageHandler(imageUrl)}
                        key={key.toString() + key2.toString()}
                      >
                        <Image
                          style={styles.imageOption}
                          source={{
                            uri: imageUrl,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
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
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  safeAreaContainer: {
    flex: 1,
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
    borderRadius: 12,
  },
  backImage: {
    width: "100%",
    height: "100%",
  },
});
