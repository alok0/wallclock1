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
      <div
        style={{
          position: "absolute",
          zIndex: "500",
          inset: 0,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          cursor: "none",
        }}
      >
        <time
          style={{
            color: "#000",
            opacity: 0.3,
            pointerEvents: "none",
            zIndex: "600",
            transform: "translateY(-50vmin) translateY(1.2em)",
          }}
        >
          {time.format("dddd YYYY-MM-DD HH:mm:ss[ ]z")}
        </time>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "100vmin", width: "100vmin" }}>
          <AutoSizer>
            <canvas
              ref={setCanvas}
              style={{
                display: "block",
                imageRendering: "pixelated",
              }}
            />
          </AutoSizer>
        </div>
      </div>
    </>
  );
};

export default QRDisplay;
