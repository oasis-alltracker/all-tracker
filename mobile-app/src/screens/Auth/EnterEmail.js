import { TouchableHighlight } from "react-native-gesture-handler";

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

import * as AppleAuthentication from "expo-apple-authentication";

import LoginAPI from "../../api/auth/loginAPI";
import UserAPI from "../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../user/keychain";
import { makeRedirectUri } from "expo-auth-session";
import Toast from "react-native-root-toast";
import { isEmailValid } from "../../utils/commonUtils";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Header, Input, ContinueButton } from "../../components";
import navigationService from "../../navigators/navigationService";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure();

const EnterEmail = () => {
  const [googleLoginAttempted, setGoogleLoginAttempted] = useState(false);
  const [email, setEmail] = useState("");
  const [accountIsLocked, setAccountIsLocked] = useState(false);

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
      Toast.show("Something went wrong. Please try again later!", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    }
  };

  //--------------------- GOOGLE LOGIN
  const [request, googleResponse, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "315014991553-j5b6on7h282vrtkvlmjuaksaoh989t9c.apps.googleusercontent.com",
    iosClientId:
      "315014991553-eo63jke24uk35ihhuqg8ltpa4iqp48aq.apps.googleusercontent.com",
    expoClientId:
      "315014991553-k1o91bv0a3br4uhltske4rqmhd7m28bf.apps.googleusercontent.com",
    redirectUri: makeRedirectUri(),
  });

  // Somewhere in your code
  const googleSignIn = async () => {
    setGoogleLoginAttempted(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (e) {
      console.log(e);
      Toast.show("Something went wrong. Please try again later!", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    }
  };

  useEffect(() => {
    const saveTokens = async (googleToken) => {
      const tokens = await LoginAPI.loginGoogle(googleToken);
      await saveToken("accessToken", tokens.accessToken);
      await saveToken("refreshToken", tokens.refreshToken);
      await processUserAccessToken();
    };
    if (googleResponse?.type === "success") {
      saveTokens(googleResponse.authentication.accessToken);
    } else if (googleLoginAttempted) {
      Toast.show("Something went wrong. Please try again later!", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    }
  }, [googleResponse]);

  //--------------------- LOGIN TOKENS
  const processUserAccessToken = async () => {
    const accessToken = await getAccessToken();
    const { status: userStatus, data: userData } = await UserAPI.getUser(
      accessToken
    );
    if (userData["isSetupComplete"]) {
      await navigationService.navigate("main");
    } else {
      await navigationService.navigate("setup");
    }
  };

  //--------------------- EMAIL LOGIN
  const onPressContinue = async () => {
    if (isEmailValid(email)) {
      const { status, data } = await LoginAPI.doesUserExist(email);

      if (status == 200)
        if (data) {
          if (data.isAccountLocked) {
            setAccountIsLocked(true);
          }
          if (data?.exists) {
            await navigationService.navigate("enterPassword", {
              email,
            });
          } else {
            await navigationService.navigate("createPassword", {
              email,
            });
          }
        } else {
          Toast.show("Something went wrong. Please try again.", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        }
    } else {
      Toast.show("Please enter a valid email address.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
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
            spellCheck={false}
          />
          <ContinueButton onPress={() => onPressContinue()} />
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
              onPress={async () => googleSignIn()}
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
