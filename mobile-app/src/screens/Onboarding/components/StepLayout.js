import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { makeStyles } from "../../../theme";

// Frame shared by the onboarding steps (oasis_onboarding_flow.html): thin
// progress bar, muted "←" back, content, footer buttons pinned to the bottom
// and kept above the keyboard.
//
// Steps are designed to fit without scrolling (decided 2026-11-16):
//   · `compact`: tighter spacing. On from the start on short screens (iPhone
//     SE class); on any other phone it switches on the first time the step's
//     content is measured taller than the space (e.g. the season list on an
//     iPhone 13), and stays on so the layout can't flip back and forth
//   · while the keyboard is up, headers drop their label and guidance
//     (`keyboard`), so the field and Continue stay in view
//   · only if a step still can't fit once compact (very large accessibility
//     text, the longest copy on the smallest phones) does it quietly scroll
//     instead of cutting content off.
//
//   progress                 0–1 fill of the bar
//   onBack                   omit to hide the arrow (its space is kept so content doesn't jump)
//   footer                   the step's buttons
//   keyboardFooter           buttons to show instead of `footer` while the keyboard is up
//                            (tasks: "Done" closes the keyboard, then Continue returns)
//   children                 nodes, or ({ compact, keyboard }) => nodes
const SHORT_SCREEN_HEIGHT = 740;

const StepLayoutContext = createContext({ compact: false, keyboard: false });

// { compact, keyboard } for components rendered inside StepLayout.
export function useStepLayout() {
  return useContext(StepLayoutContext);
}

function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // iOS "will" events let the layout change in step with the keyboard.
    const show = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hide = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const subs = [
      Keyboard.addListener(show, () => setVisible(true)),
      Keyboard.addListener(hide, () => setVisible(false)),
    ];
    return () => subs.forEach((s) => s.remove());
  }, []);
  return visible;
}

export default function StepLayout({
  progress,
  onBack,
  footer,
  keyboardFooter,
  children,
}) {
  const styles = useStyles();
  const short = useWindowDimensions().height < SHORT_SCREEN_HEIGHT;
  const keyboard = useKeyboardVisible();

  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const overflows = viewportHeight > 0 && contentHeight > viewportHeight + 1;

  // Latch compact on the first real overflow. Ignored while the keyboard is
  // up, since the keyboard (not the content) is what shrinks the space then.
  const [overflowed, setOverflowed] = useState(false);
  useEffect(() => {
    if (overflows && !keyboard && !overflowed) setOverflowed(true);
  }, [overflows, keyboard, overflowed]);
  const compact = short || overflowed;

  const layout = { compact, keyboard };
  const shownFooter = keyboard && keyboardFooter ? keyboardFooter : footer;

  return (
    <StepLayoutContext.Provider value={layout}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.screen}>
        <View style={styles.track}>
          <View
            style={[styles.fill, { width: `${Math.round(progress * 100)}%` }]}
          />
        </View>
        <View style={[styles.backRow, compact && styles.backRowShort]}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Back"
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.back}>←</Text>
            </Pressable>
          ) : null}
        </View>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.content}
            scrollEnabled={overflows}
            bounces={false}
            showsVerticalScrollIndicator={overflows}
            keyboardShouldPersistTaps="handled"
            onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
            onContentSizeChange={(w, h) => setContentHeight(h)}
          >
            {typeof children === "function" ? children(layout) : children}
          </ScrollView>
          {shownFooter ? (
            <View style={[styles.footer, compact && styles.footerShort]}>
              {shownFooter}
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StepLayoutContext.Provider>
  );
}

// Label, serif question and optional guidance note at the top of a step.
// While the keyboard is up the label and guidance step aside; with
// `hideWithKeyboard` the whole header does (the journal's writing focus).
export function StepHeader({
  label,
  question,
  guidance,
  hideWithKeyboard = false,
}) {
  const styles = useStyles();
  const { compact, keyboard } = useStepLayout();
  if (keyboard && hideWithKeyboard) return null;

  return (
    <View style={[styles.header, (compact || keyboard) && styles.headerTight]}>
      {label && !keyboard ? <Text style={styles.label}>{label}</Text> : null}
      <Text style={styles.question} accessibilityRole="header">
        {question}
      </Text>
      {guidance && !keyboard ? (
        <Text style={[styles.guidance, compact && styles.guidanceShort]}>
          {guidance}
        </Text>
      ) : null}
    </View>
  );
}

const PAD_H = 28; // the mock's screen gutter

const useStyles = makeStyles((t) => ({
  screen: { flex: 1, backgroundColor: t.colors.background },
  flex: { flex: 1 },
  track: {
    marginTop: t.sp.lg,
    marginHorizontal: PAD_H,
    height: 3,
    borderRadius: 2,
    backgroundColor: t.colors.border,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 2, backgroundColor: t.colors.text },
  backRow: {
    height: 44,
    paddingTop: t.sp.lg,
    paddingHorizontal: PAD_H,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backRowShort: { height: 36, paddingTop: t.sp.sm },
  back: { ...t.text.navBack, color: t.colors.textMuted },
  pressed: { opacity: 0.5 },
  // flexGrow lets a step fill the screen (e.g. the journal box) when it fits.
  content: { flexGrow: 1, paddingHorizontal: PAD_H, paddingBottom: t.sp.lg },
  footer: {
    paddingHorizontal: PAD_H,
    paddingTop: t.sp.sm,
    paddingBottom: t.sp.lg,
  },
  footerShort: { paddingBottom: t.sp.sm },
  header: { paddingTop: t.sp.xxl, marginBottom: t.sp.xxl },
  headerTight: { paddingTop: t.sp.sm, marginBottom: t.sp.lg },
  label: {
    ...t.text.onboardingLabel,
    color: t.colors.textMuted,
    marginBottom: t.sp.sm,
  },
  question: {
    ...t.text.onboardingQuestion,
    color: t.colors.text,
    marginBottom: t.sp.md,
  },
  guidance: {
    ...t.text.onboardingGuidance,
    color: t.colors.textMuted,
    backgroundColor: t.colors.surfaceWarm,
    borderRadius: t.radius.md,
    paddingVertical: t.sp.md,
    paddingHorizontal: 14,
  },
  guidanceShort: { paddingVertical: t.sp.sm },
}));
