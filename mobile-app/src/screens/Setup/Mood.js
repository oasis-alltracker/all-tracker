import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../components";
import navigationService from "../../navigators/navigationService";
import Switch from "../../assets/icons/switch";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../user/keychain";
import UserAPI from "../../api/user/userAPI";
import Spinner from "react-native-loading-spinner-overlay";

const Mood = (props) => {
  const [isNotif, setIsNotif] = useState(false);
  const [days] = useState([
    "Every Day",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const [active, setActive] = useState(0);
  const { selectedTrackers } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);

  const onNext = async () => {
    setIsLoading(true);
    try {
      if (selectedTrackers.sleepSelected) {
        navigationService.navigate("sleep", { selectedTrackers });
      } else {
        const accessToken = await getAccessToken();
        const { status, data } = await UserAPI.updateUser(
          true,
          selectedTrackers,
          accessToken
        );

        //TO-DO check if user is subscribed
        setIsLoading(false);
        navigationService.reset("main", 0);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading}></Spinner>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.center}
      >
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../assets/images/mood.png")}
          />
          <Text style={styles.imageText}>mood</Text>
        </View>
        <Button
          disabled={true}
          style={[styles.bigButtons, styles.notification]}
        >
          <View style={styles.row}>
            <Text style={[styles.text]}>Notifications:</Text>
            <TouchableOpacity onPress={() => setIsNotif((pr) => !pr)}>
              <Switch width={55} height={32} active={isNotif} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, styles.minitext]}>
            Review yonr mood and write in your diary
          </Text>
        </Button>
        <Button
          disabled={true}
          style={[styles.bigButtons, styles.notificationCon]}
        >
          <Text style={[styles.text, styles.selectText]}>
            Wellness check-in
          </Text>
          <ScrollView
            contentContainerStyle={styles.dayList}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {days.map((item, index) => (
              <Button
                textStyle={[styles.text, styles.timeText]}
                onPress={() => setActive(index)}
                style={
                  index !== active
                    ? [styles.dayBt, styles.inactive]
                    : styles.dayBt
                }
                key={index}
              >
                {item}
              </Button>
            ))}
          </ScrollView>
          <View style={[styles.row, styles.timeCon]}>
            <Text style={[styles.text, styles.whatTime]}>At what time?</Text>
            <Button
              style={styles.dayBt}
              textStyle={[styles.text, styles.timeText]}
            >
              8:00 PM
            </Button>
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.addButton}>
            <Image
              style={styles.plusImage}
              source={require("../../assets/images/plus.png")}
            />
          </TouchableOpacity>
        </Button>
      </ScrollView>
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
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#FFEFBD",
    borderWidth: 2,
    borderColor: "#CCBF98",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
    fontSize: 24,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 20,
    marginLeft: 10,
  },
  boldText: {
    fontFamily: "Sego-Bold",
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
    height: 100,
    borderRadius: 40,
    marginTop: 10,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  notification: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 20,
  },
  center: {},
  selectImage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#25436B",
    fontSize: 24,
    fontFamily: "Sego",
  },
  minitext: {
    fontSize: 13,
    marginTop: 10,
  },
  selectText: {
    margin: 20,
    fontSize: 20,
  },
  selectTime: {
    marginBottom: 0,
  },
  timeText: {
    fontSize: 16,
  },
  notificationCon: {
    height: "auto",
    flexDirection: "column",
    paddingHorizontal: 0,
    alignItems: "flex-start",
  },
  inactive: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  dayBt: {
    height: 35,
    borderRadius: 10,
    marginBottom: 0,
  },
  timeCon: {
    paddingHorizontal: 20,
  },
  dayList: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  whatTime: {
    fontSize: 20,
  },
  addButton: {
    alignSelf: "center",
    marginVertical: 15,
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default Mood;
