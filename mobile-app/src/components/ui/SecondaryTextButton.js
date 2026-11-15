import React from "react";
import { Text } from "react-native";
import { makeStyles } from "../../theme";
import PressableScale from "./PressableScale";

// SecondaryTextButton (DS-02): quiet muted text action, usually under a
// PrimaryButton (e.g. "Skip", "Not now"). From the fitness mock's .secondary-btn.
export default function SecondaryTextButton({ title, onPress, disabled, style }) {
  const styles = useStyles();
  return (
    <PressableScale
      onPress={disabled ? undefined : onPress}
      accessibilityLabel={title}
      disabled={disabled}
      style={[styles.button, disabled && styles.inactive, style]}
    >
      <Text style={styles.label}>{title}</Text>
    </PressableScale>
  );
}

const useStyles = makeStyles((t) => ({
  button: {
    alignSelf: "center",
    padding: 10,
    // Keep the touch target comfortable even though the text is small.
    minHeight: 44,
    justifyContent: "center",
  },
  inactive: { opacity: 0.4 },
  label: { ...t.text.buttonSecondary, color: t.colors.textMuted, textAlign: "center" },
}));
