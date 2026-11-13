import React from "react";
import { TouchableOpacity, View } from "react-native";
import ScribbledText from "../ScribbledText";
import dynamicStyles from "./styles";
import { resendOTP } from "./resendOTP";

export default function ExpiredMessage({ email }) {
  const styles = dynamicStyles();

  return (
    <View style={styles.errorContainer}>
      <ScribbledText style={styles.errorText}>OTP is experied. </ScribbledText>
      <TouchableOpacity onPress={() => resendOTP(email)}>
        <ScribbledText style={styles.resendOTPText}>Resend OTP</ScribbledText>
      </TouchableOpacity>
    </View>
  );
}
