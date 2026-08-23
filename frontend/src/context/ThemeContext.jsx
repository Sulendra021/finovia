import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "system";
    return localStorage.getItem("finovia_mode") || "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("finovia_mode");
    if (saved === "dark") return "dark";
    if (saved === "light") return "light";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      let active = mode;
      if (mode === "system") {
        active = mediaQuery.matches ? "dark" : "light";
      }
      setResolvedTheme(active);

      if (active === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    updateTheme();
    localStorage.setItem("finovia_mode", mode);

    const handleChange = () => {
      if (mode === "system") updateTheme();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  const toggleTheme = () => {
    setMode((m) => {
      const active = m === "system" ? resolvedTheme : m;
      return active === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, theme: resolvedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
