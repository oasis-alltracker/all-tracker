import React, { useState } from "react";
import { TextInput } from "react-native";
import { makeStyles, useOasisTheme } from "../../theme";

// TextField (DS-02 addition): the input used inside sheets (task name, meal
// description, notes). Source: .sheet-input in the foundations and nutrition
// mocks, which agree: white, 1.5px border, radius 14, DM Sans 300 14,
// border darkens to the text colour on focus.
// (The fitness mock draws a smaller field: 1px border, radius 12, 12px text.
// Flagged; not followed.)
//
//   multiline  true → note/description box, min 80 tall, text starts top-left
// Every other TextInput prop passes through (value, onChangeText,
// placeholder, ref, autoFocus, returnKeyType, …).
// No outer margin: the screen or sheet decides spacing.
export default function TextField({
  multiline = false,
  style,
  onFocus,
  onBlur,
  ...rest
}) {
  const t = useOasisTheme();
  const styles = useStyles();
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...rest}
      multiline={multiline}
      placeholderTextColor={t.colors.placeholder}
      selectionColor={t.colors.text}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={[
        styles.field,
        multiline && styles.multiline,
        focused && styles.focused,
        style,
      ]}
    />
  );
}

const useStyles = makeStyles((t) => ({
  field: {
    ...t.text.input,
    color: t.colors.text,
    backgroundColor: t.colors.surface,
    borderWidth: 1.5,
    borderColor: t.colors.border,
    borderRadius: t.radius.item,
    paddingVertical: 13,
    paddingHorizontal: t.sp.lg,
  },
  multiline: {
    minHeight: 80,
    paddingTop: 14,
    textAlignVertical: "top", // Android; iOS already starts at the top
  },
  focused: { borderColor: t.colors.text },
}));
