"use client";

import { createContext, ReactElement, useEffect, useState } from "react";

const MyThemeContext = createContext({
  isDarkTheme: true,
  toggleThemeHandler: () => {},
});

export function MyThemeContextProvider({ children }) {
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
    <MyThemeContext.Provider
      value={{ isDarkTheme: true, toggleThemeHandler, update }}
    >
      {children}
    </MyThemeContext.Provider>
  );
}

export default MyThemeContext;
