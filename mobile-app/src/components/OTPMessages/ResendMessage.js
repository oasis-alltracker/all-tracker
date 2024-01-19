import React from "react";
import { View } from "react-native";
import ScribbledText from "../ScribbledText";
import dynamicStyles from "./styles";


export default function ResendMessage(){
    const styles = dynamicStyles();

    return(
      <View style={styles.errorContainer}>
          <ScribbledText style={styles.errorText}>Need a new OTP code? </ScribbledText>
          <TouchableOpacity
              onPress={resendOTP}>
              <ScribbledText style={styles.resendOTPText}>Resend OTP</ScribbledText>
          </TouchableOpacity>
      </View>
    )
}
