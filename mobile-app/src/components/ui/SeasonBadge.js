import React from "react";
import { Text } from "react-native";
import { getSeason, makeStyles } from "../../theme";
import PressableScale from "./PressableScale";

// SeasonBadge (DS-02): white pill showing the season emoji + name, e.g.
// "🪴 Building" (name only, decided 2026-11-14).
// Tappable on home to open the season change sheet (Master Spec §2).
//   season   backend key: "building" | "leveling_up" | …
//   onPress  optional; omit for a static badge
export default function SeasonBadge({ season, onPress, style }) {
  const styles = useStyles();
  const s = getSeason(season);

  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={onPress ? `${s.name} season. Change season` : `${s.name} season`}
      style={[styles.badge, style]}
    >
      <Text style={styles.label}>
        {s.emoji} {s.name}
      </Text>
    </PressableScale>
  );
}

const useStyles = makeStyles((t) => ({
  badge: {
    alignSelf: "flex-start",
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.pill,
    borderWidth: 1,
    borderColor: t.colors.border,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  label: { ...t.text.badge, color: t.colors.text },
}));
