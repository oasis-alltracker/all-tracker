import React, { useEffect } from "react";
import { Modal, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { makeStyles, universalCopy, useOasisTheme } from "../../theme";
import GradientFill from "./GradientFill";
import PrimaryButton from "./PrimaryButton";

// CompletionMoment (DS-02): the full-screen moment after saving a journal or
// fitness entry. Source: Master Spec §4 "Completion Moment", Fitness Spec,
// and the completion screens in the journal and fitness mocks.
//   cream gradient (160°) · green check that scales in · title ·
//   seasonal affirmation · optional recap · "Back to home"
//
//   visible      show / hide (fades)
//   title        primary copy, e.g. universalCopy.journalFulfilled
//   affirmation  the season's affirmation; null/undefined → omitted (most
//                seasons' copy isn't written yet)
//   children     optional recap block (the fitness workout summary)
//   onDone       "Back to home" and Android back
//
// Sizes follow the journal mock (decision 3, 2026-11-14: title 30, 1px check
// border). The affirmation is Cormorant italic as in the fitness mock: the
// spec says all seasonal copy is Cormorant italic, which overrides the
// journal mock's DM Sans body text.
export default function CompletionMoment({
  visible,
  title,
  affirmation,
  children,
  onDone,
}) {
  const t = useOasisTheme();
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);

  // Mock: scaleIn 0.4s from 0.6 / transparent, as the screen fades in.
  useEffect(() => {
    if (visible) {
      scale.value = 0.6;
      opacity.value = 0;
      scale.value = withDelay(150, withTiming(1, { duration: 400 }));
      opacity.value = withDelay(150, withTiming(1, { duration: 400 }));
    }
  }, [visible, scale, opacity]);

  const checkStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onDone}
    >
      <View style={styles.screen}>
        <GradientFill colors={t.gradients.completion} angle={160} style={styles.fill} />
        <View
          style={[
            styles.content,
            { paddingTop: insets.top, paddingBottom: insets.bottom + t.sp.xxl },
          ]}
        >
          <Animated.View style={[styles.check, checkStyle]}>
            <Text style={styles.checkMark}>✓</Text>
          </Animated.View>
          <Text style={styles.title} accessibilityRole="header">
            {title}
          </Text>
          {affirmation ? <Text style={styles.affirmation}>{affirmation}</Text> : null}
          {children ? <View style={styles.recap}>{children}</View> : null}
          <PrimaryButton
            title={universalCopy.backToHome}
            onPress={onDone}
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
}

const useStyles = makeStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.colors.background },
  fill: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  check: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: t.colors.fulfilledBg,
    borderWidth: 1,
    borderColor: t.colors.fulfilledBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  checkMark: { ...t.text.completionCheck, color: t.colors.fulfilledText },
  title: {
    ...t.text.completionTitle,
    color: t.colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  affirmation: {
    ...t.text.completionAffirmation,
    color: t.colors.textMuted,
    textAlign: "center",
    paddingHorizontal: t.sp.md,
  },
  recap: { alignSelf: "stretch", marginTop: 28 },
  button: { marginTop: 48, alignSelf: "stretch" },
}));
