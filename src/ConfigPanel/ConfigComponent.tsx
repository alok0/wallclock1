import MenuIcon from "@mui/icons-material/Menu";
import { Dialog, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

const ConfigContent = React.lazy(() => import("./ConfigContent"));

export const ConfigComponents: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (
        ev.key === "Escape" &&
        ev.altKey === false &&
        ev.ctrlKey === false &&
        ev.metaKey === false &&
        ev.shiftKey === false
      ) {
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
      <IconButton
        aria-label="Open Menu"
        onClick={() => {
          setActive(true);
        }}
        sx={(theme) => ({
          position: "fixed",
          bottom: theme.spacing(1),
          right: theme.spacing(1),
          opacity: 0,
          transition: theme.transitions.create(["opacity"]),
          "&:hover": { opacity: 1 },
        })}
      >
        <MenuIcon />
      </IconButton>
      <React.Suspense>
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
      </React.Suspense>
    </>
  );
};
