import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() == "dark" ? "darkColours" : "colours"
  );

  useEffect(() => {
    var skip = false;

    const initializeTheme = async () => {
      skip = true;
      const colorScheme = await AsyncStorage.getItem("theme");
      if (colorScheme && (colorScheme == "light" || colorScheme == "dark")) {
        Appearance.setColorScheme(theme);
      } else {
        Appearance.setColorScheme(null);
      }
      setTheme(colorScheme == "dark" ? "darkColours" : "colours");
      skip = false;
    };

    initializeTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (!skip) {
        setTheme(colorScheme == "dark" ? "darkColours" : "colours");
        AsyncStorage.setItem("theme", colorScheme);
      }
    });

    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
