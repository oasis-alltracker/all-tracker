import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  //theme can contain 2 values: light or dark
  const [theme, setTheme] = useState(Appearance.getColorScheme() || "light");

  useEffect(() => {
    const initializeTheme = async () => {
      const colorScheme = await AsyncStorage.getItem("theme");
      if (colorScheme && (colorScheme == "light" || colorScheme == "dark")) {
        setTheme(colorScheme);
      }
    };

    initializeTheme();
  }, []);

  const updateTheme = async (colorScheme) => {
    if (colorScheme == "dark" || colorScheme == "light") {
      setTheme(colorScheme);
      await AsyncStorage.setItem("theme", colorScheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, setter: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
