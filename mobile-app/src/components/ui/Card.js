import React from "react";
import { StyleSheet, View } from "react-native";
import { makeStyles, useOasisTheme } from "../../theme";
import GradientFill from "./GradientFill";
import PressableScale from "./PressableScale";

// Card (DS-02). Master Spec §1 card system.
//   variant   "primary" (22px radius, home cards) | "secondary" (16px)
//   gradient  key from theme gradients ("journal", "fitness", …) or a two-colour
//             array (e.g. t.practiceGradients[season]); omit for a plain white card
//   onPress / onLongPress   make it tappable with the 0.988 scale feedback
//   style         outer box (margins, flex, width)
//   contentStyle  inner padding/layout overrides
//
// Structure: an outer view carries the shadow, and an inner view clips the
// gradient to the rounded corners. Keeping them separate stops the clipping
// from also cutting off the shadow.
export default function Card({
  variant = "primary",
  gradient,
  onPress,
  onLongPress,
  accessibilityLabel,
  style,
  contentStyle,
  children,
}) {
  const t = useOasisTheme();
  const styles = useStyles();
  const isPrimary = variant === "primary";
  const radiusStyle = { borderRadius: isPrimary ? t.radius.xxl : t.radius.lg };
  const colors = Array.isArray(gradient)
    ? gradient
    : gradient
      ? t.gradients[gradient]
      : null;

  if (__DEV__ && gradient && !colors) {
    console.warn(`[Card] Unknown gradient "${gradient}"`);
  }

  return (
    <PressableScale
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityLabel={accessibilityLabel}
      style={[isPrimary ? styles.shadow : null, radiusStyle, style]}
    >
      <View style={[styles.clip, radiusStyle, !colors && styles.plain]}>
        {colors ? (
          <GradientFill colors={colors} style={StyleSheet.absoluteFill} />
        ) : null}
        <View style={[isPrimary ? styles.primaryPad : styles.secondaryPad, contentStyle]}>
          {children}
        </View>
      </View>
    </PressableScale>
  );
}

const useStyles = makeStyles((t) => ({
  shadow: { ...t.shadow.card },
  // flexGrow lets the background fill the card when a row stretches it taller
  // than its own content (Nutrition | Fitness side by side).
  clip: { overflow: "hidden", flexGrow: 1 },
  plain: { backgroundColor: t.colors.surface },
  // Home mock: 16px 18px.
  primaryPad: { paddingVertical: t.sp.lg, paddingHorizontal: 18 },
  secondaryPad: { padding: 14 }, // mocks use 13–14px on secondary cards
}));
