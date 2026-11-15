import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { makeStyles, useOasisTheme } from "../../theme";
import PressableScale from "./PressableScale";

// PrimaryButton (DS-02): full-width dark button (design system "Primary Button").
//   title, onPress, disabled, loading, style
// Disabled/loading dims the button to 40% (not defined in the mocks).
export default function PrimaryButton({ title, onPress, disabled, loading, style }) {
  const t = useOasisTheme();
  const styles = useStyles();
  const inactive = disabled || loading;

  return (
    <PressableScale
      onPress={inactive ? undefined : onPress}
      accessibilityLabel={title}
      disabled={inactive}
      style={[styles.button, inactive && styles.inactive, style]}
    >
      {loading ? (
        <ActivityIndicator color={t.colors.onPrimary} />
      ) : (
        <Text style={styles.label}>{title}</Text>
      )}
    </PressableScale>
  );
}

const useStyles = makeStyles((t) => ({
  button: {
    width: "100%",
    backgroundColor: t.colors.primary,
    borderRadius: t.radius.lg,
    paddingVertical: 15,
    paddingHorizontal: t.sp.xxl,
    alignItems: "center",
    justifyContent: "center",
  },
  inactive: { opacity: 0.4 },
  label: { ...t.text.button, color: t.colors.onPrimary },
}));
