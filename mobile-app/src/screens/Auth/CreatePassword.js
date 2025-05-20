import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Header } from "../../components";
import Toast from "react-native-root-toast";
import navigationService from "../../navigators/navigationService";
import LoginAPI from "../../api/auth/loginAPI";
import Spinner from "react-native-loading-spinner-overlay";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const CreatePassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { email, tempPassword } = props.route.params;

  const onPressContinue = async () => {
    setIsLoading(true);
    if (password.length > 0) {
      if (password === passwordCopy) {
        if (tempPassword) {
          var { status, data } = await LoginAPI.createNewPassword(
            email,
            tempPassword,
            password
          );
          if (status == 200) {
            if (!data || data?.loginFailed) {
              setIsLoading(false);
              await navigationService.navigate("auth");
              setPassword("");
              setPasswordCopy("");
            }
            var { status, data } = await LoginAPI.requestOTP(email, password);

            if (status == 200 && data) {
              if (data.isCorrectPassword) {
                setIsLoading(false);
                navigationService.navigate("enterCode", { email, password });
                setPassword("");
                setPasswordCopy("");
              }
            } else {
              setIsLoading(false);
              Toast.show("Something went wrong. Please try again.", {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
              });
            }
          } else {
            setIsLoading(false);
            Toast.show("Something went wrong. Please try again.", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            });
          }
        } else {
          const { status, data } = await LoginAPI.requestOTP(email, password);

          if (status == 200) {
            if (data.isCorrectPassword) {
              setIsLoading(false);
              navigationService.navigate("enterCode", { email, password });
              setPassword("");
              setPasswordCopy("");
            } else {
              setIsLoading(false);
              Toast.show(
                "You have already created a password. Please return to main login page.",
                {
                  ...styles.errorToast,
                  duration: Toast.durations.LONG,
                  position: Toast.positions.CENTER,
                }
              );
            }
          } else {
            setIsLoading(false);
            Toast.show("Something went wrong. Please try again.", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.CENTER,
            });
          }
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
    <View style={styles.container}>
      <Header />
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
});

export default CreatePassword;
