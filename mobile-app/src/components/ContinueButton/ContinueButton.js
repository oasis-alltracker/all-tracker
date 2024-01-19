import React, { useState } from "react";
import {
  TouchableHighlight,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import dynamicStyles from "./styles";
import ScribbledText from "../ScribbledText";

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export default function ContinueButton({ onPress, title }) {
  const styles = dynamicStyles();
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = async () => {
    setIsLoading(true);
    await triggerProp();
  };

  triggerProp = async () => {
    await timeout(0); // Having a timeout of 0 forces the component to rerender
    await onPress();
    setIsLoading(false);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  return (
    <View>
      <TouchableHighlight
        onPress={setLoading}
        disabled={isLoading}
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.btnContainer, isLoading && { opacity: 0.5 }]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <ActivityIndicator animating={isLoading} />
          <ScribbledText style={styles.btnText}>
            {title || "Continue"}
          </ScribbledText>
        </View>
      </TouchableHighlight>
    </View>
  );
}
