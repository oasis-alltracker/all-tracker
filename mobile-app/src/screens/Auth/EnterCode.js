import { Alert, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { ContinueButton, Header } from "../../components";
import ScribbledText from "../../components/ScribbledText";

import Toast from "react-native-root-toast";
import navigationService from "../../navigators/navigationService";
import LoginAPI from "../../api/auth/loginAPI";
import UserAPI from "../../api/user/userAPI";
import { saveToken, getAccessToken } from "../../user/keychain";

const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


const EnterCode = (props) => {
  const [code, setCode] = useState(["", "", "", ""]);
  let codeRef = useRef([]);

  const { email, password } = props.route.params;


  const [showResend, setShowResend] = useState(true)
  const [showBottomText, setShowBottomText] = useState(false)
  
  const onPressContinue = async () => {
    otpValue = ""
    for (digit of code){
      otpValue += digit
    }
    if(code.length>=4){
      const {status, data} = await LoginAPI.loginOTP(email, otpValue)
      if(status == 200){
        if(data?.loginFailed == "locked") {
          Alert.alert(
            "Account Locked",
            "Your account has been locked for security reasons. To unlock it, you must reset your password",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Unlock",
                isPreferred: true,
                onPress: async () => {
                  try{
                    await LoginAPI.requestNewPassword(email)
                    await navigationService.navigate("tempPassword", {email});
                    setCode("")
                  }
                  catch(e){
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
        }
        else if(data?.loginFailed == "incorrectOTP"){
          setShowBottomText(true)
          Toast.show('Invalid Code', {...styles.errorToast, duration: Toast.durations.LONG});
        }
        else if(data?.loginFailed == "expired"){
          setShowBottomText(true)
          Toast.show('Code has expired', {...styles.errorToast, duration: Toast.durations.LONG});
        }
        else if (data?.accessToken && data?.refreshToken) {
          await saveToken("accessToken", data.accessToken);
          await saveToken("refreshToken", data.refreshToken);
          const accessToken = await getAccessToken()
          const {status: userStatus, data: userData} = await UserAPI.getUser(accessToken)

          if (userData["isSetupComplete"]) {
            await navigationService.navigate("main");
            setCode("")
          } else {
            await navigationService.navigate("setup");
            setCode("")
          }
        }
        else {
          setShowBottomText(true)
          Toast.show("Something went wrong. Please try again later!", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
        }
      }
        else {
          setShowBottomText(true)
          Toast.show("Something went wrong. Please try again later!", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          //please wait 30 seconds before clicking resend email
      }
    }
    else{
      Toast.show('Invalid Code', {...styles.errorToast, duration: Toast.durations.LONG});
    }

  }

  const resendOTP = async () => {
    setShowResend(false)
    
    const { status, data } = await LoginAPI.requestOTP(email, password);

    setTimeout(() => {
      setShowResend(true)
    }, 30000);
  }

  function ResendMessage(){

    return(
      <View style={styles.errorContainer}>
          <ScribbledText style={styles.errorText}>Need a new code? </ScribbledText>
          <TouchableOpacity
              onPress={resendOTP}>
              <ScribbledText style={styles.resendOTPText}>Resend OTP</ScribbledText>
          </TouchableOpacity>
      </View>
    )
  }

  function LoadingMessage(){

    return(
      <View style={styles.errorContainer}>
          <ScribbledText style={styles.waitingText}>OTP sent! Please wait 30 seconds to send a new code. </ScribbledText>
      </View>
    )
};


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.view}>
        <View style={styles.center}>
          <Text style={styles.title}>
            Check your inbox for verification code
          </Text>
          <View style={styles.codeFields}>
            {[1, 2, 3, 4].map((item) => (
              <TextInput
                ref={(ref) => (codeRef.current[item - 1] = ref)}
                maxLength={1}
                keyboardType="number-pad"
                textContentType={"oneTimeCode"}
                style={styles.input}
                key={item}
                onKeyPress={({ nativeEvent }) => {
                  let Code = [...code];

                  if (Code[item - 1] && keys.includes(nativeEvent.key)) {
                    if (codeRef.current[item - 1]) {
                      Code[item - 1] = nativeEvent.key;
                      setCode(Code);
                      codeRef.current[item].focus();
                    }
                  }
                  if (nativeEvent.key === "Backspace" && item - 1 !== 0) {
                    if (!Code[item - 1]) {
                      codeRef.current[item - 2].focus();
                    }
                  }
                }}
                onChangeText={(text) => {
                  let Code = [...code];
                  if (text.length <= 1) {
                    Code[item - 1] = text;
                  }
                  if (text) {
                    if (codeRef.current[item]) {
                      codeRef.current[item].focus();
                    }
                  }
                  if (text && item - 1 === 3) {
                    codeRef.current[3].blur();
                  }
                  setCode(Code);
                }}
              />
            ))}
          </View>
          <ContinueButton onPress={() => onPressContinue()} />
          {showBottomText && (showResend ? <ResendMessage/> : <LoadingMessage/>)}
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
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
  resendOTPText: {
    color: "#25436B",
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  waitingText: {
    fontSize: 12,
    color: "#25436B",
  }
});

export default EnterCode;
