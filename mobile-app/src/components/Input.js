import { View, TextInput, StyleSheet, Text } from "react-native";
import React, { memo } from "react";

const Input = (props) => {
  return (
    <>
      {props.title ? (
        <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
      ) : null}
      <View style={[styles.wrapper, props.wrapper]}>
        <TextInput
          placeholderTextColor={"rgba(21, 21, 24, 0.3)"}
          {...props}
          style={[styles.input, props.input]}
        />
        {props.showRight && props.rightComponent}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },
  input: {
    flex: 1,
    fontFamily: "Sego",
    paddingHorizontal: 15,
    textAlign: "center",
    fontSize: 22,
  },
  title: {
    color: "#151518",
    fontSize: 13,
    fontFamily: "Sego-Bold",
    marginBottom: 5,
  },
});

Input.defaultProps = {
  showRight: false,
  title: null,
  titleStyle: {},
};

export default memo(Input);
