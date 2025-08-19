import React, { useState, useEffect, useContext } from "react";
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
import DietGoalsAPI from "../../api/diet/dietGoalsAPI";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";

const Stats = ({ getRef }) => {
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const theme = useContext(ThemeContext).value;
  const [trackingPreferences, setTrackingPreferences] = useState(false);
  const [dietGoals, setDietGoals] = useState({
    calorieGoal: { units: "kcal", value: 2000 },
    carbGoal: 200,
    fatGoal: 67,
    proteinGoal: 150,
  });

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
      var dietGoals = await DietGoalsAPI.getDietGoals(token);

      if (dietGoals != null) {
        setDietGoals(dietGoals);
      }
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
      style={[styles.scrollModal, { height: height * 0.7 }]}
      presentationStyle="pageSheet"
      transparent={false}
    >
      <View style={[styles.container, sharedStyles["pageBackground_" + theme]]}>
        <TouchableOpacity
          style={styles.upImageContainer}
          onPress={() => {
            setVisible(false);
          }}
        >
          <Image
            style={[styles.upImage, sharedStyles["tint_" + theme]]}
            source={require("../..//assets/images/up-arrow.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statsImageCon,
            sharedStyles["button_" + theme],
            { width: width - 65 },
          ]}
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
          <View style={sharedStyles.datePickerView}>
            <TouchableOpacity
              style={[
                sharedStyles.changeDateButton,
                sharedStyles["changeDateButton_" + theme],
              ]}
              onPress={() => updateWeek(-7)}
            >
              <Image
                style={[sharedStyles.decreaseDateImage]}
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
            <>
              <View style={sharedStyles.dateTextContainer}>
                {moment(thisSunday).format("YYYYMMDD") ==
                moment(selectedSunday).format("YYYYMMDD") ? (
                  <Text
                    style={[
                      sharedStyles.dateText,
                      sharedStyles["textColour_" + theme],
                    ]}
                  >
                    This week
                  </Text>
                ) : (
                  <Text
                    style={[
                      sharedStyles.dateText,
                      sharedStyles["textColour_" + theme],
                    ]}
                  >
                    Week of {selectedSunday.toDateString().slice(4, -5)}
                  </Text>
                )}
              </View>
            </>
            <TouchableOpacity
              style={[
                sharedStyles.changeDateButton,
                sharedStyles["changeDateButton_" + theme],
              ]}
              onPress={() => updateWeek(7)}
            >
              <Image
                style={sharedStyles.increaseDateImage}
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
                    sharedStyles["pinkContainer_" + theme],
                    styles.entityImageCon,
                  ]}
                >
                  <Image
                    style={styles.entityImage}
                    source={require("../../assets/images/mind-blue.png")}
                  />
                </View>
                <Text
                  style={[
                    styles.entityTitle,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  Mind
                </Text>
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
                    sharedStyles["purpleContainer_" + theme],
                    styles.entityImageCon,
                  ]}
                >
                  <Image
                    style={styles.entityImage}
                    source={require("../../assets/images/body-blue.png")}
                  />
                </View>
                <Text
                  style={[
                    styles.entityTitle,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  Body
                </Text>
              </View>
              {trackingPreferences?.dietSelected && (
                <DietStats
                  sunday={moment(selectedSunday).format("YYYYMMDD")}
                  updateStats={updateStats}
                  dietGoals={dietGoals}
                />
              )}
              {trackingPreferences?.fitnessSelected && <FitnessStats />}
            </View>
          )}

          {(trackingPreferences?.moodSelected ||
            trackingPreferences?.sleepSelected) && (
            <View style={styles.entityView}>
              <View style={styles.entityHeader}>
                <View
                  style={[
                    sharedStyles["yellowContainer_" + theme],
                    styles.entityImageCon,
                  ]}
                >
                  <Image
                    style={styles.entityImage}
                    source={require("../../assets/images/soul-blue.png")}
                  />
                </View>
                <Text
                  style={[
                    styles.entityTitle,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  Spirit
                </Text>
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
    alignItems: "center",
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    width: "100%",
  },
  statsImageCon: {
    height: 100,
    borderRadius: 20,
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
    marginLeft: 30,
    marginRight: 10,
  },
  entityHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  entityTitle: {
    fontSize: 38,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingLeft: 22,
  },
  scrollModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  dateNameMain: {
    fontSize: 26,
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
