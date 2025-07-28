import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import Toast from "react-native-toast-message";
import CheckBox from "../../../assets/icons/checkbox";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { getAccessToken } from "../../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import { ValueSheet } from "../../../ValueSheet";

const Agreement = () => {
  const { width, height } = useWindowDimensions();
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPressContinue = async () => {
    if (checked) {
      setIsLoading(true);
      const token = await getAccessToken();
      try {
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
        await NotificationsHandler.updateNotification(
          token,
          "habitPreference",
          "undefined",
          "undefined",
          "undefined",
          "undefined",
          "on"
        );
        await NotificationsHandler.updateNotification(
          token,
          "moodPreference",
          "undefined",
          "undefined",
          "undefined",
          "undefined",
          "off"
        );
        await NotificationsHandler.updateNotification(
          token,
          "sleepPreference",
          "undefined",
          "undefined",
          "undefined",
          "undefined",
          "off"
        );
        await NotificationsHandler.updateNotification(
          token,
          "morningPreference",
          "undefined",
          "undefined",
          "undefined",
          "undefined",
          "off"
        );

        setChecked(false);
        setIsLoading(false);
        navigationService.navigate("setup");
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again later.",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Unchecked agreements",
        text2: "Please confirm you read and understand the agreements.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.view}>
        <View style={[styles.center, { marginTop: height * 0.16 }]}>
          <Text style={styles.title}>Welcome to Oasis!</Text>
          <TouchableOpacity
            onPress={() => navigationService.navigate("termsOfService")}
            style={styles.linkBtn}
          >
            <Text style={[styles.linkText, { marginVertical: height * 0.004 }]}>
              Read our <Text style={styles.boldText}>Terms of Service</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigationService.navigate("privacyPolicy")}
            style={styles.linkBtn}
          >
            <Text style={[styles.linkText, { marginVertical: height * 0.004 }]}>
              Read the <Text style={styles.boldText}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigationService.navigate("userAgreement")}
            style={styles.linkBtn}
          >
            <Text style={[styles.linkText, { marginVertical: height * 0.004 }]}>
              Read the <Text style={styles.boldText}>User Agreement</Text>
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.row,
              { marginTop: height * 0.06, marginBottom: height * 0.04 },
            ]}
          >
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
    backgroundColor: ValueSheet.colours.background,
  },
  title: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 34,
    textAlign: "center",
    fontFamily: ValueSheet.fonts.primaryBold,
    marginBottom: 50,
  },
  linkBtn: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
  },
  agreementText: {
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginLeft: 15,
    flex: 1,
  },
  linkText: {
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryFont,
    textDecorationLine: "underline",
  },
  boldText: {
    fontFamily: ValueSheet.fonts.primaryBold,
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
});

export default Agreement;
