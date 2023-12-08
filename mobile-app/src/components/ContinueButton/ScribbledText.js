import { Text } from "react-native";
import { StyleSheet } from "react-native";

export default function ScribbledText({ children, style }) {
  let baseStyle = styles.medium;

  (Array.isArray(style) ? style : [style]).forEach((style) => {
    if (style && style.fontWeight) {
      baseStyle = style.fontWeight === "bold" ? styles.bold : styles.medium;
    }
  });

  return (
    <Text
      style={[
        { fontFamily: baseStyle.fontFamily, color: "#25436B" },
        style,
        { fontWeight: "normal" },
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: "Segoe-Bold",
  },
  medium: {
    fontFamily: "Sego",
  },
});
