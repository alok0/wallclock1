import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { TimeProvider } from "./TimeData";

const BigDisplay = React.lazy(() => import("./Big"));
const Big2 = React.lazy(() => import("./Big2"));
const MainDisplay = React.lazy(() => import("./MainDisplay"));

const Main = () => {
  return (
    <TimeProvider>
      <Routes>
        <Route path="/" element={<MainDisplay />} />
        <Route path="/big" element={<BigDisplay />} />
        <Route path="/big2" element={<Big2 />} />
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
          <React.Suspense fallback={<></>}>
            <Main />
          </React.Suspense>
        </ThemeProvider>
      </HashRouter>
    </React.StrictMode>
  );
};
