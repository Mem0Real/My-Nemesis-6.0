"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDarkTheme: true,
  toggleThemeHandler: () => {},
});

export default function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty() {
    return !localStorage.getItem("isDarkTheme");
  }

  function initialThemeHandler() {
    if (isLocalStorageEmpty()) {
      localStorage.setItem("isDarkTheme", `true`);
      document?.querySelector("body")?.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      const isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme"));
      isDarkTheme && document?.querySelector("body")?.classList.add("dark");
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  }

  function toggleThemeHandler() {
    const isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme"));
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
    setUpdate(!update);
  }

  function toggleDarkClassToBody() {
    document?.querySelector("body")?.classList.toggle("dark");
  }

  function setValueToLocalStorage() {
    localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
  }

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme: true, toggleThemeHandler, update }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
