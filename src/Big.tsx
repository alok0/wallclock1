import React from "react";
import { AutoSizer } from "./Autosize";
import { useTime } from "./TimeData";
import { css } from "./css-instance";
import { useTheme } from "./theme";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <div
      className={css({
        position: "absolute",
        inset: 0,

        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gridGap: "1vmin",
        padding: "1vmax",
        placeItems: "stretch",
        pointerEvents: "none",
      })}
    >
      {children}
    </div>
  </>
);

export const BigDisplay: React.FC = () => {
  const time = useTime();
  const theme = useTheme();

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
              color: theme.color.text.secondary,
              whiteSpace: "nowrap",
            }}
          >
            {time.format("ddd")}
          </div>
          <div
            style={{
              fontSize: 500,
              fontWeight: 100,
              color: theme.color.text.secondary,
              whiteSpace: "nowrap",
            }}
          >
            {time.format("MMM DD")}
          </div>
        </div>
      </AutoSizer>
      <AutoSizer>
        <div
          style={{
            fontSize: 800,
            fontWeight: 100,
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
        </div>
      </AutoSizer>
    </Container>
  );
};

export default BigDisplay;
