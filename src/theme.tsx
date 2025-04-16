import React, { createContext, useContext, useMemo } from "react";

const defaultTheme = Object.freeze({
  mode: "dark" as "dark" | "light",
  color: {
    background: "#e11",
    text: {
      primary: "#e11",
      secondary: "#e11",
    },
    divider: "#e22",
  },
});

const Context = createContext(defaultTheme);

export const ThemeContext: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const value = useMemo<typeof defaultTheme>(() => {
    return {
      mode: "dark",
      color: {
        background: "#000",
        text: {
          primary: "#fff",
          secondary: "#fff9",
        },
        divider: "#fff3",
      },
    };
  }, []);

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
};

export const useTheme = () => useContext(Context);
