import React from "react";
import { Text, View } from "react-native";
import { makeStyles } from "../../theme";
import PressableScale from "./PressableScale";

// FeelPillSelector (DS-02): a wrapping row of pills, used by fitness and
// nutrition alike. Style: the fitness mock's soft pills (white; lavender when
// selected), decided 2026-11-14 for both features.
//   options   array of strings, or { value, label } objects
//   multiple  false → single-select (fitness effort/body-feel): value is one
//             option value or null; tapping the selected pill clears it,
//             since every feel question is optional.
//             true  → multi-select (nutrition feelings): value is an array,
//             kept in the order the options are listed.
//   value, onChange(nextValue)
export default function FeelPillSelector({
  options,
  value,
  onChange,
  multiple = false,
  style,
}) {
  const styles = useStyles();
  const items = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  const selected = multiple
    ? new Set(Array.isArray(value) ? value : [])
    : new Set(value == null ? [] : [value]);

  const toggle = (v) => {
    if (multiple) {
      const next = selected.has(v)
        ? [...selected].filter((x) => x !== v)
        : [...selected, v];
      onChange?.(items.map((i) => i.value).filter((x) => next.includes(x)));
    } else {
      onChange?.(selected.has(v) ? null : v);
    }
  };

  return (
    <View
      style={[styles.row, style]}
      accessibilityRole={multiple ? undefined : "radiogroup"}
    >
      {items.map((item) => {
        const on = selected.has(item.value);
        return (
          <PressableScale
            key={item.value}
            onPress={() => toggle(item.value)}
            accessibilityRole={multiple ? "checkbox" : "radio"}
            accessibilityLabel={item.label}
            style={[styles.pill, on && styles.pillOn]}
          >
            <Text style={on ? styles.labelOn : styles.label}>{item.label}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  pill: {
    backgroundColor: t.colors.surface,
    borderWidth: 1,
    borderColor: t.colors.border,
    borderRadius: t.radius.pill,
    paddingVertical: 5,
    paddingHorizontal: t.sp.md,
  },
  pillOn: { backgroundColor: t.colors.accent, borderColor: t.colors.accentBorder },
  label: { ...t.text.pill, color: t.colors.text },
  labelOn: { ...t.text.pillSelected, color: t.colors.text },
}));
