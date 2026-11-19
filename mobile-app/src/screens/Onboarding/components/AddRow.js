import React, { useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { makeStyles } from "../../../theme";
import { PressableScale, TextField } from "../../../components/ui";

// Text field + dark "+" button (mock .task-input-row). Return or "+" adds the
// trimmed text and clears the field; empty text does nothing. The keyboard
// closes after an add unless `keepKeyboardOpen` (tasks: type the next one).
//
// Pass value/onChangeText to hold the text yourself (e.g. so Continue can
// keep a task that was typed but never added); otherwise it's kept here.
export default function AddRow({
  placeholder,
  onAdd,
  disabled,
  autoFocus,
  maxLength = 60,
  keepKeyboardOpen = false,
  value: controlledValue,
  onChangeText,
}) {
  const styles = useStyles();
  const [ownValue, setOwnValue] = useState("");
  const controlled = controlledValue !== undefined;
  const value = controlled ? controlledValue : ownValue;
  const setValue = controlled ? onChangeText : setOwnValue;

  const add = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onAdd(text);
    setValue("");
    if (!keepKeyboardOpen) Keyboard.dismiss();
  };

  return (
    <View style={styles.row}>
      <TextField
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        accessibilityLabel={placeholder}
        editable={!disabled}
        autoFocus={autoFocus}
        maxLength={maxLength}
        returnKeyType="done"
        submitBehavior={keepKeyboardOpen ? "submit" : "blurAndSubmit"}
        onSubmitEditing={add}
        style={styles.field}
      />
      <PressableScale
        onPress={add}
        disabled={disabled}
        accessibilityLabel={`Add: ${placeholder}`}
        style={[styles.button, disabled && styles.disabled]}
      >
        <Text style={styles.plus}>+</Text>
      </PressableScale>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  row: { flexDirection: "row", gap: 10 },
  field: { flex: 1 },
  button: {
    width: 46,
    borderRadius: t.radius.item,
    backgroundColor: t.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: { opacity: 0.4 },
  plus: { ...t.text.chipEmoji, color: t.colors.onPrimary },
}));
