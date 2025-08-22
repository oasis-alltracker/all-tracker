import React, { useContext } from "react";
import { Switch, StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/ThemeProvider";
import { ValueSheet } from "../ValueSheet";

export default function ThemedSwitch(props) {
  const theme = useContext(ThemeContext).value;
  return (
    <Switch
      {...props}
      trackColor={styles["switchTrack_" + theme]}
      ios_backgroundColor={ValueSheet.colours[theme].purple65}
      thumbColor={
        props.value
          ? styles["switchThumbOn_" + theme]
          : styles["switchThumbOff_" + theme]
      }
    />
  );
}

const styles = StyleSheet.create({
  switchTrack_dark: {
    true: ValueSheet.colours.dark.secondaryColour65,
    false: ValueSheet.colours.dark.purple,
  },
  switchThumbOn_dark: ValueSheet.colours.dark.secondaryColour,
  switchThumbOff_dark: ValueSheet.colours.dark.purple,
  switchTrack_light: {
    true: ValueSheet.colours.light.secondaryColour27,
    false: ValueSheet.colours.light.purple65,
  },
  switchThumbOn_light: ValueSheet.colours.light.secondaryColour,
  switchThumbOff_light: ValueSheet.colours.light.purple,
});
