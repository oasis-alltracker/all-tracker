import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import moment from "moment";

const { width, height } = Dimensions.get("window");

const data = [
  {
    image: require("../../../../assets/images/moodRating/5.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/4.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/3.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/2.png"),
  },
  {
    image: require("../../../../assets/images/moodRating/1.png"),
  },
];

const WellnessStep1 = (props) => {
  const [active, setActive] = useState(0);
  var dateStamp, dateString;

  if (props.route.params) {
    dateStamp = props.route.params.dateStamp;
    dateString = props.route.params.dateString;
  } else if (props.dateStampNotif && props.dateStringNotif) {
    dateStamp = props.dateStampNotif;
    dateString = props.dateStringNotif;
  } else {
    const today = new Date();
    dateString = today.toDateString();
    dateStamp = moment(today).format("YYYYMMDD");
  }

  const onNext = async () => {
    var moodReport = {};
    moodReport.dateStamp = dateStamp;
    moodReport.title = dateString.slice(4, -4);
    if (active == 0) {
      Toast.show("Please make a selection.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    } else {
      moodReport.feeling = 6 - active;
      navigationService.navigate("moodStep2", { moodReport });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Overall, how are you feeling?</Text>

        {data.map((val, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              setActive(key + 1);
            }}
            style={[
              styles.imageCon,
              active === key + 1 && { backgroundColor: "#D7F6FF" },
            ]}
          >
            <Image style={styles.image} source={val.image} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.reset("mood-sleep", 0)}
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
  image: {
    width: height * 0.08,
    height: height * 0.08,
  },
  imageCon: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.09,
    width: width * 0.9,
    marginBottom: 15,
    borderColor: "#CCCCCC",
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
  },
  title: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 40,
    marginBottom: 35,
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
});

export default WellnessStep1;
