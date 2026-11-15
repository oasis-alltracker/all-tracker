import React from "react";
import { Text, View } from "react-native";
import { makeStyles } from "../../theme";

// HabitPill (DS-02 addition): compact habit pill on the home Daily Practice
// card. Source: oasis_design_system.html "Habit Pills" + home mock + Master
// Spec §3 (max 3 pills, "+N" overflow, green tint when done, counted badge).
//
//   name    habit name
//   done    green tint + green dot
//   color   dot colour. Habits have no colour field in the backend yet, so
//           this is optional; without it the dot is neutral.
//   count, target   counted habits: when target > 1, a small "count/target"
//           badge sits on the pill's corner (Master Spec §3). The spec
//           describes the badge but no mock draws it; the style is ours.
//
// Pills are display-only: tapping the card opens Daily Practice.
export default function HabitPill({ name, done = false, color, count, target, style }) {
  const styles = useStyles();
  const counted = target > 1;
  const label = counted ? `${name}, ${count ?? 0} of ${target}` : name;

  return (
    <View
      style={[styles.pill, done && styles.pillDone, counted && styles.pillCounted, style]}
      accessible
      accessibilityLabel={`${label}${done ? ", done" : ""}`}
    >
      <View
        style={[
          styles.dot,
          done ? styles.dotDone : color ? { backgroundColor: color } : null,
        ]}
      />
      <Text style={styles.label}>{name}</Text>
      {counted && (
        <View style={[styles.badge, done && styles.badgeDone]}>
          <Text style={[styles.badgeText, done && styles.badgeTextDone]}>
            {count ?? 0}/{target}
          </Text>
        </View>
      )}
    </View>
  );
}

// HabitPillRow: the home card's habit line. Shows the first `max` habits and
// a "+N" pill for the rest.
//   habits  [{ id, name, done, color, count, target }]
export function HabitPillRow({ habits, max = 3, style }) {
  const styles = useStyles();
  const visible = habits.slice(0, max);
  const overflow = habits.length - visible.length;

  return (
    <View style={[styles.row, style]}>
      {visible.map((h, i) => (
        <HabitPill key={h.id ?? `${h.name}-${i}`} {...h} />
      ))}
      {overflow > 0 && (
        <View
          style={[styles.pill, styles.more]}
          accessible
          accessibilityLabel={`${overflow} more habits`}
        >
          <Text style={styles.moreLabel}>+{overflow}</Text>
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  // rowGap leaves room for the counted badge on wrapped lines
  row: { flexDirection: "row", flexWrap: "wrap", columnGap: 5, rowGap: 8 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: t.sp.xs,
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.pill,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingVertical: 4,
    paddingHorizontal: 9,
  },
  pillDone: {
    backgroundColor: t.colors.fulfilledBg,
    borderColor: t.colors.fulfilledBorder,
  },
  // room on the right so the corner badge doesn't cover the name
  pillCounted: { paddingRight: 14 },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: t.colors.placeholder,
  },
  dotDone: { backgroundColor: t.colors.fulfilledText },
  label: { ...t.text.habitPill, color: t.colors.text },
  more: { backgroundColor: t.colors.surfaceWarm },
  moreLabel: { ...t.text.habitPillMore, color: t.colors.textMuted },
  badge: {
    position: "absolute",
    top: -6,
    right: -4,
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.pill,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeDone: {
    backgroundColor: t.colors.fulfilledBg,
    borderColor: t.colors.fulfilledBorder,
  },
  badgeText: { ...t.text.habitPillBadge, color: t.colors.textMuted },
  badgeTextDone: { color: t.colors.fulfilledText },
}));
