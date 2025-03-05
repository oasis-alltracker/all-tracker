import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";
import Toast from "react-native-root-toast";

const SelectTrackers = () => {
  const { width, height } = useWindowDimensions();

  const [habitsSelected, setHabitsSelected] = useState(false);
  const [toDosSelected, setToDosSelected] = useState(false);
  const [dietSelected, setDietSelected] = useState(false);
  const [fitnessSelected, setFitnessSelected] = useState(false);
  const [moodSelected, setMoodSelected] = useState(false);
  const [sleepSelected, setSleepSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const setSelectedTrackers = async () => {
    setIsLoading(true);
    var selectedTrackers = {
      habitsSelected: habitsSelected,
      toDosSelected: toDosSelected,
      dietSelected: dietSelected,
      fitnessSelected: fitnessSelected,
      moodSelected: moodSelected,
      sleepSelected: sleepSelected,
    };

    if (
      habitsSelected ||
      toDosSelected ||
      dietSelected ||
      fitnessSelected ||
      moodSelected ||
      sleepSelected
    ) {
      const accessToken = await getAccessToken();

      const { status, data } = await UserAPI.updateUser(
        isSetupComplete,
        selectedTrackers,
        accessToken
      );
      if (status == 200) {
        setIsLoading(false);
        if (isSetupComplete) {
          await navigationService.navigate(
            "setupFlow",
            (selectedTrackers = { selectedTrackers })
          );
        } else if (habitsSelected) {
          await navigationService.navigate(
            "habitsCreation",
            (selectedTrackers = { selectedTrackers })
          );
        } else if (toDosSelected) {
          await navigationService.navigate(
            "todos",
            (selectedTrackers = { selectedTrackers })
          );
        } else if (dietSelected) {
          await navigationService.navigate(
            "dietStep1",
            (selectedTrackers = { selectedTrackers })
          );
        } else if (fitnessSelected) {
          await navigationService.navigate(
            "fitness",
            (selectedTrackers = { selectedTrackers })
          );
        } else if (moodSelected) {
          await navigationService.navigate(
            "mood",
            (selectedTrackers = { selectedTrackers })
          );
        } else if (sleepSelected) {
          await navigationService.navigate(
            "sleep",
            (selectedTrackers = { selectedTrackers })
          );
        }
      } else {
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
    } else {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("You must select at least one tracker to continue.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("You must select at least one tracker to continue.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };
  useEffect(() => {
    const fetchTrackingPreferences = async () => {
      setIsLoading(true);
      try {
        const token = await getAccessToken();
        const user = (await UserAPI.getUser(token)).data;
        const trackingPreferencesLoaded = user.trackingPreferences;

        setIsSetupComplete(user.isSetupComplete);
        if (trackingPreferencesLoaded?.habitsSelected) setHabitsSelected(true);
        if (trackingPreferencesLoaded?.toDosSelected) setToDosSelected(true);
        if (trackingPreferencesLoaded?.dietSelected) setDietSelected(true);
        if (trackingPreferencesLoaded?.fitnessSelected)
          setFitnessSelected(true);
        if (trackingPreferencesLoaded?.moodSelected) setMoodSelected(true);
        if (trackingPreferencesLoaded?.sleepSelected) setSleepSelected(true);
      } catch (e) {
        console.log(e);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrackingPreferences();
  }, []);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Header />
      <Text style={[styles.subtitle, { marginTop: height * 0.05 }]}>
        Which areas of your daily life would you like to reflect on?
      </Text>
      <View style={styles.middleContainer}>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.button,
              !habitsSelected && { opacity: 0.5 },
              habitsSelected && { borderWidth: 1.5 },
              habitsSelected && { borderColor: "#25436B" },
              { width: height * 0.2, height: height * 0.2 },
            ]}
            onPress={() => setHabitsSelected(!habitsSelected)}
          >
            <Image
              style={{
                width: height * 0.08,
                height: height * 0.08,
              }}
              source={require("../../../assets/images/habits512.png")}
            />
            <Text style={styles.title}>habits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              !toDosSelected && { opacity: 0.5 },
              toDosSelected && { borderWidth: 1.5 },
              toDosSelected && { borderColor: "#25436B" },
              { width: height * 0.2, height: height * 0.2 },
            ]}
            onPress={() => setToDosSelected(!toDosSelected)}
          >
            <Image
              style={{
                width: height * 0.08,
                height: height * 0.08,
              }}
              source={require("../../../assets/images/to-dos512.png")}
            />
            <Text style={styles.title}>to-dos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "rgba(255, 239, 189, 1)",
                borderColor: "rgba(204, 191, 152, 1)",
                width: height * 0.2,
                height: height * 0.2,
              },
              !moodSelected && { opacity: 0.5 },
              moodSelected && { borderWidth: 1.5 },
              moodSelected && { borderColor: "#25436B" },
            ]}
            onPress={() => setMoodSelected(!moodSelected)}
          >
            <Image
              style={{
                width: height * 0.08,
                height: height * 0.08,
              }}
              source={require("../../../assets/images/mood512.png")}
            />
            <Text style={styles.title}>mood</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "rgba(255, 239, 189, 1)",
                borderColor: "rgba(204, 191, 152, 1)",
                width: height * 0.2,
                height: height * 0.2,
              },
              !sleepSelected && { opacity: 0.5 },
              sleepSelected && { borderWidth: 1.5 },
              sleepSelected && { borderColor: "#25436B" },
            ]}
            onPress={() => setSleepSelected(!sleepSelected)}
          >
            <Image
              style={{
                width: height * 0.08,
                height: height * 0.08,
              }}
              source={require("../../../assets/images/sleep512.png")}
            />
            <Text style={styles.title}>sleep</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        onPress={() => setSelectedTrackers()}
        style={{ marginHorizontal: width * 0.05 }}
        isLoading={isLoading}
      >
        Continue
      </Button>
    </SafeAreaView>
  );
};

export default SelectTrackers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderColor: "rgba(255, 207, 245, 0.70)",
  },
  title: {
    color: "#25436B",
    fontSize: 24,
    marginTop: 7,
    fontFamily: "Sego",
  },
  subtitle: {
    color: "#25436B",
    fontSize: 22,
    fontFamily: "Sego-Bold",
    textAlign: "center",
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#25436B",
    fontSize: 25,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});
