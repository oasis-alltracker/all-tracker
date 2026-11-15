import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { makeStyles } from "../../theme";

// HabitToggle (DS-02 addition): the 26px circle at the end of a binary habit
// row on the full Daily Practice screen. Source: oasis_design_system.html
// "Habit Toggle (Full View)" + oasis_foundations_full.html.
//
// Display-only by design: Master Spec §5 makes the WHOLE habit row the tap
// target, so the row handles the press and passes `done` here.
// Counted habits use the inline +/- counter instead (built with the habit row).
export default function HabitToggle({ done = false, style }) {
  const styles = useStyles();
  const scale = useSharedValue(1);

  // A small pop when a habit is marked done; none when it's undone.
  useEffect(() => {
    if (done) {
      scale.value = withSequence(
        withTiming(1.12, { duration: 110 }),
        withTiming(1, { duration: 140 }),
      );
    }
  }, [done, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.circle, done && styles.circleDone, animatedStyle, style]}>
      {done && <Text style={styles.check}>✓</Text>}
    </Animated.View>
  );
}

const useStyles = makeStyles((t) => ({
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  circleDone: {
    backgroundColor: t.colors.fulfilledBg,
    borderColor: t.colors.fulfilledBorder,
  },
  check: { ...t.text.habitToggleCheck, color: t.colors.fulfilledText },
}));
