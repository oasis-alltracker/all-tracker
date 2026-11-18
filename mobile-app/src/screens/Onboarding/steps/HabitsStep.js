import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { makeStyles } from "../../../theme";
import {
  BottomSheet,
  PressableScale,
  PrimaryButton,
  SecondaryTextButton,
} from "../../../components/ui";
import StepLayout, { StepHeader } from "../components/StepLayout";
import AddRow from "../components/AddRow";
import { copy } from "../copy";

// Habits setup (O-03–O-07; mock #screen-habits). Lightweight on purpose
// (decided 2026-11-15): a habit is a name + emoji, done once a day. Reminders
// and counted targets are set later from Daily Practice.
// Default cap: the guidance says 2–3; the mock caps at 3. A season can set
// its own `max` (Restoring: 1, to match "one small thing").
export const MAX_HABITS = 3;

export default function HabitsStep({
  config, // season.onboarding.habits
  habits,
  setHabits,
  progress,
  onBack,
  onNext,
  onSkip, // only when config.skippable
  saving,
}) {
  const styles = useStyles();
  const [adding, setAdding] = useState(false);

  const max = config.max ?? MAX_HABITS;
  const single = max === 1;
  const isSelected = (name) => habits.some((h) => same(h.name, name));
  // With a cap of 1 nothing ever dims: picking another habit swaps it in.
  const full = !single && habits.length >= max;

  // Picks can carry over from another season (back to Season, choose again).
  useEffect(() => {
    if (habits.length > max) setHabits(habits.slice(0, max));
  }, [habits, max, setHabits]);

  const select = (habit) => setHabits(single ? [habit] : [...habits, habit]);

  const toggle = (habit) => {
    if (isSelected(habit.name)) {
      setHabits(habits.filter((h) => !same(h.name, habit.name)));
    } else if (!full) {
      select(habit);
    }
  };

  const addOwn = (name) => {
    if (!isSelected(name) && !full) {
      select({ name, emoji: copy.habits.customEmoji });
    }
    setAdding(false);
  };

  // Suggestions first, then any habits the user named themselves.
  const custom = habits.filter(
    (h) => !config.suggestions.some((s) => same(s.name, h.name)),
  );
  const chips = [...config.suggestions, ...custom];

  return (
    <StepLayout
      progress={progress}
      onBack={onBack}
      footer={
        <>
          <PrimaryButton
            title={copy.continue}
            onPress={onNext}
            loading={saving}
          />
          {config.skippable ? (
            <SecondaryTextButton
              title={copy.skip}
              onPress={onSkip}
              disabled={saving}
              style={styles.skip}
            />
          ) : null}
        </>
      }
    >
      {({ compact }) => (
        <>
          <StepHeader
            label={copy.habits.label}
            question={config.question}
            guidance={config.guidance}
          />

          <View style={[styles.grid, compact && styles.gridShort]}>
            {pairs(chips).map((row) => (
              <View key={row[0].name} style={styles.row}>
                {row.map((habit) => {
                  const selected = isSelected(habit.name);
                  const dimmed = full && !selected;
                  return (
                    <PressableScale
                      key={habit.name}
                      onPress={() => toggle(habit)}
                      disabled={dimmed}
                      accessibilityRole="checkbox"
                      accessibilityLabel={habit.name}
                      accessibilityState={{
                        checked: selected,
                        disabled: dimmed,
                      }}
                      style={[
                        styles.chip,
                        compact && styles.chipShort,
                        selected && styles.chipSelected,
                        dimmed && styles.chipDimmed,
                      ]}
                    >
                      <Text style={styles.chipEmoji}>{habit.emoji}</Text>
                      <Text style={styles.chipName} numberOfLines={2}>
                        {habit.name}
                      </Text>
                    </PressableScale>
                  );
                })}
                {row.length === 1 ? <View style={styles.filler} /> : null}
              </View>
            ))}
          </View>

          <PressableScale
            onPress={full ? undefined : () => setAdding(true)}
            disabled={full}
            accessibilityLabel={copy.habits.addOwn}
            style={[
              styles.addOwn,
              compact && styles.chipShort,
              full && styles.chipDimmed,
            ]}
          >
            <Text style={styles.addOwnText}>{copy.habits.addOwn}</Text>
          </PressableScale>

          {/* A sheet, so the keyboard never pushes the habit grid around. */}
          <BottomSheet
            visible={adding}
            onClose={() => setAdding(false)}
            title={copy.habits.addOwnTitle}
          >
            <AddRow
              placeholder={copy.habits.addOwnPlaceholder}
              onAdd={addOwn}
              disabled={full}
              autoFocus
            />
          </BottomSheet>
        </>
      )}
    </StepLayout>
  );
}

const same = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

function pairs(items) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return rows;
}

const useStyles = makeStyles((t) => ({
  grid: { gap: 10, marginBottom: t.sp.md },
  gridShort: { gap: t.sp.sm },
  row: { flexDirection: "row", gap: 10 },
  chip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: t.colors.surface,
    borderWidth: 1.5,
    borderColor: t.colors.border,
    borderRadius: t.radius.item,
    padding: 14,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  chipShort: { paddingVertical: 10 },
  chipSelected: {
    borderColor: t.colors.text,
    backgroundColor: t.colors.surfaceWarm,
  },
  chipDimmed: { opacity: 0.4 },
  filler: { flex: 1 },
  chipEmoji: t.text.chipEmoji,
  chipName: { ...t.text.chipLabel, color: t.colors.text, flexShrink: 1 },
  addOwn: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: t.colors.border,
    borderRadius: t.radius.item,
    padding: 14,
    alignItems: "center",
  },
  addOwnText: { ...t.text.chipLabel, color: t.colors.textMuted },
  skip: { marginTop: t.sp.sm },
}));
