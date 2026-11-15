import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { makeStyles, useOasisTheme } from "../../theme";

// PageDots (DS-02): pager indicator. 6px dots; the active one stretches into a
// 20px pill in the text colour (Master Spec §1).
//   count        number of pages (2 for every section at relaunch)
//   activeIndex  current page, 0-based
const DOT = 6;
const ACTIVE_WIDTH = 20;
const DURATION_MS = 250;

export default function PageDots({ count = 2, activeIndex = 0, style }) {
  const styles = useStyles();
  return (
    <View
      style={[styles.row, style]}
      accessibilityRole="adjustable"
      accessibilityLabel={`Page ${activeIndex + 1} of ${count}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} active={i === activeIndex} />
      ))}
    </View>
  );
}

function Dot({ active }) {
  const t = useOasisTheme();
  const inactiveColor = t.colors.border;
  const activeColor = t.colors.text;
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: DURATION_MS });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: DOT + (ACTIVE_WIDTH - DOT) * progress.value,
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveColor, activeColor],
    ),
  }));

  return <Animated.View style={[{ height: DOT, borderRadius: DOT / 2 }, animatedStyle]} />;
}

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: DOT,
  },
}));
