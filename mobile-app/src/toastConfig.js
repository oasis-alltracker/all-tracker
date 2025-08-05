import Toast, { BaseToast } from "react-native-toast-message";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ValueSheet } from "./ValueSheet";

export const toastConfig = {
  noAnimationToast: (props) => (
    <View>
      <View style={styles.toastContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.text1}>{props.text1}</Text>
        </View>
      </View>
    </View>
  ),
};

//the majority of this styling comes from the react-native-toast-message base toast styling
//copied to set up the base look of the custom toast
export const HEIGHT = 60;
export const WIDTH = 340;
export const BORDER_RADIUS = 6;

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    height: HEIGHT,
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: BORDER_RADIUS,
    elevation: 2,
    backgroundColor: ValueSheet.colours.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: ValueSheet.colours.black,
    width: "100%",
  },
});
