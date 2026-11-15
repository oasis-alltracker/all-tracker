import { useContext, useMemo } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../contexts/ThemeProvider";
import { palettes } from "./palettes";
import { sp, layout } from "./spacing";
import { radius } from "./radius";
import { shadow } from "./shadows";
import { fonts, text } from "./typography";

// Reads light/dark from the app's existing ThemeContext (the same switch the
// legacy screens and the Settings toggle use) and returns the matching Oasis
// palette plus the static tokens. Until the dark-mode pass, `palettes.dark`
// is the light palette, so new screens stay light whatever the setting.
export function useOasisTheme() {
  const ctx = useContext(ThemeContext);
  const mode = ctx?.value === "dark" ? "dark" : "light";
  return useMemo(
    () => ({ mode, ...palettes[mode], sp, layout, radius, shadow, fonts, text }),
    [mode],
  );
}

// Builds a hook that creates a StyleSheet from the theme and rebuilds it only
// when the mode changes:
//   const useStyles = makeStyles((t) => ({ box: { backgroundColor: t.colors.surface } }));
//   const styles = useStyles();
export function makeStyles(factory) {
  return function useStyles() {
    const theme = useOasisTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
}
