import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Button, Header, Input } from "../../components";
import navigationService from "../../navigators/navigationService";

const EnterEmail = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.view}>
        <View style={styles.center}>
          <Text style={styles.title}>What is your email address?</Text>
          <Input input={styles.input} placeholder="Entrer your email address" />
          <Button
            onPress={() => navigationService.navigate("enterPassword")}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
        <View style={styles.center}>
          <Text style={styles.seperator}>--Or--</Text>
          <View style={styles.social}>
            <TouchableOpacity style={styles.iconView}>
              <Image
                style={styles.icon}
                source={require("../../assets/images/google.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconView}>
              <Image
                style={styles.icon}
                source={require("../../assets/images/apple-black.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#25436B",
    fontSize: 22,
    fontFamily: "Sego-Bold",
    marginVertical: 30,
    textAlign: "center",
  },
  input: {
    color: "#25436B",
    fontFamily: "Sego",
  },
  button: {
    width: "100%",
    marginVertical: 20,
  },
  center: {
    alignItems: "center",
  },
  view: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  seperator: {
    fontSize: 20,
    color: "#1E1E1E",
    fontFamily: "Sego",
    marginBottom: 30,
  },
  social: {
    flexDirection: "row",
  },
  iconView: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});

export default EnterEmail;
