import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Header } from "../../components";
import navigationService from "../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectTrackers = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Header />
      <Text style={styles.subtitle}>
        What would you like to track inside your journal?
      </Text>
      <View style={styles.middleContainer}>
        <View style={styles.center}>
          <TouchableOpacity disabled={true} style={styles.button}>
            <Image
              style={styles.image}
              source={require("../../assets/images/habits.png")}
            />
            <Text style={styles.title}>Habits</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.button}>
            <Image
              style={styles.image}
              source={require("../../assets/images/to-dos.png")}
            />
            <Text style={styles.title}>To-dos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            disabled={true}
            style={[
              styles.button,
              {
                backgroundColor: "rgba(202, 189, 255, 0.68)",
                borderColor: "rgba(162, 151, 204, 0.744)",
              },
            ]}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/diet.png")}
            />
            <Text style={styles.title}>Diet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            style={[
              styles.button,
              {
                backgroundColor: "rgba(202, 189, 255, 0.68)",
                borderColor: "rgba(162, 151, 204, 0.744)",
              },
            ]}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/fitness.png")}
            />
            <Text style={styles.title}>Fitness</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            disabled={true}
            style={[
              styles.button,
              {
                backgroundColor: "rgba(255, 239, 189, 1)",
                borderColor: "rgba(204, 191, 152, 1)",
              },
            ]}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/sleep.png")}
            />
            <Text style={styles.title}>Sleep</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            style={[
              styles.button,
              {
                backgroundColor: "rgba(255, 239, 189, 1)",
                borderColor: "rgba(204, 191, 152, 1)",
              },
            ]}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/mood.png")}
            />
            <Text style={styles.title}>Mood</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
        onPress={() => {
          navigationService.navigate("explainsubscription");
        }}
        style={styles.nextButton}
      >
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
    justifyContent: "space-between",
    paddingHorizontal: 30,
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
  },
  button: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
  },
  title: {
    color: "#25436B",
    fontSize: 24,
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
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#25436B",
    fontSize: 25,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 15,
  },
});