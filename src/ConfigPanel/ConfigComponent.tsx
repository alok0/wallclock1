import TuneIcon from "@mui/icons-material/Tune";
import { Dialog, IconButton } from "@mui/material";
import React, { useState } from "react";

const ConfigContent = React.lazy(() => import("./ConfigContent"));

export const ConfigComponents: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => {
          setActive(true);
        }}
        sx={(theme) => ({
          position: "fixed",
          bottom: theme.spacing(1),
          right: theme.spacing(1),
          opacity: 0.1,
          transition: theme.transitions.create(["opacity"]),
          "&:hover": { opacity: 1 },
        })}
      >
        <TuneIcon />
      </IconButton>
      <React.Suspense>
        <Dialog
          sx={{ minWidth: "25vw" }}
          onClose={() => setActive(false)}
          open={active}
          slotProps={{ backdrop: { sx: { backdropFilter: "blur(3px)" } } }}
          TransitionProps={{
            appear: true,
            unmountOnExit: true,
            mountOnEnter: true,
          }}
        >
          <ConfigContent />
        </Dialog>
      </React.Suspense>
    </>
  );
};
