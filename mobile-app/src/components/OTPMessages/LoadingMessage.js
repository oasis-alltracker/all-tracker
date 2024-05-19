import React from "react";
import { View } from "react-native";
import ScribbledText from "../ScribbledText";
import dynamicStyles from "./styles";

export default function LoadingMessage() {
  const styles = dynamicStyles();

  return (
    <View style={styles.errorContainer}>
      <ScribbledText style={styles.waitingText}>
        OTP sent! Please wait 30 seconds to send a new code.{" "}
      </ScribbledText>
    </View>
  );
}
