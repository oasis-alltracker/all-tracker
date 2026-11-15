import React from "react";
import { Text, View } from "react-native";
import { makeStyles } from "../../theme";
import Card from "./Card";

// FulfillmentCard (DS-02): a home feature card (Journal, Nutrition, Fitness)
// with its two states. Source: home mock + Home Screen Spec §3–5.
//   unfulfilled → the feature's gradient and the content you pass as children
//                 (the seasonal prompt / copy)
//   fulfilled   → green gradient (decision 6: design-system values) and a
//                 soft green check with the universal copy, e.g.
//                 universalCopy.journalFulfilled ("Reflected today.")
//
//   icon, title       e.g. "◎", "Journal"
//   gradient          the unfulfilled gradient key: "journal" | "nutrition" | "fitness"
//   fulfilled         boolean
//   fulfilledText     the universal copy to show when fulfilled
//   onPress, style    as Card (style e.g. { flex: 1 } for the half-width pair)
// Fitness's third state (active program) will pass its own children with
// gradient "program" and fulfilled false.
export default function FulfillmentCard({
  icon,
  title,
  gradient,
  fulfilled = false,
  fulfilledText,
  onPress,
  style,
  children,
}) {
  const styles = useStyles();
  return (
    <Card
      gradient={fulfilled ? "fulfilled" : gradient}
      onPress={onPress}
      accessibilityLabel={fulfilled ? `${title}. ${fulfilledText}` : title}
      style={style}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {fulfilled ? (
        <View style={styles.row}>
          <View style={styles.check}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
          <Text style={styles.fulfilledText}>{fulfilledText}</Text>
        </View>
      ) : (
        children
      )}
    </Card>
  );
}

const useStyles = makeStyles((t) => ({
  icon: { ...t.text.cardIcon, color: t.colors.text, marginBottom: 6 },
  title: { ...t.text.cardTitle, color: t.colors.text, marginBottom: 3 },
  row: { flexDirection: "row", alignItems: "center", gap: t.sp.sm, marginTop: 9 },
  check: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: t.colors.fulfilledBg,
    borderWidth: 1,
    borderColor: t.colors.fulfilledBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: { ...t.text.fulfilledCheck, color: t.colors.fulfilledText },
  fulfilledText: { ...t.text.fulfilledText, color: t.colors.textMuted, flexShrink: 1 },
}));
