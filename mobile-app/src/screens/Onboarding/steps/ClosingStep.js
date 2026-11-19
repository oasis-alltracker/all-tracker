import React from "react";
import { Text, View } from "react-native";
import { makeStyles } from "../../../theme";
import { PrimaryButton } from "../../../components/ui";
import StepLayout from "../components/StepLayout";
import { copy, seasonLine, waitingLine } from "../copy";

// Closing screen (mock #screen-closing). Everything is already saved by the
// time this shows, so it's a calm arrival, not a confirmation step. The
// "also" box warmly defers the sections this season's setup skipped
// (per-season copy in theme/seasons.js).
export default function ClosingStep({ season, saved, progress, onDone }) {
  const styles = useStyles();
  const waiting = waitingLine(saved);
  const line = seasonLine(season.name);

  return (
    <StepLayout
      progress={progress}
      footer={<PrimaryButton title={copy.closing.button} onPress={onDone} />}
    >
      {({ compact }) => (
        <View style={[styles.content, compact && styles.contentShort]}>
          <View style={styles.check}>
            <Text style={styles.emoji}>{season.emoji}</Text>
          </View>
          <Text style={styles.title} accessibilityRole="header">
            {copy.closing.title}
          </Text>
          <Text style={styles.body}>
            {line.before}
            <Text style={styles.strong}>{line.name}</Text>
            {line.after}
            {waiting ? `\n${waiting}` : ""}
          </Text>
          <View style={styles.also}>
            <Text style={styles.alsoLabel}>{copy.closing.alsoLabel}</Text>
            <Text style={styles.alsoText}>{season.onboarding.closingAlso}</Text>
          </View>
        </View>
      )}
    </StepLayout>
  );
}

const useStyles = makeStyles((t) => ({
  // Centred in the space above the button, as in the mock.
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: t.sp.xxl,
  },
  contentShort: { paddingVertical: t.sp.sm },
  check: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: t.colors.fulfilledBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  emoji: { ...t.text.seasonEmoji, fontSize: 32 },
  title: {
    ...t.text.completionTitle,
    color: t.colors.text,
    textAlign: "center",
    marginBottom: t.sp.md,
  },
  body: {
    ...t.text.closingBody,
    color: t.colors.textMuted,
    textAlign: "center",
    marginBottom: t.sp.xxxl,
  },
  strong: { fontFamily: t.fonts.sansMedium, color: t.colors.text },
  also: {
    alignSelf: "stretch",
    backgroundColor: t.colors.surfaceWarm,
    borderRadius: t.radius.lg,
    paddingVertical: t.sp.lg,
    paddingHorizontal: t.sp.xl,
  },
  alsoLabel: {
    ...t.text.closingAlsoLabel,
    color: t.colors.text,
    marginBottom: t.sp.xs,
  },
  alsoText: { ...t.text.closingAlso, color: t.colors.textMuted },
}));
