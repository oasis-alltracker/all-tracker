import { ValueSheet } from "../../ValueSheet";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
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
import Spinner from "react-native-loading-spinner-overlay";
import SleepReportModal from "./reviews/sleep/sleepReportModal";
import moment from "moment";
import Toast from "react-native-toast-message";
import WellnessReportModal from "./reviews/mood/wellnessReportModal";
import { ThemeContext } from "../../contexts/ThemeProvider";

const MoodSleep = ({ navigation }) => {
  const theme = useContext(ThemeContext).value;
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();

  const [day, setDay] = useState(new Date());
  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const [routes, setRoutes] = useState([{ key: "first", title: "First" }]);
  const [dots, setDots] = useState([]);

  const [allWellnessReports, setAllWellnessReports] = useState([]);
  const [wellnessReportForDay, setWellnessReportForDay] = useState(null);
  const [allSleepReports, setAllSleepReports] = useState([]);
  const [sleepReportForDay, setSleepReportForDay] = useState(null);

  const sleepRef = useRef(null);
  const moodRef = useRef(null);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [updateStats, setUpdateStats] = useState(0);

  function errorResponse(error) {
    console.log(error);
    setIsLoading(false);
    Toast.show({
      type: "info",
      text1: "Something went wrong",
      text2: "Please try again later.",
    });
  }

  const updateDate = async (dateChange) => {
    setIsLoading(true);
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
    try {
      await getSleepReports(moment(newDate).format("YYYYMMDD"));
      await getMoodReports(moment(newDate).format("YYYYMMDD"));
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const getMoodReports = async (dateStamp) => {
    try {
      token = await getAccessToken();
      const reportsForDayRequest =
        WellnessReportsAPI.getWellnessReportsForToday(token, dateStamp);
      const allReportsRequest =
        WellnessReportsAPI.getWellnessReportsForMutlipleDays(token, "0", "3");

      var reportsForDay;
      var allReports;

      await Promise.all([reportsForDayRequest, allReportsRequest]).then(
        (data) => {
          reportsForDay = data[0];
          allReports = data[1];
        }
      );

      if (reportsForDay.length > 0) {
        setWellnessReportForDay(reportsForDay[reportsForDay.length - 1]);
      } else {
        setWellnessReportForDay(null);
      }
      setAllWellnessReports(allReports);
    } catch (e) {
      errorResponse(e);
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

      await getMoodReports(moment(day).format("YYYYMMDD"));
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const deleteMoodReport = async (wellnessReportID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await WellnessReportsAPI.deleteWellnessReport(token, wellnessReportID);

      await getMoodReports(moment(day).format("YYYYMMDD"));
      setUpdateStats(updateStats + 1);
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const getSleepReports = async (dateStamp) => {
    try {
      token = await getAccessToken();
      const reportsForDayRequest =
        await SleepReportsAPI.getSleepReportsForToday(token, dateStamp);
      const allReportsRequest =
        await SleepReportsAPI.getSleepReportsForMutlipleDays(token, "0", "3");

      var reportsForDay;
      var allReports;

      await Promise.all([reportsForDayRequest, allReportsRequest]).then(
        (data) => {
          reportsForDay = data[0];
          allReports = data[1];
        }
      );

      if (reportsForDay.length > 0) {
        setSleepReportForDay(reportsForDay[reportsForDay.length - 1]);
      } else {
        setSleepReportForDay(null);
      }

      setAllSleepReports(allReports);
    } catch (e) {
      errorResponse(e);
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

      await getSleepReports(moment(day).format("YYYYMMDD"));
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const deleteSleepReport = async (sleepReportID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await SleepReportsAPI.deleteSleepReport(token, sleepReportID);

      await getSleepReports(moment(day).format("YYYYMMDD"));
      setUpdateStats(updateStats + 1);
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      setIsLoading(true);
      token = await getAccessToken();
      const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
        .trackingPreferences;

      await Promise.all(
        getMoodReports(moment(day).format("YYYYMMDD")),
        getSleepReports(moment(day).format("YYYYMMDD"))
      );
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
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    getPreferencesOnLoad();
  }, []);

  useEffect(() => {
    if (trackingPreferences) {
      if (
        trackingPreferences.moodSelected &&
        trackingPreferences.sleepSelected &&
        index == 3
      ) {
        setUpdateStats(updateStats + 1);
      } else if (
        (index == 2 && !trackingPreferences.moodSelected) ||
        (index == 2 && !trackingPreferences.sleepSelected)
      ) {
        setUpdateStats(updateStats + 1);
      }
    }
  }, [index]);

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
            wellnessReportForDay={wellnessReportForDay}
            sleepReportForDay={sleepReportForDay}
          />
        );
      case "third":
        return <Sleep sleepRef={sleepRef} allSleepReports={allSleepReports} />;
      case "second":
        return (
          <Mood moodRef={moodRef} allWellnessReports={allWellnessReports} />
        );
      case "fourth":
        return (
          <Statistics
            trackingPreferences={trackingPreferences}
            updateStats={updateStats}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <Spinner visible={isLoading}></Spinner>

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
                    backgroundColor: ValueSheet.colours[theme].primaryColour,
                    borderColor: ValueSheet.colours[theme].borderNavy,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <SleepReportModal
        getRef={(ref) => (sleepRef.current = ref)}
        updateSleepReport={updateSleepReport}
        deleteSleepReport={deleteSleepReport}
      />
      <WellnessReportModal
        getRef={(ref) => (moodRef.current = ref)}
        updateMoodReport={updateMoodReport}
        deleteMoodReport={deleteMoodReport}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 180,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  headerButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
  },
});

export default MoodSleep;
