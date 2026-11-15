import React from "react";
import { Pressable, Text, View } from "react-native";
import { makeStyles } from "../../theme";

// ScreenHeader (DS-02 addition): the nav row at the top of each section
// screen (.page-nav in the foundations, nutrition and journal mocks):
// muted "←" on the left, Cormorant title centred, optional action on the
// right (usually an AddButton; an empty 32px space keeps the title centred).
//
//   title    e.g. the season's practice title, "Journal", "Past"
//   onBack   omit to hide the arrow (its space is kept)
//   right    optional element, e.g. <AddButton onPress={…} />
//
// Doesn't add the safe-area top inset; the screen does that.
export default function ScreenHeader({ title, onBack, right, style }) {
  const styles = useStyles();
  return (
    <View style={[styles.row, style]}>
      <View style={styles.side}>
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
      <Text style={styles.title} numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
      <View style={[styles.side, styles.sideRight]}>{right}</View>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 14,
    paddingHorizontal: t.layout.screenPaddingH,
  },
  // Equal-width sides keep the title centred whatever sits on either side.
  side: { width: 44, alignItems: "flex-start", justifyContent: "center" },
  sideRight: { alignItems: "flex-end" },
  title: {
    ...t.text.navTitle,
    color: t.colors.text,
    flex: 1,
    textAlign: "center",
  },
  back: { ...t.text.navBack, color: t.colors.textMuted },
  pressed: { opacity: 0.5 },
}));
