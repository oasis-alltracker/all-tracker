import { ValueSheet } from "../../ValueSheet";
import React, { useContext, useEffect, useState } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppEventsLogger } from "react-native-fbsdk-next";
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
  TouchableOpacity,
} from "react-native";
import { Header, Button } from "../../components";
import navigationService from "../../navigators/navigationService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getUniqueId } from "react-native-device-info";
import { SafeAreaView } from "react-native-safe-area-context";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";

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
  const theme = useContext(ThemeContext).value;
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
            Toast.show({
              type: "info",
              text1: "Incorrect password",
              text2: "This device already has an account.",
            });
            navigationService.navigate("unlockAccount");
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
              text1: "Something went wrong",
              text2: "Please try again later.",
            });
          }
        } catch (e) {
          console.log(e);
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
          text1: "Passwords do not match",
          text2: "Please try entering the passwords again.",
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
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <Header showCenter={false} />
      <Spinner visible={isLoading}></Spinner>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <View style={styles.center}>
            <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
              Create a password
            </Text>
            <View
              style={[
                styles.passwordInputContainer,
                sharedStyles["borderedContainer_" + theme],
              ]}
            >
              <TextInput
                style={[
                  styles.passwordInput,
                  sharedStyles["textColour_" + theme],
                ]}
                placeholder="Enter your password"
                secureTextEntry={true}
                placeholderTextColor={ValueSheet.colours[theme].inputGrey}
                onChangeText={setPassword}
                autoCapitalize="none"
                value={password}
              />
            </View>
            <View
              style={[
                styles.passwordInputContainer,
                sharedStyles["borderedContainer_" + theme],
                { marginBottom: 40 },
              ]}
            >
              <TextInput
                style={[
                  styles.passwordInput,
                  sharedStyles["textColour_" + theme],
                ]}
                placeholder="Re-enter your password"
                secureTextEntry={true}
                placeholderTextColor={ValueSheet.colours[theme].inputGrey}
                onChangeText={setPasswordCopy}
                autoCapitalize="none"
                value={passwordCopy}
              />
            </View>
            <Button
              positiveSelect={true}
              onPress={() => onPressContinue()}
              style={styles.nextButton}
            >
              Continue
            </Button>
            <View
              style={[styles.signContainer, { paddingTop: height * 0.0225 }]}
            >
              <Text style={[styles.txt, sharedStyles["textColour_" + theme]]}>
                --or--
              </Text>
              <View
                style={[
                  styles.rowContainer,
                  appleAuthAvailable && { flexDirection: "row", gap: 30 },
                ]}
              >
                {appleAuthAvailable ? (
                  <TouchableOpacity
                    style={[
                      styles.iconContainer,
                      sharedStyles["borderedContainer_" + theme],
                    ]}
                    onPress={() => appleSignin()}
                  >
                    <Image
                      style={[
                        styles.accountIcon,
                        sharedStyles["tint_" + theme],
                      ]}
                      source={require("../../assets/images/apple-black.png")}
                    />
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={[
                    styles.iconContainer,
                    sharedStyles["borderedContainer_" + theme],
                  ]}
                  onPress={() => googleSignIn()}
                >
                  <Image
                    style={[styles.accountIcon, sharedStyles["tint_" + theme]]}
                    source={require("../../assets/images/google.png")}
                  />
                </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginVertical: 30,
  },
  passwordInput: {
    fontSize: 20,
    marginLeft: 10,
    height: 40,
    textAlign: "center",
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  passwordInputContainer: {
    margin: 10,
    padding: 5,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    borderWidth: 2,
    alignSelf: "center",
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
  nextButton: {
    width: SCREEN_WIDTH - 50,
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
    borderRadius: 100,
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
    fontFamily: ValueSheet.fonts.primaryFont,
    textAlign: "center",
  },
});

export default CreateAccountLock;
