import { createTheme, Dialog, ThemeProvider } from "@mui/material";
import ConfigContent from "./ConfigContent";
import React, { useMemo } from "react";
import { useTheme } from "../theme";

const ConfigDialog: React.FC<{
  active: boolean;
  setActive: (v: boolean) => unknown;
}> = ({ active, setActive }) => {
  const { mode } = useTheme();
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Ubuntu Sans","Roboto",sans-serif',
        },
        palette: { mode },
      }),
    [mode],
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
