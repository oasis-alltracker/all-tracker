import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import RNModal from "react-native-modal";
import DietStats from "./DietStats";
import FitnessStats from "./FitnessStats";
import MoodStats from "./MoodStats";
import SleepStats from "./SleepStats";
import HabitStats from "./HabitStats";
import TaskStats from "./TaskStats";
import moment from "moment";
import { getAccessToken } from "../../user/keychain";
import UserAPI from "../../api/user/userAPI";
import { ValueSheet } from "../../ValueSheet";

const Stats = ({ getRef }) => {
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [trackingPreferences, setTrackingPreferences] = useState(false);

  const [updateStats, setUpdateStats] = useState(1);

  var thisSunday = new Date();
  thisSunday.setDate(thisSunday.getDate() - ((thisSunday.getDay() + 7) % 7));

  const [selectedSunday, setSelectedSunday] = useState(thisSunday);
  const updateWeek = (dateChange) => {
    setUpdateStats(updateStats + 1);
    var newDate = new Date(
      selectedSunday.setDate(selectedSunday.getDate() + dateChange)
    );
    setSelectedSunday(newDate);
  };

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      token = await getAccessToken();
      user = await UserAPI.getUser(token);

      setTrackingPreferences(user.data.trackingPreferences);
    };
    let ref = {
      open() {
        setVisible(true);
        getPreferencesOnLoad();
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => backDropPressed()}
      backdropColor={ValueSheet.colours.secondaryColour27}
      style={[styles.scrollModal, { height: height * 0.7 }]}
      presentationStyle="pageSheet"
      transparent={false}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.upImageContainer}
          onPress={() => {
            setVisible(false);
          }}
        >
          <Image
            style={styles.upImage}
            source={require("../..//assets/images/up-arrow.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statsImageCon, { width: width - 65 }]}
          onPress={() => {
            setVisible(false);
          }}
        >
          <Image
            style={styles.statsImage}
            source={require("../../assets/images/stats.png")}
          />
        </TouchableOpacity>

        <ScrollView style={[styles.tcContainer, { height: height * 0.7 }]}>
          <View style={styles.dateLineMain}>
            <TouchableOpacity
              style={styles.buttonMain}
              onPress={() => updateWeek(-7)}
            >
              <Image
                style={[styles.preButtonMain, styles.nextButtonMain]}
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
            <>
              {moment(thisSunday).format("YYYYMMDD") ==
              moment(selectedSunday).format("YYYYMMDD") ? (
                <Text style={styles.dateNameMain}>This week</Text>
              ) : (
                <Text style={styles.dateNameMain}>
                  Week of {selectedSunday.toDateString().slice(4, -5)}
                </Text>
              )}
            </>
            <TouchableOpacity
              style={styles.buttonMain}
              onPress={() => updateWeek(7)}
            >
              <Image
                style={styles.preButtonMain}
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          </View>
          {(trackingPreferences?.habitsSelected ||
            trackingPreferences?.toDosSelected) && (
            <View style={styles.entityView}>
              <View style={styles.entityHeader}>
                <View
                  style={[
                    {
                      backgroundColor: ValueSheet.colours.pink65,
                      borderColor: ValueSheet.colours.borderPink,
                    },
                    styles.entityImageCon,
                  ]}
                >
                  <Image
                    style={styles.entityImage}
                    source={require("../../assets/images/mind-blue.png")}
                  />
                </View>
                <Text style={styles.entityTitle}>Mind</Text>
              </View>
              {trackingPreferences?.habitsSelected && (
                <HabitStats
                  sunday={moment(selectedSunday).format("YYYYMMDD")}
                  updateStats={updateStats}
                />
              )}
              {trackingPreferences?.toDosSelected && (
                <TaskStats
                  sunday={moment(selectedSunday).format("YYYYMMDD")}
                  updateStats={updateStats}
                />
              )}
            </View>
          )}
          {(trackingPreferences?.dietSelected ||
            trackingPreferences?.fitnessSelected) && (
            <View style={styles.entityView}>
              <View style={styles.entityHeader}>
                <View
                  style={[
                    {
                      backgroundColor: ValueSheet.colours.purple65,
                      borderColor: ValueSheet.colours.purple,
                    },
                    styles.entityImageCon,
                  ]}
                >
                  <Image
                    style={styles.entityImage}
                    source={require("../../assets/images/body-blue.png")}
                  />
                </View>
                <Text style={styles.entityTitle}>Body</Text>
              </View>
              {trackingPreferences?.dietSelected && <DietStats />}
              {trackingPreferences?.fitnessSelected && <FitnessStats />}
            </View>
          )}

          {(trackingPreferences?.moodSelected ||
            trackingPreferences?.sleepSelected) && (
            <View style={styles.entityView}>
              <View style={styles.entityHeader}>
                <View
                  style={[
                    {
                      backgroundColor: ValueSheet.colours.yellow75,
                      borderColor: ValueSheet.colours.borderYellow,
                    },
                    styles.entityImageCon,
                  ]}
                >
                  <Image
                    style={styles.entityImage}
                    source={require("../../assets/images/soul-blue.png")}
                  />
                </View>
                <Text style={styles.entityTitle}>Spirit</Text>
              </View>
              {trackingPreferences?.moodSelected && (
                <MoodStats
                  sunday={moment(selectedSunday).format("YYYYMMDD")}
                  updateStats={updateStats}
                />
              )}
              {trackingPreferences?.sleepSelected && (
                <SleepStats
                  sunday={moment(selectedSunday).format("YYYYMMDD")}
                  updateStats={updateStats}
                />
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
    alignItems: "center",
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  statsImageCon: {
    height: 100,
    borderRadius: 20,
    backgroundColor: ValueSheet.colours.secondaryColour,
    borderColor: ValueSheet.colours.borderGrey,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  statsImage: {
    width: 100,
    height: 100,
  },
  entityImageCon: {
    width: 110,
    height: 140,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  entityImage: {
    width: 80,
    height: 80,
  },
  entityView: {
    marginBottom: 30,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  entityHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  entityTitle: {
    fontSize: 38,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingLeft: 22,
  },
  scrollModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  dateLineMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: ValueSheet.colours.borderGrey,
    borderRadius: 2,
  },
  buttonMain: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: ValueSheet.colours.secondaryColour,
    borderWidth: 1,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: ValueSheet.colours.grey,
    borderLeftColor: ValueSheet.colours.grey,
  },
  dateNameMain: {
    fontSize: 26,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  preButtonMain: {
    width: 30,
    height: 30,
  },
  nextButtonMain: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  upImage: {
    width: 60,
    height: 60,
  },
  upImageContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingTop: 5,
    marginBottom: 15,
  },
});

export default Stats;
