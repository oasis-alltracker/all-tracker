import { ValueSheet } from "../../ValueSheet";
import React, { useEffect, useState } from "react";

import { TouchableHighlight } from "react-native-gesture-handler";

import * as AppleAuthentication from "expo-apple-authentication";

import LoginAPI from "../../api/auth/loginAPI";
import UserAPI from "../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../user/keychain";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Header, Button } from "../../components";
import navigationService from "../../navigators/navigationService";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getUniqueId } from "react-native-device-info";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

GoogleSignin.configure({
  androidClientId:
    "43771055341-cvak5frg7dsoeinv6l2t5fq0cll4blqi.apps.googleusercontent.com",
  iosClientId:
    "43771055341-6ifjbjlqepa7e78etvbo1qre9008fetv.apps.googleusercontent.com",
  webClientId:
    "43771055341-4cm2hvtpuo1sdjrbddoduopuqpvgm77i.apps.googleusercontent.com",
});

const UnlockAccount = (props) => {
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //--------------------- APPLE LOGIN
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);

  const appleSignin = async () => {
    setIsLoading(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const tokens = await LoginAPI.loginApple(credential.identityToken);
      await saveToken("accessToken", tokens.accessToken);
      await saveToken("refreshToken", tokens.refreshToken);
      await processUserAccessToken();
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      Toast.show({
        type: "info",
        text1: "Apple sign-in unsuccessful",
        text2: "Please try again later.",
      });
    }
  };

  //--------------------- GOOGLE LOGIN

  const googleSignIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await LoginAPI.loginGoogle(userInfo.idToken);
      await saveToken("accessToken", tokens.accessToken);
      await saveToken("refreshToken", tokens.refreshToken);
      await processUserAccessToken();
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      Toast.show({
        type: "info",
        text1: "Google sign-in unsuccessful",
        text2: "Please try again later.",
      });
    }
  };

  //--------------------- SAVE USER TOKENS
  const processUserAccessToken = async () => {
    const accessToken = await getAccessToken();
    const { status: userStatus, data: userData } = await UserAPI.getUser(
      accessToken
    );

    setIsLoading(false);
    if (userData.isSetupComplete) {
      navigationService.reset("main", 0);
      var allNotifications = await NotificationsHandler.getNotifications(
        token,
        "notifications"
      );
      if (allNotifications[0]?.preference === "on") {
        await NotificationsHandler.checkNotificationsStatus(token);
      }
    } else {
      navigationService.navigate("contract");
    }
  };

  const onPressContinue = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    if (password.length > 0) {
      const deviceID = await getUniqueId();
      const { status, data } = await LoginAPI.loginDevice(deviceID, password);

      if (status == 200 && data) {
        if (status == 200 && data?.accessToken && data?.refreshToken) {
          await saveToken("accessToken", data.accessToken);
          await saveToken("refreshToken", data.refreshToken);
          await processUserAccessToken();
        } else if (data.isAccountSuspended || data.isAccountLocked) {
          setIsLoading(false);
          Alert.alert(
            "Account Locked",
            "Your account has been locked for security reasons. To unlock it, you must contact us.",
            [{ text: "Ok" }],
            {
              cancelable: true,
            }
          );
        } else {
          setIsLoading(false);
          Toast.show({
            type: "info",
            text1: "Password is incorrect",
            text2: "Please try again.",
          });
        }
      } else {
        setIsLoading(false);
        Toast.show({
          type: "info",
          text1: "Something went wrong",
          text2: "Please try again later.",
        });
      }
    } else {
      setIsLoading(false);
      Toast.show({
        type: "info",
        text1: "Incomplete field",
        text2: "Please enter a password.",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showCenter={false} />
      <Spinner visible={isLoading}></Spinner>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <View style={styles.center}>
            <Text style={styles.title}>Enter your password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                secureTextEntry={true}
                placeholderTextColor={ValueSheet.colours.black25}
                onChangeText={setPassword}
                value={password}
                autoCapitalize="none"
              />
            </View>
            <Button onPress={() => onPressContinue()} style={styles.nextButton}>
              Continue
            </Button>
            <View style={styles.signContainer}>
              <Text style={styles.txt}>--or--</Text>
              <View
                style={[
                  styles.rowContainer,
                  appleAuthAvailable && { flexDirection: "row", gap: 30 },
                ]}
              >
                {appleAuthAvailable ? (
                  <TouchableHighlight
                    style={styles.iconContainer}
                    onPress={() => appleSignin()}
                    underlayColor={ValueSheet.colours.black10}
                  >
                    <Image
                      style={styles.accountIcon}
                      source={require("../../assets/images/apple-black.png")}
                    />
                  </TouchableHighlight>
                ) : null}
                <TouchableHighlight
                  style={styles.iconContainer}
                  onPress={() => googleSignIn()}
                  underlayColor={ValueSheet.colours.black10}
                >
                  <Image
                    style={styles.accountIcon}
                    source={require("../../assets/images/google.png")}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
  },
  title: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 24,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginVertical: 45,
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
  passwordInput: {
    color: ValueSheet.colours.black,
    fontSize: 20,
    marginLeft: 10,
    height: 40,
    textAlign: "center",
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  nextButton: {
    width: SCREEN_WIDTH - 50,
  },
  passwordInputContainer: {
    margin: 10,
    marginBottom: 40,
    padding: 5,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    borderColor: ValueSheet.colours.grey,
    borderWidth: 2,
    backgroundColor: ValueSheet.colours.background,
    alignSelf: "center",
  },
  signContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  rowContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 100,
    borderColor: ValueSheet.colours.grey,
    borderWidth: 2,
    padding: 20,
  },
  accountIcon: {
    alignSelf: "center",
    height: 50,
    width: 50,
  },
  txt: {
    fontSize: 30,
    paddingTop: 32,
    fontFamily: ValueSheet.fonts.primaryFont,
    textAlign: "center",
  },
});

export default UnlockAccount;
