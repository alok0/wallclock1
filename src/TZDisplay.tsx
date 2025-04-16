import React from "react";
import { useConfig } from "./Config";
import { useTime } from "./TimeData";
import { cleanZoneName } from "./cleanZoneName";
import { css } from "./css-instance";
import { useTheme } from "./theme";

const TimeInZone = ({ timeZone }: { timeZone: string }) => {
  const time = useTime();

  return <>{time.tz(timeZone).format("YYYY-MM-DD HH:mm z")}</>;
};

export const TZDisplay: React.FC = () => {
  const { display } = useConfig();
  const theme = useTheme();

  return (
    <table
      className={css({
        marginTop: 16,
        borderCollapse: "collapse",
        width: "100%",

        td: {
          padding: 16,
          borderColor: theme.color.divider,
          borderStyle: "solid",
          borderWidth: "1px 0",
        },
      })}
    >
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
