import React from "react";
import { TouchableOpacity, View } from "react-native";
import ScribbledText from "../ScribbledText";
import dynamicStyles from "./styles";
import { resendOTP } from "./resendOTP";

export default function ResendMessage({ email }) {
  const styles = dynamicStyles();

  return (
    <View style={styles.errorContainer}>
      <ScribbledText style={styles.errorText}>
        Need a new OTP code?{" "}
      </ScribbledText>
      <TouchableOpacity onPress={() => resendOTP(email)}>
        <ScribbledText style={styles.resendOTPText}>Resend OTP</ScribbledText>
      </TouchableOpacity>
    </View>
  );
}
