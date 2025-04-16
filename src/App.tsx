import { Global } from "@emotion/react";
import React, { useEffect } from "react";
import { Route, Router, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import BigDisplay from "./Big";
import Big2 from "./Big2";
import { ConfigOverride } from "./Config";
import { ConfigComponents } from "./ConfigPanel/ConfigComponent";
import MainDisplay from "./MainDisplay";
import { ThemeContext, useTheme } from "./theme";
import { TimeProvider } from "./TimeData";
import { VersionChecker } from "./Version";
const QRDisplay = React.lazy(() => import("./QRDisplay"));

const Redirect = () => {
  const [, navTo] = useLocation();

  useEffect(() => {
    const handle = setTimeout(() => {
      console.warn("fallback redirect");
      navTo("/", { replace: true });
    }, 2000);
    return () => {
      clearTimeout(handle);
    };
  }, [navTo]);

  return null;
};

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
      <Switch>
        <Route path="/">
          <MainDisplay />
        </Route>
        <Route path="/big">
          <BigDisplay />
        </Route>
        <Route path="/big2">
          <Big2 />
        </Route>
        <Route path="/qr">
          <QRDisplay />
        </Route>
        <Route path="/*">
          <Redirect />
        </Route>
      </Switch>
    </TimeProvider>
  );
};

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Router hook={useHashLocation}>
        <ThemeContext>
          <ConfigOverride />
          <VersionChecker />
          <React.Suspense fallback={<></>}>
            <Main />
            <ConfigComponents />
          </React.Suspense>
        </ThemeContext>
      </Router>
    </React.StrictMode>
  );
};
