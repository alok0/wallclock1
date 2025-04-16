import React, { useEffect, useState } from "react";
import { css } from "../css-instance";

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
      <div
        className={css({
          position: "fixed",
          zIndex: 10000,
          bottom: 8,
          right: 8,
          opacity: 0,
          transition: "all 300ms",
          "&:hover": { opacity: 1 },
          filter: "grayscale(100%)",
        })}
      >
        <button
          aria-label="Open Menu"
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
