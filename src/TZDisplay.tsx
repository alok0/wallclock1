import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useConfig } from "./Config";
import { useTime } from "./TimeData";
import { cleanZoneName } from "./cleanZoneName";

const TimeInZone = ({ timeZone }: { timeZone: string }) => {
  const time = useTime();

  return <>{time.tz(timeZone).format("YYYY-MM-DD HH:mm z")}</>;
};

export const TZDisplay: React.FC = () => {
  const { display } = useConfig();

  return (
    <Table>
      <TableBody>
        {display.map((timeZone) => (
          <TableRow key={timeZone}>
            <TableCell align="right">{cleanZoneName(timeZone)}</TableCell>
            <TableCell align="left">
              <TimeInZone timeZone={timeZone} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
