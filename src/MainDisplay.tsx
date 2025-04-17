import React from "react";
import { TZDisplay } from "./TZDisplay";
import { useTime } from "./TimeData";
import classes from "./MainDisplay.module.css";

export const TopDisplay: React.FC = () => {
  const time = useTime();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 8,
        padding: "0 16px",
        borderRadius: 1,
      }}
    >
      <time style={{ textAlign: "center", fontSize: "10rem" }}>
        {time.format("HH:mm")}
      </time>
      <time className={classes.secondline}>
        {time.format("dddd YYYY-MM-DD HH:mm:ss[ ]z")}
      </time>
    </div>
  );
};

const MainDisplay: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "auto",
        justifyItems: "center",
        alignItems: "start",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "72ch",
          maxWidth: "100vw",
          gap: 8,
          padding: 8,
          justifyItems: "center",
          alignItems: "start",
          overflow: "hidden",
        }}
      >
        <TopDisplay />
        <TZDisplay />
      </div>
    </div>
  );
};

export default MainDisplay;
