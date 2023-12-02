import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../components";
import navigationService from "../../navigators/navigationService";

const Todos = () => {
  const [active, setActive] = useState(1);

  const data = [
    {
      name: "1 hour before",
    },
    {
      name: "1 day before",
    },
    {
      name: "Custom",
    },
    {
      name: "No, thanks",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../assets/images/to-dos.png")}
          />
          <Text style={styles.imageText}>to-dos</Text>
        </View>
        <Text style={styles.title}>
          Would you like to receive reminders for upcoming tasks?
        </Text>

        {data.map((val, key) => (
          <Button
            onPress={() => {
              setActive(key + 1);
            }}
            key={key.toString()}
            textStyle={styles.textStyle}
            style={[
              styles.bigButtons,
              active === key + 1 && { backgroundColor: "#D7F6FF" },
            ]}
          >
            {val.name}
          </Button>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button
          onPress={() => navigationService.navigate("diet")}
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
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
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
});

export default Todos;
