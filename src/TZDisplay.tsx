import React from "react";
import { useConfig } from "./Config";
import { useTime } from "./TimeData";
import { cleanZoneName } from "./cleanZoneName";
import classes from "./TZDisplay.module.css";

const TimeInZone = ({ timeZone }: { timeZone: string }) => {
  const time = useTime();

  return <>{time.tz(timeZone).format("YYYY-MM-DD HH:mm z")}</>;
};

export const TZDisplay: React.FC = () => {
  const { display } = useConfig();

  return (
    <table className={classes["table"]}>
      <tbody>
        {display.map((timeZone) => (
          <tr key={timeZone}>
            <td align="right">{cleanZoneName(timeZone)}</td>
            <td align="left">
              <TimeInZone timeZone={timeZone} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
