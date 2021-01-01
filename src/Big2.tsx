import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { AutoSizer } from "./Autosize";
import { useConfig } from "./Config";
import { useTime } from "./TimeData";
import { cleanZoneName } from "./cleanZoneName";
import { useNavigate } from "react-router-dom";

const ZoneDisplayBox: React.FC<{ timeZone: string }> = ({ timeZone }) => {
  const time = useTime();
  return (
    <Paper
      variant="outlined"
      sx={{
        p: ".5vmin",
        display: "grid",
        gridTemplateRows: "1fr 2fr",
        placeItems: "stretch",
        overflow: "hidden",
      }}
    >
      <AutoSizer>
        <Typography
          color="text.secondary"
          sx={{ fontSize: "400px" }}
          component="div"
          noWrap
        >
          {cleanZoneName(timeZone)}
        </Typography>
      </AutoSizer>
      <AutoSizer>
        <Typography
          sx={{ fontSize: "400px", lineHeight: 1 }}
          component="time"
          noWrap
        >
          {time.tz(timeZone).format("HH:mm")}
        </Typography>
      </AutoSizer>
    </Paper>
  );
};

export const Big2: React.FC = () => {
  const time = useTime();
  const { display } = useConfig();
  const navTo = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        maxWidth: "200vh",
        maxHeight: "80vw",
        margin: "auto",

        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "1fr 5fr 1fr",
        gap: "1vmin",
        padding: 2,
        placeItems: "stretch",
        cursor: "pointer",
      }}
      onClick={() => void navTo("/")}
    >
      <AutoSizer>
        <Typography
          variant="h2"
          component="time"
          sx={{ fontSize: "500px" }}
          color="text.secondary"
          noWrap
        >
          {time.format("ddd, MMM DD, YYYY")}
        </Typography>
      </AutoSizer>
      <AutoSizer>
        <Typography
          sx={{ fontSize: "800px", lineHeight: 1, fontWeight: 100 }}
          component="time"
          noWrap
        >
          {time.format("HH:mm")}
          <Typography
            component="span"
            sx={{ display: "inline", fontSize: "150px", fontWeight: 300 }}
            noWrap
          >
            {time.format("ss")}
          </Typography>
        </Typography>
      </AutoSizer>
      <Box
        sx={{
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
      </Box>
    </Box>
  );
};

export default Big2;
