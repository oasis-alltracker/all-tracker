import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useTheme } from "dopenative";
import dynamicStyles from "./styles";
import ScribbledText from "../../../components/ScribbledText";
import LogoHeader from "../../../components/LogoHeader/LogoHeader";
import ContinueButton from "../../../components/ContinueButton/ContinueButton";
import OTPInput from "../../../components/OTPInput/OTPInput";
import { saveToken, getAccessToken } from "../../../user/keychain";
import LoginAPI from "../../../api/auth/loginAPI";
import UserAPI from "../../../api/user/userAPI";
import Toast from "react-native-root-toast";

export default function EnterPasswordScreen(props) {
  const { route, navigation } = props;
  const { email } = route.params;

  const [password, setPassword] = useState("");

  const { theme, appearance } = useTheme();
  const styles = dynamicStyles(theme, appearance);

  const onPressContinue = async () => {
    if (password.length > 0) {
      const { status, data } = await LoginAPI.requestOTP(email, password);
      if (status == 200) {
        if (data?.exists) {
          await props.navigation.navigate("OTP", {
            screen: "OTP",
            email,
          });
        } else {
          await props.navigation.navigate("CreatePassword", {
            screen: "CreatePassword",
            email,
          });
        }
      } else {
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.signupHeader}>
          <LogoHeader navigation={navigation} />
        </View>
        <View style={styles.signupContent}>
          <ScribbledText style={styles.title}>
            Enter your password
          </ScribbledText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9c9eb9"
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <ContinueButton onPress={() => onPressContinue()} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
