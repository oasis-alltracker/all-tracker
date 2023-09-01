import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import LogoHeader from "../../../components/LogoHeader/LogoHeader";
import ContinueButton from "../../../components/ContinueButton/ContinueButton";
import ScribbledText from "../../../components/ScribbledText";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "dopenative";
import dynamicStyles from "./styles";

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

import * as AppleAuthentication from "expo-apple-authentication";

import LoginAPI from "../../../api/auth/loginAPI";
import UserAPI from "../../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../../user/keychain";
import Toast from "react-native-root-toast";
import { isEmailValid } from "../../../utils/commonUtils";

export default function SignInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);

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
      console.log(e);
    }
  };

  //--------------------- GOOGLE LOGIN
  const [request, googleResponse, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "315014991553-b534c0cndl001dm0b9kr9m0876rv20df.apps.googleusercontent.com",
    iosClientId:
      "315014991553-rs5sa19o9599kk3mnv3p9is0m5d13kgj.apps.googleusercontent.com",
    expoClientId:
      "315014991553-n73e15nhisbkdecaetgbqo017pm9dqel.apps.googleusercontent.com",
  });

  useEffect(() => {
    const saveTokens = async (googleToken) => {
      const tokens = await LoginAPI.loginGoogle(googleToken);
      await saveToken("accessToken", tokens.accessToken);
      await saveToken("refreshToken", tokens.refreshToken);
      await processUserAccessToken();
    };
    if (googleResponse?.type === "success") {
      saveTokens(googleResponse.authentication.accessToken);
    } else if (loginAttempted) {
      Toast.show("Something went wrong. Please try again later!", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  }, [googleResponse]);

  const googleSignin = () => {
    promptAsync({ useProxy: true, shownInRecents: true });
  };

  const processUserAccessToken = async () => {
    const accessToken = await getAccessToken();
    const { status: userStatus, data: userData } = await UserAPI.getUser(
      accessToken
    );
    const setupStatus = userData["isSetupComplete"];

    if (setupStatus === "true") {
      console.log("Go to navigation page");
    } else {
      await navigation.navigate("SelectTrackers");
    }
  };

  //--------------------- EMAIL LOGIN
  const onPressContinue = async () => {
    if (isEmailValid(email)) {
      const { status, data } = await LoginAPI.doesUserExist(email);

      if (status == 200)
        if (data?.exists) {
          await props.navigation.navigate("EnterPassword", {
            screen: "EnterPassword",
            email,
          });
        } else {
          await props.navigation.navigate("CreatePassword", {
            screen: "CreatePassword",
            email,
          });
        }
      else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      }
    } else {
      Toast.show("Please enter a valid email", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.signupHeader}>
          <LogoHeader navigation={navigation} />
        </View>
        <View style={styles.signupContent}>
          <ScribbledText style={styles.title}>
            What is your email address?
          </ScribbledText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#9c9eb9"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <ContinueButton onPress={() => onPressContinue()} />
          <View style={styles.signContainer}>
            <ScribbledText style={styles.txt}>--or--</ScribbledText>
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
                    source={require("../../../assets/icons/apple-black.png")}
                  />
                </TouchableHighlight>
              ) : null}
              <TouchableHighlight
                style={styles.iconContainer}
                onPress={async () => googleSignin()}
                underlayColor="rgba(73,182,77,1,0.9)"
              >
                <Image
                  style={styles.accountIcon}
                  source={require("../../../assets/icons/google.png")}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
