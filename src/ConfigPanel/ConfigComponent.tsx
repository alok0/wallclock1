import React, { useEffect, useState } from "react";
import classes from "./ConfigComponent.module.css";

const ConfigDialog = React.lazy(() => import("./ConfigDialog"));

export const ConfigComponents: React.FC = () => {
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (
        ev.key === "Escape" &&
        ev.altKey === false &&
        ev.ctrlKey === false &&
        ev.metaKey === false &&
        ev.shiftKey === false
      ) {
        setLoaded(true);
        setActive(true);
      }
    };
    document.body.addEventListener("keydown", handler);
    return () => {
      document.body.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <>
      <div className={classes["btncontainer"]}>
        <button
          aria-label="Open Menu"
          type="button"
          onClick={() => {
            setLoaded(true);
            setActive(true);
          }}
          style={{
            height: 32,
            width: 32,
            border: "0",
            borderRadius: 16,
            cursor: "pointer",
          }}
        >
          📝
        </button>
      </div>
      <React.Suspense>
        {loaded && <ConfigDialog active={active} setActive={setActive} />}
      </React.Suspense>
    </>
  );
};
