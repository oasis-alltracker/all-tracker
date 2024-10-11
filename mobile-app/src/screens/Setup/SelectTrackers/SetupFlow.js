import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
const { width, height } = Dimensions.get("window");

const data = [
  {
    text: "Yes",
  },
  {
    text: "No",
  },
];

const SetupFlow = (props) => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedTrackers } = props.route.params;

  const onNext = async () => {
    if (active == 0) {
      Toast.show("Please make a selection.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
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
          Would you like go though the setup process?
        </Text>

        {data.map((val, key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.buttonCon,
              active === key + 1 && { backgroundColor: "#D7F6FF" },
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
    backgroundColor: "#fff",
    paddingBottom: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCon: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
    height: 110,
    marginBottom: 15,
    borderColor: "#CCCCCC",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 60,
    textAlign: "center",
  },
  yesNoText: {
    fontSize: 25,
    color: "#25436B",
    fontFamily: "Sego",
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
    borderColor: "#CCCCCC",
  },
  bigButtons: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
    height: 60,
    borderRadius: 20,
    marginTop: 0,
  },
  center: {
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
  },
  errorToast: {
    textColor: "#25436B",
  },
  middleContainer: {
    flex: 1,
    textAlignVertical: "center",
    alignItems: "center",
  },
});

export default SetupFlow;
