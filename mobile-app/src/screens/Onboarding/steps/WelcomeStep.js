import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { makeStyles, useOasisTheme } from "../../../theme";
import { PrimaryButton } from "../../../components/ui";
import { copy } from "../copy";

// O-01 Welcome (Phase 1 "Screen 4"; oasis_onboarding_flow.html #screen-welcome).
// Bridges the Terms screen's coldness into the warmth of what follows.
export default function WelcomeStep({ onNext }) {
  const t = useOasisTheme();
  const styles = useStyles();

  // The mark floats up and down 6pt over 4s, as in the mock.
  const float = useSharedValue(0);
  useEffect(() => {
    float.value = withRepeat(
      withTiming(-6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [float]);
  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  const [pink, lavender, yellow] = t.onboarding.orbs;
  const { mark } = t.onboarding;

  return (
    <View style={styles.screen}>
      {/* Blurred colour orbs. Radial gradients fade each one out to
          transparent; where unsupported they simply don't draw. */}
      <View style={styles.orbs} pointerEvents="none">
        <Orb color={pink} size={300} style={{ top: -80, left: -60 }} />
        <Orb color={lavender} size={250} style={{ bottom: 100, right: -60 }} />
        <Orb color={yellow} size={200} style={{ bottom: -40, left: 40 }} />
      </View>

      <SafeAreaView edges={["top", "bottom"]} style={styles.content}>
        <Animated.View style={[styles.mark, floatStyle]}>
          <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
            <Circle
              cx={18}
              cy={18}
              r={16}
              stroke={mark.fill}
              strokeWidth={1.5}
            />
            <Path
              d="M18 28 C18 28 10 22 10 16 C10 12 13.5 9 18 9 C22.5 9 26 12 26 16 C26 22 18 28 18 28Z"
              fill={mark.fill}
              stroke={mark.stroke}
              strokeWidth={1}
            />
            <Path
              d="M18 28 C18 28 13 21 13 16 C13 13.2 15.2 11 18 11"
              fill={mark.shade}
            />
            <Line
              x1={18}
              y1={28}
              x2={18}
              y2={32}
              stroke={mark.stroke}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </Svg>
        </Animated.View>

        <Text style={styles.wordmark} accessibilityRole="header">
          oasis
        </Text>

        <View style={styles.lines}>
          <Text style={styles.line1}>{copy.welcome.line1}</Text>
          <Text style={styles.line2}>{copy.welcome.line2}</Text>
          <Text style={styles.line3}>{copy.welcome.line3}</Text>
        </View>

        <PrimaryButton title={copy.welcome.button} onPress={onNext} />
      </SafeAreaView>
    </View>
  );
}

function Orb({ color, size, style }) {
  return (
    <View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          opacity: 0.5,
          experimental_backgroundImage: `radial-gradient(circle, ${color} 0%, ${color}00 70%)`,
        },
        style,
      ]}
    />
  );
}

const useStyles = makeStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.colors.background },
  orbs: { ...absoluteFill, overflow: "hidden" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  mark: {
    width: 72,
    height: 72,
    borderRadius: t.radius.xxl,
    backgroundColor: t.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: t.sp.xxxl,
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },
  wordmark: {
    ...t.text.welcomeWordmark,
    color: t.colors.text,
    marginBottom: t.sp.xxxl,
  },
  lines: { alignItems: "center", gap: t.sp.sm, marginBottom: 64 },
  line1: { ...t.text.welcomeLine1, color: t.colors.text, textAlign: "center" },
  line2: {
    ...t.text.welcomeLine2,
    color: t.colors.textMuted,
    textAlign: "center",
  },
  line3: {
    ...t.text.welcomeLine3,
    color: t.colors.textMuted,
    textAlign: "center",
    marginTop: t.sp.xs,
  },
}));

const absoluteFill = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
