import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-root-toast";
import CheckBox from "../../../assets/icons/checkbox";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { getAccessToken } from "../../../user/keychain";
const Agreement = () => {
  const [checked, setChecked] = useState(false);

  const onPressContinue = async () => {
    if (checked) {
      const token = await getAccessToken();
      try {
        systemNotificationsStatus =
          await NotificationsHandler.checkNotificationsStatus(token);
        if (systemNotificationsStatus) {
          await NotificationsHandler.updateNotification(
            token,
            "notifications",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "on"
          );
          await NotificationsHandler.updateNotification(
            token,
            "taskPreference",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "on"
          );
        } else {
          await NotificationsHandler.updateNotification(
            token,
            "notifications",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "off"
          );
          await NotificationsHandler.updateNotification(
            token,
            "taskPreference",
            "undefined",
            "undefined",
            "undefined",
            "undefined",
            "off"
          );
        }
      } catch (e) {
        console.log(e);
      }

      setChecked(false);
      navigationService.navigate("setup");
    } else {
      Toast.show("You must sign the agreement to continue.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.center}>
          <Text style={styles.title}>Welcome to Oasis!</Text>
          <TouchableOpacity
            onPress={() => navigationService.navigate("termsOfService")}
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>
              Read our <Text style={styles.boldText}>Terms of Service</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigationService.navigate("privacyPolicy")}
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>
              Read the <Text style={styles.boldText}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigationService.navigate("userAgreement")}
            style={styles.linkBtn}
          >
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
        <Button onPress={() => onPressContinue()} style={styles.nextButton}>
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
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Sego-Bold",
    marginTop: 35,
    marginBottom: 50,
  },
  linkBtn: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    marginVertical: 45,
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
    marginTop: 150,
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
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});

export default Agreement;
