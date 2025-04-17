import React, { useEffect } from "react";

export const ThemeContext: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    document.body.style.setProperty("--theme-mode", "dark");
    document.body.style.setProperty("--theme-color-bg", "#000");
    document.body.style.setProperty("--theme-color-text1", "#fff");
    document.body.style.setProperty("--theme-color-text2", "#fff9");
    document.body.style.setProperty("--theme-color-divider", "#fff3");
  }, []);

  return <>{children}</>;
};
