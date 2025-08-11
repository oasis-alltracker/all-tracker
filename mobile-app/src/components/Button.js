import React, { memo } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { ValueSheet } from "../ValueSheet";

const Button = (props) => {
  const _renderInnerText = () => {
    if (props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size="small"
          style={styles.spinner}
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
      <View style={[styles.button, props.style, props.style || styles.opacity]}>
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
    backgroundColor: ValueSheet.colours.secondaryColour65,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: ValueSheet.colours.borderGrey75,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  spinner: {
    alignSelf: "center",
  },
  opacity: {
    backgroundColor: ValueSheet.colours.background,
  },
  textStyle: {
    fontSize: 26,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
});

export default memo(Button);
