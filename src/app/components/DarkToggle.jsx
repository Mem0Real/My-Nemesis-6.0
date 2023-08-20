"use client";
import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { useIcons } from "../utils/CustomIcons";

export const DarkToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const { LightIcon, DarkIcon } = useIcons();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const light = theme === "light";
  return (
    <button className="fixed z-40 bottom-5 right-5 dark:bg-gray-900 dark:text-yellow-400 bg-gray-100 text-gray-900 w-10 h-10 rounded-full flex justify-center items-center">
      {light ? (
        <span onClick={() => setTheme("dark")}>{DarkIcon} </span>
      ) : (
        <span onClick={() => setTheme("light")}>{LightIcon} </span>
      )}
    </button>
  );
};
