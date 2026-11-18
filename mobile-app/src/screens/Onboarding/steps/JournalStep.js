import React from "react";
import { Text, TextInput, View } from "react-native";
import { makeStyles, useOasisTheme } from "../../../theme";
import { PrimaryButton } from "../../../components/ui";
import StepLayout, {
  StepHeader,
  useStepLayout,
} from "../components/StepLayout";
import { copy } from "../copy";

// Journal moment (mock #screen-journal): the user's first entry, on their
// season's prompt. Saved as a guided_prompt entry (saveOnboarding). Leaving
// it empty saves nothing.
export default function JournalStep({
  prompt, // season.journalPrompt
  text,
  setText,
  progress,
  onBack,
  onNext,
  saving,
}) {
  return (
    <StepLayout
      progress={progress}
      onBack={onBack}
      footer={
        <PrimaryButton
          title={copy.continue}
          onPress={onNext}
          loading={saving}
        />
      }
    >
      <StepHeader
        label={copy.journal.label}
        question={copy.journal.question}
        hideWithKeyboard
      />
      <PromptBox prompt={prompt} text={text} setText={setText} />
    </StepLayout>
  );
}

// The pink box fills the rest of the screen and the writing area grows with
// it. While the keyboard is up it tightens to just the prompt and the text.
function PromptBox({ prompt, text, setText }) {
  const t = useOasisTheme();
  const styles = useStyles();
  const { compact, keyboard } = useStepLayout();
  const tight = compact || keyboard;

  return (
    <View style={[styles.box, tight && styles.boxTight]}>
      {!keyboard ? (
        <Text style={styles.boxLabel}>{copy.journal.boxLabel}</Text>
      ) : null}
      <Text style={[styles.prompt, tight && styles.promptTight]}>
        “{prompt}”
      </Text>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        placeholder={copy.journal.placeholder}
        placeholderTextColor={t.colors.textMuted}
        selectionColor={t.colors.text}
        accessibilityLabel={prompt}
        style={styles.input}
      />
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  box: {
    flex: 1,
    backgroundColor: t.onboarding.journalMoment,
    borderRadius: t.radius.xl,
    paddingVertical: 28,
    paddingHorizontal: t.sp.xxl,
    alignItems: "center",
  },
  boxTight: { paddingVertical: t.sp.lg, paddingHorizontal: t.sp.lg },
  boxLabel: {
    ...t.text.onboardingLabel,
    color: t.colors.textMuted,
    marginBottom: t.sp.md,
  },
  prompt: {
    ...t.text.firstEntryPrompt,
    color: t.colors.text,
    textAlign: "center",
    marginBottom: t.sp.xl,
  },
  promptTight: { marginBottom: t.sp.md },
  input: {
    ...t.text.input,
    lineHeight: 22,
    color: t.colors.text,
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.item,
    padding: t.sp.lg,
    paddingTop: t.sp.lg,
    flex: 1,
    minHeight: 80,
    width: "100%",
    textAlignVertical: "top",
  },
}));
