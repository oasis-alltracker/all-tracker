import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

const SelectTrackers = () => {
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
        if (habitsSelected) {
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
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    } else {
      setIsLoading(false);
      Toast.show("You must select at least one tracker to continue.", {
        ...styles.errorToast,
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
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
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrackingPreferences();
  }, []);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <Header />
      <Text style={styles.subtitle}>
        What would you like to track inside your journal?
      </Text>
      <View style={styles.middleContainer}>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.button,
              !habitsSelected && { opacity: 0.7 },
              habitsSelected && { borderWidth: 2 },
              habitsSelected && { borderColor: "#25436B" },
            ]}
            onPress={() => setHabitsSelected(!habitsSelected)}
          >
            <Image
              style={styles.image}
              source={require("../../../assets/images/habits512.png")}
            />
            <Text style={styles.title}>habits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              !toDosSelected && { opacity: 0.7 },
              toDosSelected && { borderWidth: 2 },
              toDosSelected && { borderColor: "#25436B" },
            ]}
            onPress={() => setToDosSelected(!toDosSelected)}
          >
            <Image
              style={styles.image}
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
              },
              !moodSelected && { opacity: 0.7 },
              moodSelected && { borderWidth: 2 },
              moodSelected && { borderColor: "#25436B" },
            ]}
            onPress={() => setMoodSelected(!moodSelected)}
          >
            <Image
              style={styles.image}
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
              },
              !sleepSelected && { opacity: 0.7 },
              sleepSelected && { borderWidth: 2 },
              sleepSelected && { borderColor: "#25436B" },
            ]}
            onPress={() => setSleepSelected(!sleepSelected)}
          >
            <Image
              style={styles.image}
              source={require("../../../assets/images/sleep512.png")}
            />
            <Text style={styles.title}>sleep</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={() => setSelectedTrackers()} style={styles.nextButton}>
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
  image: {
    width: 65,
    height: 65,
  },
  button: {
    width: 145,
    height: 145,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
  },
  title: {
    color: "#25436B",
    fontSize: 22,
    marginTop: 7,
    fontFamily: "Sego",
  },
  subtitle: {
    color: "#25436B",
    fontSize: 20,
    fontFamily: "Sego-Bold",
    textAlign: "center",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  nextButton: {
    marginHorizontal: 30,
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
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});
