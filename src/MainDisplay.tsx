import { Box, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigComponents } from "./ConfigPanel/ConfigComponent";
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
  const navTo = useNavigate();
  return (
    <Box
      onClick={() => void navTo("/big2")}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 1,
        px: 2,
        borderRadius: 1,
        cursor: "pointer",
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
  const navTo = useNavigate();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "q" && !e.altKey && !e.ctrlKey && !e.metaKey) {
        void navTo("/qr");
      }
    };

    document.body.addEventListener("keypress", handler);
    return () => {
      document.body.removeEventListener("keypress", handler);
    };
  }, [navTo]);

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
      <ConfigComponents />
    </MainContainer>
  );
};

export default MainDisplay;
