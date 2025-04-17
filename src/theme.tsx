import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export const THEMES = [
  {
    name: "Default Dark",
    mode: "dark",
    bg: "#000",
    text1: "#fff",
    text2: "#fff9",
    divider: "#fff3",
  },
  {
    name: "Light",
    mode: "light",
    bg: "#fff",
    text1: "#000",
    text2: "#0007",
    divider: "#0003",
  },
  {
    name: "Puke Dark",
    mode: "dark",
    bg: "#002b36",
    text1: "#93a1a1",
    text2: "#586e75",
    divider: "#073642",
  },
  {
    name: "Dark Purp",
    mode: "dark",
    bg: "#111",
    text1: "#DDA0DD",
    text2: "#8B4513",
    divider: "#8B451377",
  },
] as const;

export const ThemeContext: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [themeKey] = useLocalStorage("WC-THEME", 0);
  const theme = THEMES[themeKey] || THEMES[0];

  useEffect(() => {
    document.body.style.setProperty("--theme-mode", theme.mode);
    document.body.style.setProperty("--theme-color-bg", theme.bg);
    document.body.style.setProperty("--theme-color-text1", theme.text1);
    document.body.style.setProperty("--theme-color-text2", theme.text2);
    document.body.style.setProperty("--theme-color-divider", theme.divider);
  }, [theme.bg, theme.divider, theme.mode, theme.text1, theme.text2]);

  return <>{children}</>;
};
