import React, { useEffect, useState } from "react";

import { TouchableHighlight } from "react-native-gesture-handler";

import * as AppleAuthentication from "expo-apple-authentication";
import { AppEventsLogger } from "react-native-fbsdk-next";

import LoginAPI from "../../api/auth/loginAPI";
import UserAPI from "../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../user/keychain";
import Toast from "react-native-root-toast";
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

const CreateAccountLock = (props) => {
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");

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
      Toast.show("Something went wrong. Please try again later!", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
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
      Toast.show("Something went wrong. Please try again later!", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
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
      await navigationService.reset("main", 0);
    } else {
      try {
        AppEventsLogger.logEvent(AppEventsLogger.AppEvents.StartTrial);
      } catch (e) {
        console.log(e);
      }
      await navigationService.navigate("contract");
    }
  };

  const onPressContinue = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    if (password.length > 0) {
      if (password === passwordCopy) {
        try {
          const deviceID = await getUniqueId();

          const { status, data } = await LoginAPI.loginDevice(
            deviceID,
            password
          );

          if (status == 200 && data?.accessToken && data?.refreshToken) {
            await saveToken("accessToken", data.accessToken);
            await saveToken("refreshToken", data.refreshToken);
            await processUserAccessToken();
          } else if (!data.isCorrectPassword) {
            setIsLoading(false);
            Toast.show(
              "Incorrect password. This device already has an account",
              {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
              }
            );
            navigationService.navigate("unlockAccount");
          } else if (data.isAccountSuspended || data.isAccountLocked) {
            setIsLoading(false);
            Alert.alert(
              "Account Locked",
              "Your account has been locked for security reasons. To unlock it, you must contact us",
              [{ text: "Ok" }],
              {
                cancelable: true,
              }
            );
          } else {
            setIsLoading(false);
            Toast.show("Something went wrong. Please try again.", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.CENTER,
            });
          }
        } catch (e) {
          console.log(e);
          setIsLoading(false);
          Toast.show("Something went wrong. Please try again.", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        }
      } else {
        setIsLoading(false);
        Toast.show("Passwords do not match.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    } else {
      setIsLoading(false);
      Toast.show("Please enter a password.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
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
            <Text style={styles.title}>Create a password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                secureTextEntry={true}
                placeholderTextColor="#9c9eb9"
                onChangeText={setPassword}
                autoCapitalize="none"
                value={password}
              />
            </View>
            <View style={[styles.passwordInputContainer, { marginBottom: 40 }]}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Re-enter your password"
                secureTextEntry={true}
                placeholderTextColor="#9c9eb9"
                onChangeText={setPasswordCopy}
                autoCapitalize="none"
                value={passwordCopy}
              />
            </View>
            <Button onPress={() => onPressContinue()} style={styles.nextButton}>
              Continue
            </Button>
            <View
              style={[styles.signContainer, { paddingTop: height * 0.0225 }]}
            >
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
                    underlayColor="rgba(73,182,77,1,0.9)"
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
                  underlayColor="rgba(73,182,77,1,0.9)"
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
    backgroundColor: "#fff",
  },
  title: {
    color: "#25436B",
    fontSize: 24,
    fontFamily: "Sego-Bold",
    marginVertical: 30,
  },
  passwordInput: {
    color: "black",
    fontSize: 20,
    marginLeft: 10,
    height: 40,
    textAlign: "center",
    fontFamily: "Sego",
  },
  passwordInputContainer: {
    margin: 10,
    padding: 5,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 2,
    backgroundColor: "white",
    alignSelf: "center",
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
  nextButton: {
    width: SCREEN_WIDTH - 50,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
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
    backgroundColor: "white",
    borderRadius: 100,
    borderColor: "lightgray",
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
    fontFamily: "Sego",
    textAlign: "center",
  },
});

export default CreateAccountLock;
