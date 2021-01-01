import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export const AutoSizer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (!container) {
      return () => {};
    }

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect);
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [container]);

  return (
    <svg viewBox={`0 0 ${size?.width || 1} ${size?.height || 1}`}>
      <foreignObject height={10000} width={10000}>
        <Box ref={setContainer} sx={{ position: "absolute" }}>
          {children}
        </Box>
      </foreignObject>
    </svg>
  );
};
