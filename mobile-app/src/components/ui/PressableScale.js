import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Shared tap feedback: shrinks slightly while pressed (Master Spec §1:
// "cards respond to tap with subtle scale transform (0.988)"). No chevrons,
// no opacity flash. With no onPress/onLongPress it renders a plain view.
//
// `style` lands on the outermost element so layout props (flex, width,
// alignSelf, margins) behave exactly as on a plain View, e.g. two cards with
// flex: 1 in a row share it evenly and stretch to the same height.
export const PRESS_SCALE = 0.988;
const DURATION_MS = 150;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PressableScale({
  onPress,
  onLongPress,
  scaleTo = PRESS_SCALE,
  disabled,
  style,
  accessibilityLabel,
  accessibilityRole = "button",
  accessibilityState,
  hitSlop,
  children,
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!onPress && !onLongPress) {
    return <Animated.View style={style}>{children}</Animated.View>;
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      hitSlop={hitSlop}
      onPressIn={() => {
        scale.value = withTiming(scaleTo, { duration: DURATION_MS });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: DURATION_MS });
      }}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ ...accessibilityState, disabled: !!disabled }}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedPressable>
  );
}
