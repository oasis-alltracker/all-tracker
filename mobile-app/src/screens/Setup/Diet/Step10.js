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
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Switch from "../../../assets/icons/switch";

const Step10 = () => {
  const [isNotif, setIsNotif] = useState(false);
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.center}
      >
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/diet.png")}
          />
          <Text style={styles.imageText}>diet</Text>
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
            Get personalized reminders to stay on track
          </Text>
        </Button>
        <Text style={styles.title}>Meals</Text>
        <Button disabled={true} style={styles.bigButtons}>
          <TouchableOpacity onPress={() => setSwitch1((pr) => !pr)}>
            <Switch active={switch1} />
          </TouchableOpacity>
          <Text style={[styles.text, styles.selectText]}>Breakfast</Text>
          <Button
            textStyle={styles.timeText}
            style={styles.selectTime}
            disabled={true}
          >
            8:00 AM
          </Button>
        </Button>
        <Button disabled={true} style={styles.bigButtons}>
          <TouchableOpacity onPress={() => setSwitch2((pr) => !pr)}>
            <Switch active={switch2} />
          </TouchableOpacity>
          <Text style={[styles.text, styles.selectText]}>Lunch</Text>
          <Button
            textStyle={styles.timeText}
            style={styles.selectTime}
            disabled={true}
          >
            11:00 AM
          </Button>
        </Button>
        <Button disabled={true} style={styles.bigButtons}>
          <TouchableOpacity onPress={() => setSwitch3((pr) => !pr)}>
            <Switch active={switch3} />
          </TouchableOpacity>
          <Text style={[styles.text, styles.selectText]}>Dinner</Text>
          <Button
            textStyle={styles.timeText}
            style={styles.selectTime}
            disabled={true}
          >
            8:00 PM
          </Button>
        </Button>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button
          onPress={() => navigationService.navigate("fitness")}
          style={styles.button}
        >
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
    backgroundColor: "rgba(202, 189, 255, 0.65)",
    borderWidth: 2,
    borderColor: "rgba(162, 151, 204, 0.7)",
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
    fontFamily: "Sego-Bold",
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
    height: 90,
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
    fontSize: 12,
    marginTop: 10,
  },
  selectText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
  },
  selectTime: {
    marginBottom: 0,
  },
  timeText: {
    fontSize: 16,
  },
});

export default Step10;
