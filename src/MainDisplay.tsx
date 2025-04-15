import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { TZDisplay } from "./TZDisplay";
import { useTime } from "./TimeData";

const MainContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,

  ...theme.typography.body1,
  background: theme.palette.background.default,
  color: theme.palette.text.primary,

  display: "grid",
  gridTemplateColumns: "auto",
  justifyItems: "center",
  alignItems: "start",
}));

export const TopDisplay: React.FC = () => {
  const time = useTime();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 1,
        px: 2,
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h1"
        noWrap
        component="time"
        sx={(theme) => ({
          [theme.breakpoints.up("sm")]: { fontSize: "10rem" },
          textAlign: "center",
        })}
      >
        {time.format("HH:mm")}
      </Typography>
      <Typography
        variant="h4"
        component="time"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: { fontSize: "1.5rem" },
          textAlign: "center",
        })}
      >
        {time.format("dddd YYYY-MM-DD HH:mm:ss[ ]z")}
      </Typography>
    </Box>
  );
};

const MainDisplay: React.FC = () => {
  return (
    <MainContainer>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          width: "72ch",
          maxWidth: "100vw",
          gap: 1,
          p: 1,
          justifyItems: "center",
          alignItems: "start",
          overflow: "hidden",
        }}
      >
        <TopDisplay />
        <TZDisplay />
      </Box>
    </MainContainer>
  );
};

export default MainDisplay;
