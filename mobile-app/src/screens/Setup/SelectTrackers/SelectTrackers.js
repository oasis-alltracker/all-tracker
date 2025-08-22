import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { Header, Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";
import Toast from "react-native-toast-message";
import { DISPLAY_PHYSICAL_SETUP_BUTTONS } from "./experimentFlags";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const SelectTrackers = () => {
  const theme = useContext(ThemeContext).value;
  const { width, height } = useWindowDimensions();

  const [habitsSelected, setHabitsSelected] = useState(false);
  const [toDosSelected, setToDosSelected] = useState(false);
  const [dietSelected, setDietSelected] = useState(false);
  const [fitnessSelected, setFitnessSelected] = useState(false);
  const [moodSelected, setMoodSelected] = useState(false);
  const [sleepSelected, setSleepSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const buttonSize = DISPLAY_PHYSICAL_SETUP_BUTTONS
    ? height * 0.15
    : height * 0.2;
  const buttonImageSize = DISPLAY_PHYSICAL_SETUP_BUTTONS
    ? height * 0.06
    : height * 0.08;

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
            "goalSelection",
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
        Toast.show({
          type: "info",
          text1: "Something went wrong",
          text2: "Please try again.",
        });
      }
    } else {
      setIsLoading(false);
      Toast.show({
        type: "info",
        text1: "No trackers selected",
        text2: "You must select at least one tracker to continue.",
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
        Toast.show({
          type: "info",
          text1: "Something went wrong",
          text2: "Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrackingPreferences();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <Header showCenter={false} />
      <Text style={[styles.subtitle, sharedStyles["textColour_" + theme]]}>
        Which areas of your daily life would you like to log?
      </Text>

      <View style={styles.middleContainer}>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.button,
              sharedStyles["pinkContainer_" + theme],
              !habitsSelected && { opacity: 0.5 },
              habitsSelected && { borderWidth: 1.5 },
              habitsSelected && {
                borderColor: ValueSheet.colours[theme].primaryColour,
              },
              { width: buttonSize, height: buttonSize },
            ]}
            onPress={() => setHabitsSelected(!habitsSelected)}
          >
            <Image
              style={{
                width: buttonImageSize,
                height: buttonImageSize,
              }}
              source={require("../../../assets/images/habits512.png")}
            />
            <Text style={[styles.title, sharedStyles["textColour_light"]]}>
              habits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              sharedStyles["pinkContainer_" + theme],
              !toDosSelected && { opacity: 0.5 },
              toDosSelected && { borderWidth: 1.5 },
              toDosSelected && {
                borderColor: ValueSheet.colours[theme].primaryColour,
              },
              { width: buttonSize, height: buttonSize },
            ]}
            onPress={() => setToDosSelected(!toDosSelected)}
          >
            <Image
              style={{
                width: buttonImageSize,
                height: buttonImageSize,
              }}
              source={require("../../../assets/images/to-dos512.png")}
            />
            <Text style={[styles.title, sharedStyles["textColour_light"]]}>
              to-dos
            </Text>
          </TouchableOpacity>
        </View>
        {DISPLAY_PHYSICAL_SETUP_BUTTONS && (
          <View style={styles.center}>
            <TouchableOpacity
              style={[
                styles.button,
                sharedStyles["purpleContainer_" + theme],
                {
                  width: buttonSize,
                  height: buttonSize,
                },
                !dietSelected && { opacity: 0.5 },
                dietSelected && { borderWidth: 1.5 },
                dietSelected && {
                  borderColor: ValueSheet.colours[theme].primaryColour,
                },
              ]}
              onPress={() => setDietSelected(!dietSelected)}
            >
              <Image
                style={{
                  width: buttonImageSize,
                  height: buttonImageSize,
                }}
                source={require("../../../assets/images/diet512.png")}
              />
              <Text style={[styles.title, sharedStyles["textColour_light"]]}>
                diet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                sharedStyles["purpleContainer_" + theme],
                {
                  width: buttonSize,
                  height: buttonSize,
                },
                !fitnessSelected && { opacity: 0.5 },
                fitnessSelected && { borderWidth: 1.5 },
                fitnessSelected && {
                  borderColor: ValueSheet.colours[theme].primaryColour,
                },
              ]}
              onPress={() => setFitnessSelected(!fitnessSelected)}
            >
              <Image
                style={{
                  width: buttonImageSize,
                  height: buttonImageSize,
                }}
                source={require("../../../assets/images/fitness512.png")}
              />
              <Text style={[styles.title, sharedStyles["textColour_light"]]}>
                fitness
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.button,
              sharedStyles["yellowContainer_" + theme],
              {
                width: buttonSize,
                height: buttonSize,
              },
              !moodSelected && { opacity: 0.5 },
              moodSelected && { borderWidth: 1.5 },
              moodSelected && {
                borderColor: ValueSheet.colours[theme].primaryColour,
              },
            ]}
            onPress={() => setMoodSelected(!moodSelected)}
          >
            <Image
              style={{
                width: buttonImageSize,
                height: buttonImageSize,
              }}
              source={require("../../../assets/images/mood512.png")}
            />
            <Text style={[styles.title, sharedStyles["textColour_light"]]}>
              mood
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              sharedStyles["yellowContainer_" + theme],
              {
                width: buttonSize,
                height: buttonSize,
              },
              !sleepSelected && { opacity: 0.5 },
              sleepSelected && { borderWidth: 1.5 },
              sleepSelected && {
                borderColor: ValueSheet.colours[theme].primaryColour,
              },
            ]}
            onPress={() => setSleepSelected(!sleepSelected)}
          >
            <Image
              style={{
                width: buttonImageSize,
                height: buttonImageSize,
              }}
              source={require("../../../assets/images/sleep512.png")}
            />
            <Text style={[styles.title, sharedStyles["textColour_light"]]}>
              sleep
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        onPress={() => setSelectedTrackers()}
        style={{ marginHorizontal: width * 0.05 }}
        isLoading={isLoading}
        positiveSelect={true}
      >
        Continue
      </Button>
      <Toast position="bottom" bottomOffset={125} visibilityTime={2500} />
    </SafeAreaView>
  );
};

export default SelectTrackers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    borderRadius: 200,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginTop: 7,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  subtitle: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryBold,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
});
