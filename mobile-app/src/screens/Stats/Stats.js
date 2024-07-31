import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
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

const { width, height } = Dimensions.get("window");

const Stats = ({ getRef }) => {
  const [visible, setVisible] = useState(false);
  const [trackingPreferences, setTrackingPreferences] = useState(false);

  var thisSunday = new Date();
  thisSunday.setDate(thisSunday.getDate() - ((thisSunday.getDay() + 7) % 7));

  const [selectedSunday, setSelectedSunday] = useState(thisSunday);
  const updateWeek = (dateChange) => {
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
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.scrollModal}
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

        <View style={styles.statsImageCon}>
          <Image
            style={styles.statsImage}
            source={require("../../assets/images/stats.png")}
          />
        </View>

        <ScrollView style={styles.tcContainer}>
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
                  Week of {selectedSunday.toDateString().slice(4, -4)}
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
                      backgroundColor: "rgba(255, 207, 245, 0.65)",
                      borderColor: "rgba(255, 207, 245, 0.70)",
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
                />
              )}
              {trackingPreferences?.toDosSelected && (
                <TaskStats sunday={moment(selectedSunday).format("YYYYMMDD")} />
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
                      backgroundColor: "rgba(202, 189, 255, 0.65)",
                      borderColor: "rgba(202, 189, 255, 0.7)",
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
                      backgroundColor: "#FFEFBD",
                      borderColor: "#ffe8a1",
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
                <MoodStats sunday={moment(selectedSunday).format("YYYYMMDD")} />
              )}
              {trackingPreferences?.sleepSelected && (
                <SleepStats
                  sunday={moment(selectedSunday).format("YYYYMMDD")}
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: "Sego",
    color: "#25436B",
    marginTop: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginTop: 30,
  },
  header: {
    alignSelf: "stretch",
    fontSize: 12,
    fontFamily: "Sego-Bold",
    color: "#25436B",
    marginTop: 50,
    textDecorationLine: "underline",
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * 0.7,
  },
  statsImageCon: {
    width: width - 65,
    height: 100,
    borderRadius: 20,
    backgroundColor: "#D7F6FF",
    borderColor: "rgba(183,207,214,255)",
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
    color: "#25436B",
    fontFamily: "Sego",
    paddingLeft: 22,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  preButton: {
    width: 30,
    height: 30,
  },
  nextButton: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  dateLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    // borderWidth: 1,
    // borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  scrollModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.7,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // backgroundColor: "#D7F6FF",
    // borderWidth: 1,
    // borderColor: "#CCCCCC",
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego",
  },
  chartBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    paddingRight: 35,
  },
  chartCircle: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    marginRight: 40,
  },
  imageCircle: {
    width: 28,
    height: 28,
  },
  text: {
    fontSize: 13,
    fontFamily: "Sego",
    color: "#25436B",
  },
  xLabel: {
    fontSize: 12,
    fontFamily: "Sego",
  },
  chartContainer: {
    alignItems: "center",
  },
  dateLineMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  buttonMain: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderRightColor: "#ccc",
    borderLeftColor: "#ccc",
  },
  dateNameMain: {
    fontSize: 26,
    color: "#25436B",
    fontFamily: "Sego-Bold",
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
