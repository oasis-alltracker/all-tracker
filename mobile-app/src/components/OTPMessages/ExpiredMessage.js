import React from "react";
import { View } from "react-native";
import ScribbledText from "../ScribbledText";
import dynamicStyles from "./styles";

export default function ExpiredMessage() {
  const styles = dynamicStyles();

  return (
    <View style={styles.errorContainer}>
      <ScribbledText style={styles.errorText}>OTP is experied. </ScribbledText>
      <TouchableOpacity onPress={resendOTP}>
        <ScribbledText style={styles.resendOTPText}>Resend OTP</ScribbledText>
      </TouchableOpacity>
    </View>
  );
}
