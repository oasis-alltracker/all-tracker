import React, { memo, useContext } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { ValueSheet } from "../ValueSheet";
import { sharedStyles } from "../screens/styles";
import { ThemeContext } from "../contexts/ThemeProvider";

const Button = (props) => {
  const theme = useContext(ThemeContext).value;
  var positiveSelect = props?.positiveSelect || false;

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
      if (positiveSelect) {
        return (
          <Text
            style={[
              styles.textStyle,
              sharedStyles["textColour_light"],
              props.textStyle,
            ]}
          >
            {props.children}
          </Text>
        );
      } else {
        return (
          <Text
            style={[
              styles.textStyle,
              sharedStyles["textColour_" + theme],
              props.textStyle,
            ]}
          >
            {props.children}
          </Text>
        );
      }
    }
    return props.children;
  };

  if (props.isDisabled === true || props.isLoading === true) {
    return (
      <View
        style={[
          styles.button,
          sharedStyles["button_" + theme],
          props.style,
          props.style || sharedStyles["pageBackground_" + theme],
        ]}
      >
        {_renderInnerText()}
      </View>
    );
  }

  if (positiveSelect) {
    return (
      <TouchableOpacity
        {...props}
        style={[styles.button, sharedStyles["button_" + theme], props.style]}
      >
        {_renderInnerText()}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        {...props}
        style={[
          styles.button,
          sharedStyles["borderedContainer_" + theme],
          props.style,
        ]}
      >
        {_renderInnerText()}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  spinner: {
    alignSelf: "center",
  },
  textStyle: {
    fontSize: 26,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
});

export default memo(Button);
