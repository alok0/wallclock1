import { Box, Typography } from "@mui/material";
import { correction, generate, mode } from "lean-qr";
import React, { useEffect, useState } from "react";
import { AutoSizer } from "./Autosize";
import { useTime } from "./TimeData";

export const QRDisplay: React.FC = () => {
  const time = useTime();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    const qrCode = generate(time.utc().startOf("second").toISOString(), {
      minCorrectionLevel: correction.H,
      modes: [mode.ascii],
    });
    qrCode.toCanvas(canvas, {
      on: [0x00, 0x00, 0x00, 0xff],
      off: [0xff, 0xff, 0xff, 0xff],
    });
  }, [canvas, time]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          zIndex: "appBar",
          inset: 0,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          component="time"
          sx={{
            color: "#000",
            opacity: (theme) => theme.palette.action.disabledOpacity,
            pointerEvents: "none",
            zIndex: "modal",
            transform: "translateY(-50vmin) translateY(1.2em)",
          }}
        >
          {time.format("dddd YYYY-MM-DD HH:mm:ss[ ]z")}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: "100vmin", width: "100vmin" }}>
          <AutoSizer>
            <canvas
              ref={setCanvas}
              style={{
                display: "block",
                imageRendering: "pixelated",
              }}
            />
          </AutoSizer>
        </Box>
      </Box>
    </>
  );
};

export default QRDisplay;
