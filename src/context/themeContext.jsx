"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

function ThemeContext({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
}

export default ThemeContext;
