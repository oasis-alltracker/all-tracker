import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import RNModal from "react-native-modal";
import { Image, StyleSheet, useWindowDimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

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
        // setTimeout(() => {
        //   setIsVisible(true);
        // }, 1700);
        setIsVisible(true);
      },
      close() {
        //setIsLoading(false);
        setIsVisible(false);
        //reopenMain();
      },
    };

    getRef(ref);
  }, []);

  const selectImageHandler = (image) => {
    selectImage(image);
    //setIsLoading(false);
    setIsVisible(false);
    //reopenMain();
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
                //setIsLoading(false);
                setIsVisible(false);
                //reopenMain();
              }}
            >
              <Image
                style={styles.backImage}
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
                        style={styles.imageSelector}
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
