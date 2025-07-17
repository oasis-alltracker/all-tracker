import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { ValueSheet } from "../../../ValueSheet";

const data = [
  {
    text: "Yes",
  },
  {
    text: "No",
  },
];

const SetupFlow = (props) => {
  const { width, height } = useWindowDimensions();
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedTrackers } = props.route.params;

  const onNext = async () => {
    if (active == 0) {
      if (Platform.OS === "ios") {
        Toast.show("Please make a selection.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Please make a selection.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    } else {
      if (active == 1) {
        if (selectedTrackers.habitsSelected) {
          await navigationService.navigate("habitsCreation", {
            selectedTrackers,
          });
        } else if (selectedTrackers.toDosSelected) {
          await navigationService.navigate("todos", { selectedTrackers });
        } else if (selectedTrackers.dietSelected) {
          await navigationService.navigate("dietStep1", { selectedTrackers });
        } else if (selectedTrackers.fitnessSelected) {
          await navigationService.navigate("fitness", { selectedTrackers });
        } else if (selectedTrackers.moodSelected) {
          await navigationService.navigate("mood", { selectedTrackers });
        } else if (selectedTrackers.sleepSelected) {
          await navigationService.navigate("sleep", { selectedTrackers });
        }
      } else {
        setIsLoading(true);
        if (!selectedTrackers.toDosSelected) {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "task"
          );
        }
        if (!selectedTrackers.habitsSelected) {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "habit"
          );
        }
        if (!selectedTrackers.moodSelected) {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "mood"
          );
        }
        if (!selectedTrackers.sleepSelected) {
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "morning"
          );
          await NotificationsHandler.turnOffGroupPreferenceNotifications(
            token,
            "sleep"
          );
        }
        setIsLoading(false);
        navigationService.reset("main", 0);
      }
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Header />
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>
          Would you like go through the setup process?
        </Text>

        {data.map((val, key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.buttonCon,
              { width: width * 0.9 },
              active === key + 1 && {
                backgroundColor: ValueSheet.colours.secondaryColour,
              },
            ]}
            onPress={() => {
              setActive(key + 1);
            }}
          >
            <Text style={styles.yesNoText}>{val.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button onPress={() => onNext()} style={styles.button}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
    paddingBottom: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  buttonCon: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: 110,
    marginBottom: 15,
    borderColor: ValueSheet.colours.grey,
  },
  title: {
    fontSize: 20,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 60,
    textAlign: "center",
  },
  yesNoText: {
    fontSize: 25,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
  middleContainer: {
    flex: 1,
    textAlignVertical: "center",
    alignItems: "center",
  },
});

export default SetupFlow;
