import React from "react";
import { View } from "react-native";
import { makeStyles } from "../../theme";
import PressableScale from "./PressableScale";

// AddButton (DS-02 addition): the 32px dark "+" circle at the top right of
// Daily Practice and Nutrition (.add-circle in the foundations / nutrition
// mocks). The plus is drawn with two bars rather than a "+" character so it
// sits exactly in the centre on both platforms.
//   accessibilityLabel  say what it adds, e.g. "Add task"
export default function AddButton({ onPress, accessibilityLabel = "Add", style }) {
  const styles = useStyles();
  return (
    <PressableScale
      onPress={onPress}
      scaleTo={0.92}
      accessibilityLabel={accessibilityLabel}
      hitSlop={6}
      style={[styles.circle, style]}
    >
      <View style={styles.barH} />
      <View style={styles.barV} />
    </PressableScale>
  );
}

const useStyles = makeStyles((t) => ({
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: t.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  barH: {
    position: "absolute",
    width: 12,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: t.colors.onPrimary,
  },
  barV: {
    position: "absolute",
    width: 1.5,
    height: 12,
    borderRadius: 1,
    backgroundColor: t.colors.onPrimary,
  },
}));
