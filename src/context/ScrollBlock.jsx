"use client";

import { useState, createContext, useContext } from "react";

const ScrollContext = createContext({});

export default function ScrollBlock({ children }) {
  const [block, setBlock] = useState(false);

  const blockScroll = () => {
    setBlock(true);
  };

  const allowScroll = () => {
    setBlock(false);
  };

  return (
    <ScrollContext.Provider value={{ block, blockScroll, allowScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScrollContext = () => useContext(ScrollContext);
