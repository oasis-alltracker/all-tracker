import React from "react";
import { Text, View } from "react-native";
import { SEASON_KEYS, getSeason, makeStyles } from "../../../theme";
import { PressableScale, PrimaryButton } from "../../../components/ui";
import StepLayout, { StepHeader } from "../components/StepLayout";
import { copy } from "../copy";

// O-02 Season selection (Phase 1 "Screen 5"; mock #screen-season).
// The most important onboarding screen: an intention, not a feature choice.
// Continue stays disabled until a season is picked.
export default function SeasonStep({
  season,
  setSeason,
  progress,
  onBack,
  onNext,
}) {
  const styles = useStyles();

  return (
    <StepLayout
      progress={progress}
      onBack={onBack}
      footer={
        <PrimaryButton
          title={copy.continue}
          onPress={onNext}
          disabled={!season}
        />
      }
    >
      {({ compact }) => (
        <>
          <StepHeader question={copy.season.question} />
          <View
            style={[styles.cards, compact && styles.cardsShort]}
            accessibilityRole="radiogroup"
          >
            {SEASON_KEYS.map((key) => {
              const s = getSeason(key);
              const selected = key === season;
              return (
                <PressableScale
                  key={key}
                  onPress={() => setSeason(key)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  accessibilityLabel={`${s.name}. ${s.onboarding.description}`}
                  style={[
                    styles.card,
                    compact && styles.cardShort,
                    selected && styles.cardSelected,
                  ]}
                >
                  <Text style={styles.emoji}>{s.emoji}</Text>
                  <View style={styles.info}>
                    <Text style={styles.name}>{s.name}</Text>
                    <Text style={styles.desc}>{s.onboarding.description}</Text>
                  </View>
                  <View
                    style={[styles.check, selected && styles.checkSelected]}
                  >
                    {selected ? <View style={styles.checkDot} /> : null}
                  </View>
                </PressableScale>
              );
            })}
          </View>
        </>
      )}
    </StepLayout>
  );
}

const useStyles = makeStyles((t) => ({
  cards: { gap: t.sp.md },
  cardsShort: { gap: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.sp.lg,
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.xl,
    borderWidth: 2,
    borderColor: "transparent",
    paddingVertical: 18,
    paddingHorizontal: t.sp.xl,
    ...t.shadow.card,
  },
  cardShort: { paddingVertical: t.sp.md },
  cardSelected: {
    borderColor: t.colors.text,
    backgroundColor: t.colors.surfaceWarm,
  },
  emoji: t.text.seasonEmoji,
  info: { flex: 1 },
  name: { ...t.text.seasonName, color: t.colors.text, marginBottom: 2 },
  desc: { ...t.text.seasonDesc, color: t.colors.textMuted },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: t.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkSelected: { backgroundColor: t.colors.text, borderColor: t.colors.text },
  checkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: t.colors.onPrimary,
  },
}));
