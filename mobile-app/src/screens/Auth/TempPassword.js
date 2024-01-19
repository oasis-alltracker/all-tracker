import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import { ContinueButton, Header } from "../../components";
import navigationService from "../../navigators/navigationService";
import LoginAPI from "../../api/auth/loginAPI";
import Toast from "react-native-root-toast";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const EnterPassword = (props) => {
  const [tempPassword, setTempPassword] = useState("");
  const { email } = props.route.params;

  const onPressContinue = async () => {
    if (tempPassword.length > 0) {

      const { status, data } = await LoginAPI.verifyTempPassword(email, tempPassword);

      
      if (status == 200) {
        if (data?.requestNewTempPassword == false) {
          if(data.passwordMatch){
            await navigationService.navigate("createPassword", {
              email, tempPassword
            });
            setTempPassword("")
          }
          else {
            Toast.show("Incorrect password. Please try again.", {
              ...styles.errorToast,
              duration: Toast.durations.LONG,
            });
          }
        }
        else {
          await navigationService.navigate("auth")
          setTempPassword("")
        }
      }
      else{
        Toast.show("Something went wrong. Please try again", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      }
    }
    else {
      Toast.show("Please enter a password.", {
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
          <Text style={styles.title}>Check your inbox for password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={true}
              placeholderTextColor="#9c9eb9"
              onChangeText={setTempPassword}
              value={tempPassword}
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
    marginVertical: 20,
    textAlign: "center",
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
  buttonText: {
    color: "#25436B",
    fontSize: 28,
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
    marginBottom: 40,
    padding: 5,
    width: SCREEN_WIDTH - 50,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 2,
    backgroundColor: "white",
    alignSelf: "center",
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});

export default EnterPassword;
