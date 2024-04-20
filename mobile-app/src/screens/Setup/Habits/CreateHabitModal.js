import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RNModal from "react-native-modal";
import { Image, Platform } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";

import HabitsDB from "../../../api/DB/habitsDB";

import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function CreateHabitModal({ getRef, createHabit }) {
  const [visible, setVisible] = useState(false);

  const [imageSearch, setImageSearch] = useState(false);
  const [habitSearch, setHabitSearch] = useState(false);

  const [image, setImage] = useState(
    "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
  );

  const [tempHabitName, setTempHabitName] = useState(false);
  const [tempIsPositiveIndex, setTempIsPositiveIndex] = useState(false);
  const [tempThreshold, setTempThreshold] = useState(false);
  const [tempTime, setTempTime] = useState(false);

  useEffect(() => {
    let ref = {
      open() {
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  const selectImage = async (imageUrl) => {
    setImage(imageUrl);
    setImageSearch(false);
  };

  const selectHabit = async (habitName) => {
    presetHabits = HabitsDB.viewHabits();
    presetHabit = presetHabits.find((habit) => habit.name === habitName);
    setTempHabitName(presetHabit.name);
    setTempIsPositiveIndex(presetHabit.isPositive ? 0 : 1);
    setImage(presetHabit.pngUrl);
    setHabitSearch(false);
  };

  const backDropPressed = () => {
    setTempHabitName(false);
    setTempIsPositiveIndex(false);
    setTempThreshold(false);
    setTempTime(false);

    setVisible(false);
    setHabitSearch(false);
    setImageSearch(false);
    setImage("https://oasis-images.s3.ca-central-1.amazonaws.com/white.png");
  };

  const CurrentModal = () => (
    <>
      {imageSearch ? (
        <ImageModal />
      ) : habitSearch ? (
        <SearchModal />
      ) : (
        <MainModal />
      )}
    </>
  );

  const SearchModal = () => (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => backDropPressed()}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.scrollModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header showCenter={false} />
        <ScrollView style={styles.habitSearchContainer}>
          <View style={styles.scrollViewView}>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabit("Meditate")}
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
                  onPress={() => selectHabit("Drink water")}
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
                  onPress={() => selectHabit("Walk dog")}
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
                  onPress={() => selectHabit("Go on a walk")}
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
                  onPress={() => selectHabit("Cold shower")}
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
                  onPress={() => selectHabit("Play music")}
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
                  onPress={() => selectHabit("Drink tea")}
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
                  onPress={() => selectHabit("Read")}
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
                  onPress={() => selectHabit("Run")}
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
                  onPress={() => selectHabit("Stretch")}
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
                  onPress={() => selectHabit("Exercise")}
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
                  onPress={() => selectHabit("Eat food")}
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
                  onPress={() => selectHabit("Journal")}
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
                  style={[
                    styles.habitSelector,
                    { backgroundColor: "rgba(255, 216, 247, 0.62)" },
                  ]}
                  onPress={() => selectHabit("No junk food")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-junk-food.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>No junk food</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabit("Be outdoors")}
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
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={[
                    styles.habitSelector,
                    { backgroundColor: "rgba(255, 216, 247, 0.62)" },
                  ]}
                  onPress={() => selectHabit("No phone")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-phone.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>No phone</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabit("Bike ride")}
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
                  style={[
                    styles.habitSelector,
                    { backgroundColor: "rgba(255, 216, 247, 0.62)" },
                  ]}
                  onPress={() => selectHabit("No alcohol")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/no-alcohol.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>No alcohol</Text>
              </View>
            </View>
            <View style={styles.habitSearchRow}>
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={styles.habitSelector}
                  onPress={() => selectHabit("Swim")}
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
              <View style={styles.habitItem}>
                <TouchableOpacity
                  style={[
                    styles.habitSelector,
                    { backgroundColor: "rgba(255, 216, 247, 0.62)" },
                  ]}
                  onPress={() => selectHabit("No drugs")}
                >
                  <Image
                    style={styles.habitOption}
                    source={{
                      uri: "https://oasis-images.s3.ca-central-1.amazonaws.com/recreational-drugs.png",
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>No drugs</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </RNModal>
  );

  const ImageModal = () => (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => backDropPressed()}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.scrollModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header showCenter={false} />
        <ScrollView style={styles.tcContainer}>
          <View style={styles.scrollViewView}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imageSelector}
                onPress={() =>
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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
                  selectImage(
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

  const MainModal = () => {
    const [habitName, setHabitName] = useState("");
    const [isPositiveIndex, setIsPositiveIndex] = useState("");
    const [threshold, setThreshold] = useState("");
    const [time, setTime] = useState(new Date("1995-12-17T12:00:00"));
    const [show, setShow] = useState(false);

    const [timeIsSet, setTimeIsSet] = useState(false);

    const items = ["Good", "Bad"];

    const onSave = () => {
      if (!habitName) {
        Toast.show("Don't forget to give this habit a name.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      } else if (threshold <= 0) {
        Toast.show("'Times a day' needs to be greater than 0.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      } else if (time == new Date("1995-12-17T12:00:00")) {
        Toast.show("Don't forget to set a time.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      } else if (
        habitName &&
        isPositiveIndex !== "" &&
        threshold &&
        image != "https://oasis-images.s3.ca-central-1.amazonaws.com/white.png"
      ) {
        habit = {
          name: habitName,

          threshold: threshold,
          pngURL: image,
          time: time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          }),
        };
        if (isPositiveIndex == 0) {
          habit.isPositive = true;
        } else {
          habit.isPositive = false;
        }
        backDropPressed();
        createHabit(habit);
      } else {
        Toast.show("You must complete the form to create a habit.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      }
    };

    const searchImage = () => {
      setTempHabitName(habitName);
      setTempIsPositiveIndex(isPositiveIndex);
      setTempThreshold(threshold);
      setTempTime(time);
      setImageSearch(true);
    };

    const searchHabit = () => {
      setTempThreshold(threshold);
      setTempTime(time);
      setHabitSearch(true);
    };

    const onChange = (event, selectedDate) => {
      if (Platform.OS === "android") {
        setShow(false);
      }

      setTime(selectedDate);
      setTimeIsSet(true);
    };

    const formatDateObject = (dateObject) => {
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return dateObject.toLocaleString("en-US", options);
    };

    useEffect(() => {
      if (tempHabitName && habitName === "") {
        setHabitName(tempHabitName);
      }
      if (
        (tempIsPositiveIndex === 0 || tempIsPositiveIndex === 1) &&
        isPositiveIndex === ""
      ) {
        setIsPositiveIndex(tempIsPositiveIndex);
      }
      if (tempThreshold && threshold === "") {
        setThreshold(tempThreshold);
      }
      if (tempTime && !timeIsSet) {
        setTime(tempTime);
      }
    }, []);

    return (
      <RNModal
        isVisible={visible}
        onBackButtonPress={() => backDropPressed()}
        onBackdropPress={() => backDropPressed()}
        backdropColor="rgba(215, 246, 255, 0.27)"
        style={styles.modal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.row}>
              <TextInput
                placeholderTextColor={"#25436B"}
                placeholder="Name"
                style={styles.title}
                onChangeText={setHabitName}
                value={habitName}
              />
              <TouchableOpacity onPress={() => searchHabit()}>
                <Image
                  style={styles.searchImage}
                  source={require("../../../assets/images/search2.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Image:</Text>
              <TouchableOpacity
                style={styles.selectImage}
                onPress={() => searchImage()}
              >
                <Image style={styles.image} source={{ uri: image }} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Good or bad:</Text>
              <View style={[styles.itemContainer, styles.itemContainer2]}>
                <View style={styles.bottomItems}>
                  {items.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setIsPositiveIndex(index);
                        }}
                        key={index.toString()}
                        style={[
                          styles.itemContainer,
                          styles.itemContainer3,
                          index === isPositiveIndex && {
                            backgroundColor: "#D7F6FF",
                          },
                        ]}
                      >
                        <Text style={styles.smallText}>{item}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.key}>Times a day:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setThreshold}
                keyboardType="number-pad"
                value={threshold}
                onSubmitEditing={Keyboard.dismiss}
                maxLength={2}
              />
            </View>

            <View style={styles.row2}>
              <Button
                onPress={() => backDropPressed()}
                style={[styles.button, styles.back]}
              >
                Cancel
              </Button>
              <Button onPress={() => onSave()} style={styles.button}>
                Save
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </RNModal>
    );
  };

  return <CurrentModal />;
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
    height: height * 0.7,
  },
  container: {
    width: "90%",
    paddingVertical: 20,
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
    width: 130,
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
    width: 90,
    height: 90,
  },
  selectImage: {
    width: 135,
    height: 135,
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
    marginLeft: 10,
    marginRight: 10,
    height: height * 0.7,
  },
  habitSearchContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    height: height * 0.7,
    width: width,
  },
  habitSearchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
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
    paddingTop: 60,
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
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
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
});
