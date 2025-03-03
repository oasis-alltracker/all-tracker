import React, { useRef, useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Header } from "../../components";
import ScribbledText from "../../components/ScribbledText";

import Toast from "react-native-root-toast";
import navigationService from "../../navigators/navigationService";
import LoginAPI from "../../api/auth/loginAPI";
import UserAPI from "../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../user/keychain";

import Spinner from "react-native-loading-spinner-overlay";

const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const EnterCode = (props) => {
  const [code, setCode] = useState(["", "", "", ""]);
  let codeRef = useRef([]);

  const { email, password } = props.route.params;

  const [showResend, setShowResend] = useState(true);
  const [showBottomText, setShowBottomText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPressContinue = async () => {
    setIsLoading(true);
    setCode(["", "", "", ""]);
    otpValue = "";
    for (digit of code) {
      otpValue += digit;
    }
    if (code.length >= 4) {
      const { status, data } = await LoginAPI.loginOTP(email, otpValue);
      if (status == 200) {
        if (data?.loginFailed == "locked") {
          setCode(["", "", "", ""]);
          otpValue = "";
          setShowBottomText(false);
          setIsLoading(false);
          Alert.alert(
            "Account Locked",
            "Your account has been locked for security reasons. To unlock it, you must reset your password",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Unlock",
                isPreferred: true,
                onPress: async () => {
                  try {
                    setCode(["", "", "", ""]);
                    otpValue = "";
                    await LoginAPI.requestNewPassword(email);
                    await navigationService.navigate("tempPassword", { email });
                  } catch (e) {
                    logout();
                    navigationService.reset("auth", 0);
                  }
                },
              },
            ],
            {
              cancelable: true,
            }
          );
        } else if (data?.loginFailed == "incorrectOTP") {
          setIsLoading(false);
          setShowBottomText(true);
          Toast.show("Invalid Code", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          });
        } else if (data?.loginFailed == "expired") {
          setIsLoading(false);
          setShowBottomText(true);
          Toast.show("Code has expired", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          });
        } else if (data?.loginFailed == "suspended") {
          setIsLoading(false);
          setShowBottomText(true);
          Toast.show(
            "Account suspended. Please login with partner sign-in or contact us.",
            {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            }
          );
        } else if (data?.accessToken && data?.refreshToken) {
          await saveToken("accessToken", data.accessToken);
          await saveToken("refreshToken", data.refreshToken);
          const accessToken = await getAccessToken();
          const { status: userStatus, data: userData } = await UserAPI.getUser(
            accessToken
          );

          setIsLoading(false);
          if (userData["isSetupComplete"]) {
            await navigationService.reset("main", 0);
            setCode("");
          } else {
            await navigationService.reset("contract", 0);
            setCode("");
          }
        } else {
          setIsLoading(false);
          setShowBottomText(true);
          Toast.show("Something went wrong. Please try again later!", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        }
      } else {
        setIsLoading(false);
        setShowBottomText(true);
        Toast.show("Something went wrong. Please try again later!", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
        //please wait 30 seconds before clicking resend email
      }
    } else {
      setIsLoading(false);
      Toast.show("Invalid Code", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const resendOTP = async () => {
    setShowResend(false);

    const { status, data } = await LoginAPI.requestOTP(email, password);

    setTimeout(() => {
      setShowResend(true);
    }, 30000);
  };

  function ResendMessage() {
    return (
      <View style={styles.errorContainer}>
        <ScribbledText style={styles.errorText}>
          Need a new code?{" "}
        </ScribbledText>
        <TouchableOpacity onPress={resendOTP}>
          <ScribbledText style={styles.resendOTPText}>Resend OTP</ScribbledText>
        </TouchableOpacity>
      </View>
    );
  }

  function LoadingMessage() {
    return (
      <View style={styles.errorContainer}>
        <ScribbledText style={styles.waitingText}>
          OTP sent! Please wait 30 seconds to send a new code.{" "}
        </ScribbledText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Spinner visible={isLoading}></Spinner>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view}>
          <View style={styles.center}>
            <Text style={styles.title}>
              Check your inbox for verification code
            </Text>
            <View style={styles.codeFields}>
              {[0, 1, 2, 3].map((item) => (
                <TextInput
                  ref={(ref) => (codeRef.current[item] = ref)}
                  maxLength={4}
                  keyboardType="number-pad"
                  textContentType={"oneTimeCode"}
                  style={styles.input}
                  value={code[item]}
                  key={item}
                  onKeyPress={({ nativeEvent }) => {
                    let Code = [...code];

                    if (Code[item] && keys.includes(nativeEvent.key)) {
                      if (codeRef.current[item]) {
                        Code[item] = nativeEvent.key;
                        setCode(Code);
                        try {
                          codeRef.current[item + 1].focus();
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    }
                    if (nativeEvent.key === "Backspace" && item !== 0) {
                      if (!Code[item]) {
                        codeRef.current[item - 1].focus();
                      }
                    }
                  }}
                  onChangeText={(text) => {
                    let Code = [...code];
                    if (text.length == 4 && item == 0) {
                      codeRef.current[0].blur();
                      setCode([text[0], text[1], text[2], text[3]]);
                    } else {
                      if (text.length <= 1) {
                        Code[item] = text;
                      }

                      if (text) {
                        if (codeRef.current[item + 1]) {
                          codeRef.current[item + 1].focus();
                        }
                      }
                      if (text && item === 3) {
                        codeRef.current[3].blur();
                      }
                      setCode(Code);
                    }
                  }}
                />
              ))}
            </View>
            <Button onPress={() => onPressContinue()} style={styles.nextButton}>
              Continue
            </Button>
            {showBottomText &&
              (showResend ? <ResendMessage /> : <LoadingMessage />)}
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
    fontSize: 18,
    fontFamily: "Sego-Bold",
    marginVertical: 30,
    textAlign: "center",
  },
  codeFields: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  input: {
    color: "#25436B",
    width: "22%",
    aspectRatio: 1 / 1.1,
    fontFamily: "Sego",
    backgroundColor: "#FFD8FF",
    borderRadius: 25,
    textAlign: "center",
    fontSize: 40,
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
  errorContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },
  errorToast: { textColor: "#fff", zIndex: 999, elevation: 100 },
  resendOTPText: {
    color: "#25436B",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  waitingText: {
    fontSize: 12,
    color: "#25436B",
  },
  nextButton: {
    marginTop: 15,
    width: SCREEN_WIDTH - 50,
  },
});

export default EnterCode;
