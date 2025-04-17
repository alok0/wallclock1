import React from "react";
import { AutoSizer } from "./Autosize";
import { useConfig } from "./Config";
import { useTime } from "./TimeData";
import { cleanZoneName } from "./cleanZoneName";

const ZoneDisplayBox: React.FC<{ timeZone: string }> = ({ timeZone }) => {
  const time = useTime();
  return (
    <div
      style={{
        padding: ".5vmin",
        display: "grid",
        gridTemplateRows: "1fr 2fr",
        placeItems: "stretch",
        overflow: "hidden",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "var(--theme-color-divider)",
        borderRadius: 8,
      }}
    >
      <AutoSizer>
        <div
          style={{
            color: "var(--theme-color-text2)",
            fontSize: 400,
            whiteSpace: "nowrap",
          }}
        >
          {cleanZoneName(timeZone)}
        </div>
      </AutoSizer>
      <AutoSizer>
        <time
          style={{
            fontSize: 400,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {time.tz(timeZone).format("HH:mm")}
        </time>
      </AutoSizer>
    </div>
  );
};

export const Big2: React.FC = () => {
  const time = useTime();
  const { display } = useConfig();

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          maxWidth: "200vh",
          maxHeight: "80vw",
          margin: "auto",

          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "1fr 5fr 1fr",
          gap: "1vmin",
          padding: 16,
          placeItems: "stretch",
          cursor: "none",
        }}
      >
        <AutoSizer>
          <time
            style={{
              color: "var(--theme-color-text2)",
              fontSize: 500,
              fontWeight: 300,
              whiteSpace: "nowrap",
            }}
          >
            {time.format("ddd, MMM DD, YYYY")}
          </time>
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
              style={{ display: "inline", fontSize: "150px", fontWeight: 300 }}
            >
              {time.format("ss")}
            </span>
          </time>
        </AutoSizer>
        <div
          style={{
            display: "grid",
            gridAutoColumns: "1fr",
            gridAutoFlow: "column",
            gap: ".5vmin",
            overflow: "hidden",
            placeItems: "stretch",
          }}
        >
          {display.slice(0, 8).map((timeZone) => (
            <ZoneDisplayBox key={timeZone} timeZone={timeZone} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Big2;
