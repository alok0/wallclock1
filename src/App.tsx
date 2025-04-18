import React, { useEffect } from "react";
import { Route, Router, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import BigDisplay from "./Big";
import Big2 from "./Big2";
import { ConfigOverride } from "./Config";
import { ConfigComponents } from "./ConfigPanel/ConfigComponent";
import MainDisplay from "./MainDisplay";
import { ThemeContext } from "./theme";
import { TimeProvider } from "./TimeData";
import { VersionChecker } from "./Version";
import { ErrorHandler } from "./ErrorHandler";
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
  return (
    <TimeProvider>
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
      <ErrorHandler>
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
      </ErrorHandler>
    </React.StrictMode>
  );
};
