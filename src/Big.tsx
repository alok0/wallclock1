import React from "react";
import { AutoSizer } from "./Autosize";
import { useTime } from "./TimeData";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,

        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gridGap: "1vmin",
        padding: "1vmax",
        placeItems: "stretch",
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  </>
);

export const BigDisplay: React.FC = () => {
  const time = useTime();
  return (
    <Container>
      <AutoSizer>
        <div
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            justifyItems: "center",
            gap: 96,
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              fontSize: 500,
              fontWeight: 100,
              lineHeight: 1,
              color: "var(--theme-color-text2)",
              whiteSpace: "nowrap",
            }}
          >
            {time.format("ddd")}
          </div>
          <div
            style={{
              fontSize: 500,
              fontWeight: 100,
              lineHeight: 1,
              color: "var(--theme-color-text2)",
              whiteSpace: "nowrap",
            }}
          >
            {time.format("MMM DD")}
          </div>
        </div>
      </AutoSizer>
      <AutoSizer>
        <time
          style={{
            fontSize: 800,
            fontWeight: 100,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {time.format("HH:mm")}
          <span
            style={{
              display: "inline",
              fontSize: 150,
              fontWeight: 100,
              whiteSpace: "nowrap",
            }}
          >
            {time.format("ss")}
          </span>
        </time>
      </AutoSizer>
    </Container>
  );
};

export default BigDisplay;
