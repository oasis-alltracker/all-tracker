import React, { useState, useEffect, useRef } from "react";
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
import Spinner from "react-native-loading-spinner-overlay";
import SleepReportModal from "./modals/sleepReportModal";
import moment from "moment";

import WellnessReportModal from "./modals/wellnessReportModal";

const MoodSleep = ({ navigation }) => {
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

  const updateDate = async (dateChange) => {
    setIsLoading(true);
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
    await getSleepReports(moment(newDate).format("YYYYMMDD"));
    await getMoodReports(moment(newDate).format("YYYYMMDD"));
    setIsLoading(false);
  };

  const getMoodReports = async (dateStamp) => {
    try {
      token = await getAccessToken();
      reportsForDay = await WellnessReportsAPI.getWellnessReportsForToday(
        token,
        dateStamp
      );
      allReports = await WellnessReportsAPI.getWellnessReportsForMutlipleDays(
        token,
        "0",
        "3"
      );
      if (reportsForDay.length > 0) {
        setWellnessReportForDay(reportsForDay[reportsForDay.length - 1]);
      } else {
        setWellnessReportForDay(null);
      }
      setAllWellnessReports(allReports);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateMoodReport = async (moodReport) => {
    console.log(moodReport);
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

      await getMoodReports(moment(day).format("YYYYMMDD"));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const getSleepReports = async (dateStamp) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      reportsForDay = await SleepReportsAPI.getSleepReportsForToday(
        token,
        dateStamp
      );
      allReports = await SleepReportsAPI.getSleepReportsForMutlipleDays(
        token,
        "0",
        "3"
      );

      if (reportsForDay.length > 0) {
        setSleepReportForDay(reportsForDay[reportsForDay.length - 1]);
      } else {
        setSleepReportForDay(null);
      }

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

      await getSleepReports(moment(day).format("YYYYMMDD"));
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

      await getSleepReports(moment(day).format("YYYYMMDD"));
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
        await getMoodReports(moment(day).format("YYYYMMDD"));
      }
      if (trackingPreferencesLoaded.sleepSelected) {
        routesPreference.push({ key: "third", title: "Third" });
        await getSleepReports(moment(day).format("YYYYMMDD"));
      }
      routesPreference.push({ key: "fourth", title: "Fourth" });

      setRoutes(routesPreference);

      var numDots = [0, 1];
      for (var i = 2; i < routesPreference.length; i++) {
        numDots.push(i);
      }
      setDots(numDots);
    };

    if (!isPageLoaded) {
      setIsPageLoaded(true);
      getPreferencesOnLoad();
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
        return <Statistics />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
