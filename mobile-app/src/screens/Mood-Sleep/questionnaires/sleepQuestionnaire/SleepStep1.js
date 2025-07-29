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
import { Image } from "react-native";
import { Button } from "../../../../components";
import navigationService from "../../../../navigators/navigationService";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { ValueSheet } from "../../../../ValueSheet";

const data = [
  {
    image: require("../../../../assets/images/sleepRating/5.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/4.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/3.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/2.png"),
  },
  {
    image: require("../../../../assets/images/sleepRating/1.png"),
  },
];

const SleepStep1 = (props) => {
  const { width, height } = useWindowDimensions();
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
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
    var sleepReport = {};

    sleepReport.dateStamp = dateStamp;
    sleepReport.title = dateString.slice(4, -4);
    if (active == 0) {
      Toast.show({
        type: "error",
        text1: "Please make a selection.",
      });
    } else {
      sleepReport.rating = 6 - active;
      navigationService.navigate("sleepStep2", {
        sleepReport,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading}></Spinner>

      <View style={styles.center}>
        <Text style={styles.title}>
          Overall, how would you rate your sleep?
        </Text>

        {data.map((val, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              setActive(key + 1);
            }}
            style={[
              styles.imageCon,
              { height: height * 0.09, width: width * 0.9 },
              active === key + 1 && {
                backgroundColor: ValueSheet.colours.secondaryColour,
              },
            ]}
          >
            <Image
              style={{ width: height * 0.08, height: height * 0.08 }}
              source={val.image}
            />
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
    backgroundColor: ValueSheet.colours.background,
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderColor: ValueSheet.colours.grey,
  },
  title: {
    fontSize: 30,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
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
    borderColor: ValueSheet.colours.grey,
  },
  center: {
    alignItems: "center",
  },
});

export default SleepStep1;
