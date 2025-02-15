import React, { useEffect, useState } from "react";

import { TouchableHighlight } from "react-native-gesture-handler";

import * as AppleAuthentication from "expo-apple-authentication";

import LoginAPI from "../../api/auth/loginAPI";
import UserAPI from "../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../user/keychain";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { isEmailValid } from "../../utils/commonUtils";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Header, Button } from "../../components";
import navigationService from "../../navigators/navigationService";
import { logout } from "../../user/keychain";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  androidClientId:
    "43771055341-cvak5frg7dsoeinv6l2t5fq0cll4blqi.apps.googleusercontent.com",
  iosClientId:
    "43771055341-6ifjbjlqepa7e78etvbo1qre9008fetv.apps.googleusercontent.com",
  webClientId:
    "43771055341-4cm2hvtpuo1sdjrbddoduopuqpvgm77i.apps.googleusercontent.com",
});

const EnterEmail = () => {
  const [email, setEmail] = useState("");
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
      await navigationService.navigate("contract");
    }
  };

  //--------------------- EMAIL LOGIN
  const onPressContinue = async () => {
    setIsLoading(true);
    if (isEmailValid(email)) {
      const { status, data } = await LoginAPI.doesUserExist(email);

      if (status == 200 && data) {
        if (data.isAccountSuspended) {
          setIsLoading(false);
          Alert.alert(
            "Oasis Account Suspended",
            "Your account has been suspended for security reasons. To unlock it, you must contact us",
            [{ text: "Ok" }],
            {
              cancelable: true,
            }
          );
        }
        if (data.isAccountLocked) {
          setIsLoading(false);
          Alert.alert(
            "Oasis Account Locked",
            "Your account has been locked for security reasons. To unlock it, you must reset your password",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Unlock",
                isPreferred: true,
                onPress: async () => {
                  try {
                    await LoginAPI.requestNewPassword(email);
                    await navigationService.navigate("tempPassword", {
                      email,
                    });
                    setEmail("");
                  } catch (e) {
                    logout();
                    navigationService.reset("landing", 0);
                  }
                },
              },
            ],
            {
              cancelable: true,
            }
          );
        } else if (data?.exists) {
          setIsLoading(false);

          await navigationService.navigate("enterPassword", {
            email,
          });
          setEmail("");
        } else {
          setIsLoading(false);

          await navigationService.navigate("createPassword", {
            email,
          });
          setEmail("");
        }
      } else {
        setIsLoading(false);
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    } else {
      setIsLoading(false);
      Toast.show("Please enter a valid email address.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <View style={styles.center}>
            <Text style={styles.title}>What is your email address?</Text>
            <View style={styles.emailInputContainer}>
              <TextInput
                style={styles.emailInput}
                placeholder="Enter your email address"
                placeholderTextColor="#9c9eb9"
                onChangeText={setEmail}
                underlineColorAndroid="transparent"
                spellCheck={false}
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
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
    paddingHorizontal: 10,
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
    paddingHorizantal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    paddingBottom: 100,
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
  signContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
    width: 20,
    height: 20,
  },
  rowContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  nextButton: {
    width: SCREEN_WIDTH - 50,
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
    paddingTop: 32,
    fontFamily: "Sego",
    textAlign: "center",
  },
  buttonText: {
    color: "#25436B",
    fontSize: 28,
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
  emailInput: {
    color: "black",
    fontSize: 20,
    marginLeft: 10,
    height: 40,
    textAlign: "center",
    fontFamily: "Sego",
  },
  emailInputContainer: {
    margin: 10,
    marginBottom: 40,
    padding: 5,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 2,
    backgroundColor: "white",
    alignSelf: "center",
  },
});

export default EnterEmail;
