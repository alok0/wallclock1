import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { TimeProvider } from "./TimeData";
import { VersionChecker } from "./Version";
import { ConfigComponents } from "./ConfigPanel/ConfigComponent";
import MainDisplay from "./MainDisplay";
import Big2 from "./Big2";
import BigDisplay from "./Big";
const QRDisplay = React.lazy(() => import("./QRDisplay"));

const Main = () => {
  return (
    <TimeProvider>
      <Routes>
        <Route path="/" element={<MainDisplay />} />
        <Route path="/big" element={<BigDisplay />} />
        <Route path="/big2" element={<Big2 />} />
        <Route path="/qr" element={<QRDisplay />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </TimeProvider>
  );
};

export const App: React.FC = () => {
  const [theme] = React.useState(() =>
    createTheme({
      typography: {
        fontFamily: '"Ubuntu Sans","Roboto",sans-serif',
      },
      palette: {
        mode: "dark",
        background: {
          default: "#111111",
        },
      },
    }),
  );

  return (
    <React.StrictMode>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <VersionChecker />
          <React.Suspense fallback={<></>}>
            <Main />
            <ConfigComponents />
          </React.Suspense>
        </ThemeProvider>
      </HashRouter>
    </React.StrictMode>
  );
};
