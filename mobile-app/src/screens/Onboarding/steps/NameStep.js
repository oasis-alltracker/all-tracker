import React from "react";
import { Text } from "react-native";
import { makeStyles } from "../../../theme";
import { PrimaryButton, TextField } from "../../../components/ui";
import StepLayout, { StepHeader } from "../components/StepLayout";
import { copy } from "../copy";

// Name step (approved 2026-11-15; not in the Phase 1 flow). Feeds the home
// greeting "Good morning, [Name]". Kept to one quiet field: Continue works
// without a name, and the greeting then leaves it out.
export const MAX_NAME_LENGTH = 50; // matches the backend's limit

export default function NameStep({ name, setName, progress, onNext }) {
  const styles = useStyles();
  return (
    <StepLayout
      progress={progress}
      footer={<PrimaryButton title={copy.continue} onPress={onNext} />}
    >
      <StepHeader label={copy.name.label} question={copy.name.question} />
      <TextField
        value={name}
        onChangeText={setName}
        placeholder={copy.name.placeholder}
        accessibilityLabel={copy.name.placeholder}
        autoCapitalize="words"
        autoComplete="given-name"
        textContentType="givenName"
        autoCorrect={false}
        maxLength={MAX_NAME_LENGTH}
        returnKeyType="next"
        onSubmitEditing={onNext}
      />
      <Text style={styles.helper}>{copy.name.helper}</Text>
    </StepLayout>
  );
}

const useStyles = makeStyles((t) => ({
  helper: {
    ...t.text.onboardingHelper,
    color: t.colors.textMuted,
    marginTop: t.sp.xl,
  },
}));
