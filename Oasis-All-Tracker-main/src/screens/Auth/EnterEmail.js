import { TouchableHighlight } from "react-native-gesture-handler";

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

import * as AppleAuthentication from "expo-apple-authentication";

import LoginAPI from "../../api/auth/loginAPI";
import UserAPI from "../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../user/keychain";
import Toast from "react-native-root-toast";
import { isEmailValid } from "../../utils/commonUtils";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Header, Input } from "../../components";
import navigationService from "../../navigators/navigationService";

const EnterEmail = () => {
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [email, setEmail] = useState("");

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
          await navigationService.navigate("enterPassword", {
            email,
          });
        } else {
          await navigationService.navigate("createPassword", {
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
    <View style={styles.container}>
      <Header />
      <View style={styles.view}>
        <View style={styles.center}>
          <Text style={styles.title}>What is your email address?</Text>
          <Input
            input={styles.input}
            onChangeText={setEmail}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            placeholder="Enter your email address"
            spellCheck="false"
          />
          <Button
            onPress={() => onPressContinue()}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            Continue
          </Button>
        </View>
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
              onPress={async () => googleSignin()}
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
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 0,
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
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    fontFamily: "Sego",
    textAlign: "center",
  },
  buttonText: {
    color: "#25436B",
    fontSize: 28,
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});

export default EnterEmail;
