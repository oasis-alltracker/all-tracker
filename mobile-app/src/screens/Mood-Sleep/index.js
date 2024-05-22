import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import MenuIcon from "../../assets/icons/menu";
import Main from "./Main";
import Statistics from "./Statistics";
import Sleep from "./Sleep";
import Mood from "./Mood";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAccessToken } from "../../user/keychain";
import UserAPI from "../../api/user/userAPI";
import WellnessReportsAPI from "../../api/mood/wellnessReportsAPI";
import SleepReportsAPI from "../../api/sleep/sleepReportsAPI";
import { TabView } from "react-native-tab-view";
import { sharedStyles } from "../styles";
import SleepReportModal from "./modals/sleepReportModal";
import WellnessReportModal from "./modals/wellnessReportModal";

const MoodSleep = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();

  const [day, setDay] = useState(new Date());
  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const [routes, setRoutes] = useState([{ key: "first", title: "First" }]);
  const [dots, setDots] = useState([]);

  const [allWellnessReports, setAllWellnessReports] = useState([]);
  const [wellnessReportsForDay, setWellnessReportsForDay] = useState([]);
  const [allSleepReports, setAllSleepReports] = useState([]);
  const [sleepReportsForDay, setSleepReportsForDay] = useState([]);

  const sleepRef = useRef(null);
  const moodRef = useRef(null);

  const updateDate = (dateChange) => {
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
  };
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const createMoodReport = async (moodReport) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await WellnessReportsAPI.createWellnessReport(token, moodReport);

      await getMoodReports(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const getMoodReports = async () => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      reportsForDay = await WellnessReportsAPI.getWellnessReportsForToday(
        token,
        day
      );
      allReports = await WellnessReportsAPI.getWellnessReportsForMutlipleDays(
        token,
        "0",
        day
      );

      setWellnessReportsForDay(reportsForDay);
      setAllWellnessReports(allReports);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateMoodReport = async (moodReport) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await WellnessReportsAPI.updateWellnessReport(
        token,
        moodReport.SK,
        moodReport
      );

      await getMoodReports(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const deleteMoodReport = async (wellnessReportID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await WellnessReportsAPI.deleteWellnessReport(token, wellnessReportID);

      await getMoodReports();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const createSleepReport = async (sleepReport) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await SleepReportsAPI.createSleepReport(token, sleepReport);

      await getSleepReports(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const getSleepReports = async () => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      reportsForDay = await SleepReportsAPI.getSleepReportsForToday(token, day);
      allReports = await SleepReportsAPI.getSleepReportsForMutlipleDays(
        token,
        "0",
        day
      );

      setSleepReportsForDay(reportsForDay);
      setAllSleepReports(allReports);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateSleepReport = async (sleepReport) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await SleepReportsAPI.updateSleepReport(
        token,
        sleepReport.SK,
        sleepReport
      );

      await getSleepReports(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const deleteSleepReport = async (sleepReportID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await SleepReportsAPI.deleteSleepReport(token, sleepReportID);

      await getSleepReports();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      token = await getAccessToken();
      const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
        .trackingPreferences;
      setTrackingPreferences(trackingPreferencesLoaded);

      var routesPreference = routes;

      if (trackingPreferencesLoaded.moodSelected) {
        routesPreference.push({ key: "second", title: "Second" });
      }
      if (trackingPreferencesLoaded.sleepSelected) {
        routesPreference.push({ key: "third", title: "Third" });
      }
      routesPreference.push({ key: "fourth", title: "Fourth" });

      setRoutes(routesPreference);

      var numDots = [0, 1];
      for (var i = 2; i < routesPreference.length; i++) {
        numDots.push(i);
      }
      setDots(numDots);
    };

    const getDataOnLoad = async () => {
      token = await getAccessToken();
    };

    if (!isPageLoaded) {
      setIsPageLoaded(true);
      getPreferencesOnLoad();
      getDataOnLoad();
    }
  }, []);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <Main
            day={day}
            trackingPreferences={trackingPreferences}
            updateDate={updateDate}
            moodRef={moodRef}
            sleepRef={sleepRef}
            createMoodReport={createMoodReport}
            createSleepReport={createSleepReport}
            wellnessReportsForDay={wellnessReportsForDay}
            sleepReportsForDay={sleepReportsForDay}
          />
        );
      case "second":
        return (
          <Sleep
            sleepRef={sleepRef}
            createSleepReport={createSleepReport}
            allSleepReports={allSleepReports}
          />
        );
      case "third":
        return (
          <Mood
            moodRef={moodRef}
            createMoodReport={createMoodReport}
            allWellnessReports={allWellnessReports}
          />
        );
      case "fourth":
        return <Statistics />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.openDrawer()}
        >
          <MenuIcon />
        </TouchableOpacity>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width }}
          renderTabBar={() => null}
          lazy
        />
        <View style={sharedStyles.pagination}>
          {dots.map((val, key) => {
            return (
              <View
                key={key.toString()}
                style={[
                  sharedStyles.dot,
                  key === index && {
                    backgroundColor: "#25436B",
                    borderColor: "#1E3556",
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <SleepReportModal
        getRef={(ref) => (taskRef.current = ref)}
        updateSleepReport={updateSleepReport}
        deleteSleepReport={deleteSleepReport}
      />
      <WellnessReportModal
        getRef={(ref) => (taskRef.current = ref)}
        updateMoodReport={updateMoodReport}
        deleteMoodReport={deleteMoodReport}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  button: {
    height: 180,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
  pagerView: {
    flex: 1,
    overflow: "visible",
  },
  headerButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
  },
});

export default MoodSleep;
