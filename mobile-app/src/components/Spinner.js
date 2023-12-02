import React from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

const Spinner = (props) => {
  if (props.processing)
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator color={props.color} animating size={props.size} />
      </View>
    );
  else return null;
};
Spinner.propTypes = {
  processing: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(["small", "large"]),
};
Spinner.defaultProps = {
  processing: false,
  color: "#fff",
  size: "small",
};
export default Spinner;

const styles = StyleSheet.create({
  spinnerWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
});
