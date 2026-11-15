import React from "react";
import { Text } from "react-native";
import { makeStyles } from "../../theme";

// SectionLabel (DS-02): 9px uppercase, 1.5 letter spacing, muted (Master Spec §1).
// e.g. <SectionLabel>Habits</SectionLabel>
export default function SectionLabel({ children, style }) {
  const styles = useStyles();
  return (
    <Text style={[styles.label, style]} accessibilityRole="header">
      {children}
    </Text>
  );
}

const useStyles = makeStyles((t) => ({
  label: {
    ...t.text.sectionLabel,
    color: t.colors.textMuted,
    marginBottom: t.sp.sm,
  },
}));
