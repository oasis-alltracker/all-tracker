import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
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

const { width, height } = Dimensions.get("window");

const HabitsCreation = (props) => {
  const { selectedTrackers } = props.route.params;
  const [habits, setHabits] = useState([]);
  const [habitsIsLoaded, setHabitsIsLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef(null);

  const onNext = async () => {
    navigationService.navigate("habitsNotifications", { selectedTrackers });
  };

  const createHabit = async (habit) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      await HabitsAPI.createHabit(token, habit);
      await getHabits();
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };
  const deleteHabit = async (habitID) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      await HabitsAPI.deleteHabit(token, habitID);
      await getHabits();
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };
  const updateHabit = async (habitID, habit) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await HabitsAPI.updateHabit(token, habitID, habit);
      await getHabits();
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const getHabits = async () => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      userHabits = await HabitsAPI.getHabits(token);
      setHabits(userHabits);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const getHabitsOnLoad = async () => {
      if (!habitsIsLoaded) {
        setHabitsIsLoaded(true);
        await getHabits();
      }
    };
    getHabitsOnLoad();
  }, []);

  const MyHabits = () => (
    <>
      <View style={[styles.line, { paddingTop: 15, marginBottom: 15 }]}>
        <Text style={styles.habitsTitle}>My habits</Text>
        <TouchableOpacity
          onPress={() => {
            modalRef.secondary.open();
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
          contentContainerStyle={styles.scrollContainer}
          removeClippedSubviews={false}
        >
          {habits.map((val, key) => {
            return (
              <TouchableOpacity
                key={key.toString()}
                onPress={() => {
                  modalRef.current.open(true, {
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
                <Text
                  style={[
                    styles.itemText2,
                    val.isPositive && { color: "#7FE5FF" },
                  ]}
                >
                  {val.isPositive ? "Good" : "Bad"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <CreateHabitModal
          getRef={(ref) => (modalRef.secondary = ref)}
          createHabit={createHabit}
        />
        <UpdateHabitModal
          getRef={(ref) => (modalRef.current = ref)}
          updateHabit={updateHabit}
          deleteHabit={deleteHabit}
        />
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
          modalRef.current.open();
        }}
        style={styles.addButton}
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
      <CreateHabitModal
        getRef={(ref) => (modalRef.current = ref)}
        createHabit={createHabit}
      />
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
    width: width - 30,
    height: height * 0.34,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 80,
    width: width - 30,
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
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "rgba(37, 67, 107, 0.6)",
    fontFamily: "Sego",
  },
  errorToast: {
    textColor: "#25436B",
  },
});
