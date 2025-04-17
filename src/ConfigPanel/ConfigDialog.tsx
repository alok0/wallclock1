import { createTheme, Dialog, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";
import ConfigContent from "./ConfigContent";

const ConfigDialog: React.FC<{
  active: boolean;
  setActive: (v: boolean) => unknown;
}> = ({ active, setActive }) => {
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Ubuntu Sans","Roboto",sans-serif',
        },
        palette: { mode: "dark" },
      }),
    [],
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
