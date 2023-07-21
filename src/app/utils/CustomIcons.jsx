"use client";

import { createContext, useContext } from "react";

const IconsContext = createContext({});

export default function CustomIcons({ children }) {
  const LeftArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
  const RightArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
  return (
    <IconsContext.Provider value={{ LeftArrow, RightArrow }}>
      {children}
    </IconsContext.Provider>
  );
}

export const useIcons = () => useContext(IconsContext);
