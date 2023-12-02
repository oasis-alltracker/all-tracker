import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Header, Input } from "../../components";
import navigationService from "../../navigators/navigationService";
import CheckBox from "../../assets/icons/checkbox";

const Agreement = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.view}>
        <View style={styles.center}>
          <Text style={styles.title}>Your personal data is secure</Text>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>
              Read our <Text style={styles.boldText}>Terms of Service</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>
              Read the <Text style={styles.boldText}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>
              Read the <Text style={styles.boldText}>User Agreement</Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => setChecked((pr) => !pr)}>
              <CheckBox checked={checked} />
            </TouchableOpacity>
            <Text style={styles.agreementText}>
              I understand and agree to the{" "}
              <Text style={styles.boldText}>Terms of Sevice</Text>, including
              the <Text style={styles.boldText}>Privacy Policy</Text> and{" "}
              <Text style={styles.boldText}>User Agreemeent</Text>
            </Text>
          </View>
        </View>
        <Button
          onPress={() => navigationService.navigate("setup")}
          style={styles.button}
        >
          Continue
        </Button>
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
    fontSize: 32,
    textAlign: "center",
    fontFamily: "Sego-Bold",
    marginVertical: 30,
  },
  linkBtn: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    marginVertical: 25,
    paddingHorizontal: 10,
  },
  agreementText: {
    fontSize: 18,
    fontFamily: "Sego",
    marginLeft: 15,
    flex: 1,
  },
  linkText: {
    fontSize: 18,
    fontFamily: "Sego",
    textDecorationLine: "underline",
    marginVertical: 5,
  },
  boldText: {
    fontFamily: "Sego-Bold",
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

export default Agreement;