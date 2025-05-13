import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import MenuIcon from "../../assets/icons/menu";
import Main from "./Main";
import Statistics from "./Statistics";
import Diet from "./Diet";
import Fitness from "./Fitness";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";
import { getAccessToken } from "../../user/keychain";
import UserAPI from "../../api/user/userAPI";
import DietButtonAPI from "../../api/diet/dietButtonAPI";
import { sharedStyles } from "../styles";
import Toast from "react-native-root-toast";

const FitnessDiet = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();

  const [day, setDay] = useState(new Date());
  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const [routes, setRoutes] = useState([{ key: "first", title: "First" }]);
  const [dots, setDots] = useState([]);

  const [buttonResponses, setButtonResponses] = useState([]);

  const updateDate = (dateChange) => {
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
  };

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      token = await getAccessToken();
      const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
        .trackingPreferences;
      setTrackingPreferences(trackingPreferencesLoaded);

      var routesPreference = routes;

      if (trackingPreferencesLoaded.dietSelected) {
        routesPreference.push({ key: "second", title: "Second" });
      }
      if (trackingPreferencesLoaded.fitnessSelected) {
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

  const createDietButtonResponse = async (input) => {
    try {
      var token = await getAccessToken();
      const response = await DietButtonAPI.createDietButtonResponse(token, input);

      await getDietButtonResponse();
    }
    catch (e){
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const getDietButtonResponse = async () => {
    try {
      token = await getAccessToken();
      const responses = DietButtonAPI.getDietButtonResponse(token);
      setButtonResponses(responses);

      Toast.show("Meal generated: \n" + JSON.stringify(buttonResponses), {
          ...styles.Toast,
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
    }
    catch (e) {
      console.log(e);
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
    }
  }
};

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <Main
            day={day}
            trackingPreferences={trackingPreferences}
            updateDate={updateDate}
            createDietButtonResponse={createDietButtonResponse}
          />
        );
      case "second":
        return <Diet />;
      case "third":
        return <Fitness />;
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

export default FitnessDiet;
