import React, { memo } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

const Button = (props) => {
  const _renderInnerText = () => {
    if (props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size="small"
          style={styles.spinner}
          color={props.activityIndicatorColor || "white"}
        />
      );
    }
    if (
      typeof props.children === "string" ||
      typeof props.children === "number"
    ) {
      return (
        <Text style={[styles.textStyle, props.textStyle]}>
          {props.children}
        </Text>
      );
    }
    return props.children;
  };

  if (props.isDisabled === true || props.isLoading === true) {
    return (
      <View
        style={[
          styles.button,
          props.style,
          props.disabledStyle || styles.opacity,
        ]}
      >
        {_renderInnerText()}
      </View>
    );
  }

  return (
    <TouchableOpacity {...props} style={[styles.button, props.style]}>
      {_renderInnerText()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(215, 246, 255, 0.65)",
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    paddingHorizontal: 10,
  },
  spinner: {
    alignSelf: "center",
  },
  opacity: {
    backgroundColor: "#F0EEF5",
  },
  textStyle: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "Sego",
    color: "#1C1B20",
  },
});

export default memo(Button);
