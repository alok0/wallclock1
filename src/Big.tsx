import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { AutoSizer } from "./Autosize";
import { useTime } from "./TimeData";

const Container = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,

  ...theme.typography.body1,
  background: theme.palette.background.default,
  color: theme.palette.text.primary,

  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  gridGap: "1vmin",
  padding: "1vmax",
  placeItems: "stretch",
  pointerEvents: "none",
}));

export const BigDisplay: React.FC = () => {
  const time = useTime();

  return (
    <Container>
      <AutoSizer>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            justifyItems: "center",
            gap: 12,
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            variant="h2"
            component="div"
            sx={{ fontSize: "500px" }}
            color="text.secondary"
            noWrap
          >
            {time.format("ddd")}
          </Typography>
          <Typography
            variant="h2"
            component="div"
            sx={{ fontSize: "500px" }}
            color="text.secondary"
            noWrap
          >
            {time.format("MMM DD")}
          </Typography>
        </Box>
      </AutoSizer>
      <AutoSizer>
        <Typography
          variant="h1"
          sx={{ fontSize: "800px" }}
          component="div"
          noWrap
        >
          {time.format("HH:mm")}
          <Typography
            variant="h2"
            component="span"
            sx={{ display: "inline", fontSize: "150px" }}
            noWrap
          >
            {time.format("ss")}
          </Typography>
        </Typography>
      </AutoSizer>
    </Container>
  );
};

export default BigDisplay;
