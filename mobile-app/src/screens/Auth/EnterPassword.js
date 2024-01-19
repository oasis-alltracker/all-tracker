import { Alert, View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ContinueButton, Header } from "../../components";
import navigationService from "../../navigators/navigationService";
import LoginAPI from "../../api/auth/loginAPI";
import Toast from "react-native-root-toast";
import { logout } from "../../user/keychain";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const EnterPassword = (props) => {
  const [password, setPassword] = useState("");

  const { email } = props.route.params;

  const forgotPassword = async () => {
    Alert.alert(
      "Reset Password",
      "Are you sure you would like to reset your password?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          isPreferred: true,
          onPress: async () => {
            try{
              await LoginAPI.requestNewPassword(email)
              await navigationService.navigate("tempPassword" , {
                email
              });
              setPassword("")
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

  const onPressContinue = async () => {
    if (password.length > 0) {
      const { status, data } = await LoginAPI.requestOTP(email, password);

      if (status == 200 && data) {
        if(data.isCorrectPassword){
          navigationService.navigate("enterCode", { email, password });
          setPassword("")
        }
        else if(data.isAccountLocked) {
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
                    setPassword("")
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
        else{
          Toast.show("Password is incorrect. Please try again.", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
          });
        }
      }
      else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      }
    } else {
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
          <Text style={styles.title}>Enter your password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={true}
              placeholderTextColor="#9c9eb9"
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <ContinueButton onPress={() => onPressContinue()} />
          <TouchableOpacity style={styles.linkBtn } onPress={() => forgotPassword()}>
            <Text style={styles.linkText}>
             Lost you password?
            </Text>
          </TouchableOpacity>
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
  linkBtn: {
    marginVertical: 10,
    marginTop: 350,
    paddingBottom: 10
  },
  linkText: {
    fontSize: 18,
    fontFamily: "Sego",
    marginVertical: 5,
    color: "#25436B",
  },
  
});

export default EnterPassword;
