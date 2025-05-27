import { createTheme, Dialog, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import ConfigContent from "./ConfigContent";
import { useLocalStorage } from "usehooks-ts";
import { THEMES } from "../theme";

const ConfigDialog: React.FC<{
  active: boolean;
  setActive: (v: boolean) => unknown;
}> = ({ active, setActive }) => {
  const [themeKey] = useLocalStorage("WC-THEME", 0);
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Ubuntu Sans","Roboto",sans-serif',
        },
        palette: { mode: THEMES[themeKey]?.mode || "dark" },
      }),
    [themeKey],
  );

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        maxWidth={false}
        open={active}
        onClose={() => {
          setActive(false);
        }}
        slotProps={{
          backdrop: { sx: { backdropFilter: "blur(2px)" } },
          transition: {
            appear: true,
            unmountOnExit: true,
            mountOnEnter: true,
          },
        }}
      >
        <ConfigContent handleClose={() => setActive(false)} />
      </Dialog>
    </ThemeProvider>
  );
};
export default ConfigDialog;
