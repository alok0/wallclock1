import React, { useCallback, useEffect } from "react";
import { getSolarPosition } from "sunrise-sunset-js";
import { useLocalStorage } from "usehooks-ts";
import { useConfig } from "./Config";
import { useTime } from "./TimeData";

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
  const { coord } = useConfig();
  const time = useTime();

  const setValuesBasedOnTheme = useCallback(() => {
    const theme = THEMES[themeKey] || THEMES[0];
    document.body.style.setProperty("--theme-mode", theme.mode);
    document.body.style.setProperty("--theme-color-bg", theme.bg);
    document.body.style.setProperty("--theme-color-text1", theme.text1);
    document.body.style.setProperty("--theme-color-text2", theme.text2);
    document.body.style.setProperty("--theme-color-divider", theme.divider);
  }, [themeKey]);

  useEffect(() => {
    if (!coord.trim()) {
      setValuesBasedOnTheme();
      return;
    }
    const [latString, lonString] = coord.split(",");
    const lat = Number.parseFloat(latString || "");
    const lon = Number.parseFloat(lonString || "");

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      setValuesBasedOnTheme();
      return;
    }

    const solarPosition = getSolarPosition(lat, lon, time.toDate());
    if (!solarPosition) {
      setValuesBasedOnTheme();
      return;
    }
    const clamped = Math.max(Math.min(solarPosition.elevation, 5), -5);
    const mix = ((clamped + 5) / 10) * 100;

    document.body.style.setProperty("--theme-mode", "dark");
    document.body.style.setProperty("--theme-color-bg", "#000");
    document.body.style.setProperty(
      "--theme-color-text1",
      `color-mix(in hsl shorter hue, hsl(63 1 99 / 1) ${mix}%, #c00 ${100 - mix}%)`,
    );
    document.body.style.setProperty(
      "--theme-color-text2",
      `color-mix(in hsl shorter hue, hsl(63 1 99 / .5) ${mix}%, #c009 ${100 - mix}%)`,
    );
    document.body.style.setProperty(
      "--theme-color-divider",
      `color-mix(in hsl shorter hue, hsl(63 1 99 / .15) ${mix}%, #c003 ${100 - mix}%)`,
    );
  }, [coord, setValuesBasedOnTheme, time]);

  return <>{children}</>;
};
