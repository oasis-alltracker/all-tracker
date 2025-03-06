import React, { useRef, useState, useEffect, Platform } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { TouchableOpacity } from "react-native-gesture-handler";
import CreateHabitModal from "../../Todos-Habits/modals/CreateHabitModal";
import UpdateHabitModal from "../../Todos-Habits/modals/UpdateHabitModal";
import HabitsAPI from "../../../api/habits/habitsAPI";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";

const HabitsCreation = (props) => {
  const { width, height } = useWindowDimensions();

  const { selectedTrackers } = props.route.params;
  const [habits, setHabits] = useState([]);
  const [habitsIsLoaded, setHabitsIsLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const modalRef = useRef(null);

  const onNext = async () => {
    try {
      if (selectedTrackers.toDosSelected) {
        navigationService.navigate("todos", { selectedTrackers });
      } else if (selectedTrackers.dietSelected) {
        navigationService.navigate("dietStep1", { selectedTrackers });
      } else if (selectedTrackers.fitnessSelected) {
        navigationService.navigate("fitness", { selectedTrackers });
      } else if (selectedTrackers.moodSelected) {
        navigationService.navigate("mood", { selectedTrackers });
      } else if (selectedTrackers.sleepSelected) {
        navigationService.navigate("sleep", { selectedTrackers });
      } else {
        setIsLoading(true);
        const accessToken = await getAccessToken();

        const { status: status, data: userData } = await UserAPI.getUser(
          accessToken
        );

        if (userData && !userData["isSetupComplete"]) {
          const { status, data } = await UserAPI.updateUser(
            true,
            selectedTrackers,
            accessToken
          );
          navigationService.reset("main", 0);
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
        setIsLoading(false);
      }
    } catch (e) {
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

  const createHabit = async (habit, notificationTimes, isNotificationsOn) => {
    setIsLoading(true);
    try {
      var token = await getAccessToken();
      const habitID = await HabitsAPI.createHabit(
        token,
        habit,
        isNotificationsOn
      );

      if (isNotificationsOn) {
        var triggers = [];
        for (var notificationTime of notificationTimes) {
          triggers.push({
            hour: notificationTime[0],
            minute: notificationTime[1],
            repeats: true,
          });
        }
        console.log(triggers);
        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `habit-${habitID}`,
          habit.name,
          "Don't forget to update your habit progress",
          triggers,
          true
        );
      }

      await getHabits();
    } catch (e) {
      connsole.log(e);
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

  const deleteHabit = async (habitID) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      await HabitsAPI.deleteHabit(token, habitID);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `task-${habitID}`
      );

      await NotificationsHandler.turnOffNotification(
        token,
        `task-${habitID}`,
        prevNotification
      );

      var prevExpoIDs = prevNotification[0]?.expoIDs;
      await NotificationsHandler.deleteNotification(
        token,
        `task-${habitID}`,
        prevExpoIDs
      );

      await getHabits();
    } catch (e) {
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

  const updateHabit = async (
    habitID,
    habit,
    notificationTimes,
    isNotificationsOn
  ) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await HabitsAPI.updateHabit(token, habitID, habit);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `habit-${habitID}`
      );
      var prevExpoIDs = prevNotification[0]?.expoIDs;

      if (isNotificationsOn) {
        var triggers = [];
        for (var notificationTime of notificationTimes) {
          triggers.push({
            hour: notificationTime[0],
            minute: notificationTime[1],
            repeats: true,
          });
        }

        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `habit-${habitID}`,
          habit.name,
          "Don't forget to update your habit progress",
          triggers,
          true,
          prevExpoIDs
        );
      } else {
        await NotificationsHandler.turnOffNotification(
          token,
          `habit-${habitID}`,
          prevExpoIDs
        );
      }
      await getHabits();
    } catch (e) {
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

  const getHabits = async () => {
    try {
      token = await getAccessToken();
      var userHabits = await HabitsAPI.getHabits(token);
      setHabits(userHabits);
      setIsLoading(false);
    } catch (e) {
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

  const closeModalHandler = () => {
    setTimeout(() => setIsLoading(false), 500);
  };

  useEffect(() => {
    const getHabitsOnLoad = async () => {
      setHabitsIsLoaded(true);
      await getHabits();
    };
    if (!habitsIsLoaded) {
      setTimeout(() => {
        getHabitsOnLoad();
      }, 400);
    }
  }, []);

  const MyHabits = () => (
    <>
      <View style={[styles.line, { paddingTop: 15, marginBottom: 15 }]}>
        <Text style={styles.habitsTitle}>My habits</Text>
        <TouchableOpacity
          onPress={() => {
            modalRef.create.open();
          }}
        >
          <Image
            style={styles.plus}
            source={require("../../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: height * 0.365 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            { width: width - 30 },
          ]}
          removeClippedSubviews={false}
        >
          {habits.map((val, key) => {
            return (
              <TouchableOpacity
                key={key.toString()}
                onPress={() => {
                  setIsLoading(true);
                  modalRef.update.open(true, {
                    isPositive: val.isPositive,
                    habitName: val.name,
                    pngURL: val.pngURL,
                    threshold: val.threshold,
                    time: val.time,
                    habitID: val.SK,
                  });
                }}
                style={[
                  styles.item,
                  key === habits.length - 1 && { borderBottomWidth: 2 },
                ]}
              >
                <Text style={styles.itemText}>{val.name}</Text>
                <Text>
                  <View
                    style={styles.habitImageContainer}
                    onPress={() => searchImage()}
                  >
                    <Image
                      style={styles.habitImage}
                      source={{ uri: val.pngURL }}
                    />
                  </View>
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );

  const CreatHabits = () => (
    <>
      <Text style={styles.title}>
        Get started by creating habits you'd like to adopt
      </Text>
      <TouchableOpacity
        onPress={() => {
          setIsLoading(true);
          modalRef.create.open();
        }}
        style={[styles.addButton, { width: width - 30, height: height * 0.34 }]}
      >
        <Text style={styles.buttonText}>
          You can do this later if you'd like
        </Text>
        <View style={styles.plusCon}>
          <Image
            style={styles.plusImage}
            source={require("../../../assets/images/plus.png")}
          />
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.center}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/habits512.png")}
          />
          <Text style={styles.imageText}>habits</Text>
        </View>
        {habits.length > 0 ? <MyHabits /> : <CreatHabits />}
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
      <CreateHabitModal
        getRef={(ref) => (modalRef.create = ref)}
        createHabit={createHabit}
        closeModalHandler={closeModalHandler}
      />
      <UpdateHabitModal
        getRef={(ref) => (modalRef.update = ref)}
        closeModalHandler={closeModalHandler}
        updateHabit={updateHabit}
        deleteHabit={deleteHabit}
      />
    </SafeAreaView>
  );
};
export default HabitsCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(255, 207, 245, 0.70)",
    justifyContent: "center",
    alignItems: "center",
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
    padding: 10,
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  center: {
    alignItems: "center",
  },
  plusImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  plusCon: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(215, 246, 255, 0.35)",
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: "rgba(204, 204, 204, 0.728)",

    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 80,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  habitsTitle: {
    fontSize: 31,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  plus: {
    width: 40,
    height: 40,
  },
  itemText: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",
    marginLeft: 20,
    flex: 1,
  },
  itemText2: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  habitImage: {
    width: 30,
    height: 30,
  },
  habitImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "rgba(37, 67, 107, 0.6)",
    fontFamily: "Sego",
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
});
