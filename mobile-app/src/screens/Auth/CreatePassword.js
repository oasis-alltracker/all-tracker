
import { useEffect, useState } from "react";import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ContinueButton, Header, Input } from "../../components";
import Toast from "react-native-root-toast";
import navigationService from "../../navigators/navigationService";
import LoginAPI from "../../api/auth/loginAPI";

const CreatePassword = (props) => {
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");

  const { email, tempPassword} = props.route.params;


  const onPressContinue = async () => {
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
          navigationService.navigate("enterCode", {email, password})
          setPassword("")
          setPasswordCopy("")
        } else {
          Toast.show("Something went wrong. Please try again.", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          });
        }
      }
    } else {
      Toast.show("Passwords do no match.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.view}>
        <View style={styles.center}>
          <Text style={styles.title}>Create a password</Text>
          <Input
            input={styles.input}
            secureTextEntry={true}
            type="password"
            name="password"
            autoCapitalize="none"
            placeholder="Enter your password"
            onChangeText={setPassword}
          />
          <Input
            input={styles.input}
            secureTextEntry={true}
            type="password"
            autoCapitalize="none"
            placeholder="Re-enter your password"
            onChangeText={setPasswordCopy}
          />
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
  input: {
    color: "#25436B",
    fontSize: 20,
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
