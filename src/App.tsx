import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import BigDisplay from "./Big";
import Big2 from "./Big2";
import { ConfigComponents } from "./ConfigPanel/ConfigComponent";
import MainDisplay from "./MainDisplay";
import { TimeProvider } from "./TimeData";
import { VersionChecker } from "./Version";
import { Global } from "@emotion/react";
import { ThemeContext, useTheme } from "./theme";
import { ConfigOverride } from "./Config";
const QRDisplay = React.lazy(() => import("./QRDisplay"));

const Main = () => {
  const theme = useTheme();
  return (
    <TimeProvider>
      <Global
        styles={{
          "*": { boxSizing: "border-box" },
          ":root": {
            colorScheme: theme.mode,
          },
          "html, body": {
            fontFamily: "Ubuntu Sans",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 16,
            color: theme.color.text.primary,
            backgroundColor: theme.color.background,
          },
        }}
      />
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
  return (
    <React.StrictMode>
      <HashRouter>
        <ThemeContext>
          <ConfigOverride />
          <VersionChecker />
          <React.Suspense fallback={<></>}>
            <Main />
            <ConfigComponents />
          </React.Suspense>
        </ThemeContext>
      </HashRouter>
    </React.StrictMode>
  );
};
