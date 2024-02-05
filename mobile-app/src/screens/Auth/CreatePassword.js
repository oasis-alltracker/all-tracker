
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";
import { ContinueButton, Header } from "../../components";
import Toast from "react-native-root-toast";
import navigationService from "../../navigators/navigationService";
import LoginAPI from "../../api/auth/loginAPI";


const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const CreatePassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");

  const { email, tempPassword} = props.route.params;

  const onPressContinue = async () => {
    if (password.length > 0) {
      if (password === passwordCopy) {
        
        if(tempPassword) {
          var { status, data } = await LoginAPI.createNewPassword(email, tempPassword, password);
          if (status == 200) {
            
            var { status, data } = await LoginAPI.requestOTP(email, password);

            if (status == 200 && data) {
              if(data.isCorrectPassword){
                navigationService.navigate("enterCode", {email, password})
                setPassword("")
                setPasswordCopy("")
              }
            }
            else {
              Toast.show("Something went wrong. Please try again.", {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
              });
            }

          } else {
            Toast.show("Something went wrong. Please try again.", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            });
          }
        }
        else { 
          const { status, data } = await LoginAPI.requestOTP(email, password);

          if (status == 200) {
            if(data.isCorrectPassword){
              navigationService.navigate("enterCode", {email, password})
              setPassword("")
              setPasswordCopy("")
            }
            else{
              Toast.show("You have already created a password. Please return to main login page.", {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
              });
            }
  
          } else {
            Toast.show("Something went wrong. Please try again.", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.CENTER,
            });
          }
        }
      }
      else {
        Toast.show("Passwords do no match.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    }
    else {
      Toast.show("Please enter a password.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Header />
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
          <View style={[styles.passwordInputContainer, {marginBottom: 40}]}>
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
          <ContinueButton onPress={() => onPressContinue()} />
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
    fontSize: 24,
    fontFamily: "Sego-Bold",
    marginVertical: 30,
  },
  passwordInput: {
    color: "black",
    fontSize: 22,
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
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});

export default CreatePassword;
