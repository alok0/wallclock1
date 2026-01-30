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

const generateColorFromSolarElevation = (elevation: number) => {
  const colorTable = [
    [-9, "#700"],
    [-6, "#F00"],
    [-2, "hsl(45 87% 67%)"],
    [0, "hsl(45 100% 75%)"],
    [2, "hsl(45 99% 99%)"],
  ] as const;
  const upper = colorTable.find(([e]) => e > elevation);
  const lower = colorTable.toReversed().find(([e]) => e <= elevation);

  if (lower && !upper) {
    return lower[1];
  }
  if (upper && !lower) {
    return upper[1];
  }
  if (!upper || !lower) {
    return "#333";
  }

  const clamped = Math.max(Math.min(elevation, upper[0]), lower[0]);
  const mix = ((clamped - lower[0]) / (upper[0] - lower[0])) * 100;

  return `color-mix(in hsl shorter hue, ${upper[1]} ${mix.toFixed(2)}%, ${lower[1]} ${(100 - mix).toFixed(2)}%)`;
};

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
    if (coord.trim()) {
      return;
    }
    setValuesBasedOnTheme();
  }, [coord, setValuesBasedOnTheme]);

  useEffect(() => {
    if (!coord.trim()) {
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

    document.body.style.setProperty("--theme-mode", "dark");
    document.body.style.setProperty("--theme-color-bg", "#000");
    document.body.style.setProperty(
      "--theme-color-text1",
      generateColorFromSolarElevation(solarPosition.elevation),
    );
    document.body.style.setProperty(
      "--theme-color-text2",
      `rgb(from var(--theme-color-text1) r g b / 50%)`,
    );
    document.body.style.setProperty(
      "--theme-color-divider",
      `rgb(from var(--theme-color-text1) r g b / 15%)`,
    );
  }, [coord, setValuesBasedOnTheme, time]);

  return <>{children}</>;
};
