import React, { useContext } from "react";
import { Switch } from "react-native";
import { ThemeContext } from "../contexts/ThemeProvider";
import { sharedStyles } from "../screens/styles";
import { ValueSheet } from "../ValueSheet";

export default function ThemedSwitch(props) {
  const theme = useContext(ThemeContext).value;
  return (
    <Switch
      {...props}
      trackColor={sharedStyles["switchTrack_" + theme]}
      ios_backgroundColor={ValueSheet.colours[theme].purple65}
      thumbColor={
        props.value
          ? sharedStyles["switchThumbOn_" + theme]
          : sharedStyles["switchThumbOff_" + theme]
      }
    />
  );
}
