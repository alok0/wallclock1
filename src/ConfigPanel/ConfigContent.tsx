import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Autocomplete,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useRoute, useLocation } from "wouter";
import { useConfig } from "../Config";
import { timezones } from "../timezones";
import { getVersion } from "../Version";

const NavButton: React.FC<
  React.PropsWithChildren<{ path: string; handleClose: () => unknown }>
> = ({ path, handleClose, children }) => {
  const [match] = useRoute(path);
  const [, navTo] = useLocation();
  return (
    <ListItemButton
      onClick={() => {
        void navTo(path);
        handleClose();
      }}
    >
      <ListItemIcon sx={{ height: 0 }}>
        <Checkbox
          edge="start"
          checked={!!match}
          disableRipple
          sx={{ transform: "translateY(-50%)" }}
          checkedIcon={<RadioButtonCheckedIcon />}
          icon={<RadioButtonUncheckedIcon />}
        />
      </ListItemIcon>
      {children}
    </ListItemButton>
  );
};

const ConfigContent: React.FC<{
  handleClose: () => unknown;
}> = ({ handleClose }) => {
  const { display, setDisplay } = useConfig();

  return (
    <>
      <DialogTitle>Wall Clock One</DialogTitle>
      <DialogContent>
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ position: "absolute", top: ".5em", right: "2ch" }}
        >
          {getVersion()}
        </Typography>
        <Autocomplete
          multiple
          freeSolo
          options={timezones}
          value={display}
          onChange={(_, v) => setDisplay([...v])}
          disableCloseOnSelect
          slotProps={{
            chip: { size: "small" },
          }}
          renderInput={(params) => (
            <TextField
              variant="filled"
              margin="none"
              label="Timezones"
              {...params}
            />
          )}
          sx={{ minWidth: "33vw" }}
        />
        <DialogContentText sx={{ mt: 2, mb: 1 }}>Modes</DialogContentText>
        <Paper variant="outlined" sx={{ background: "transparent" }}>
          <List component="nav" dense>
            <NavButton path="/" handleClose={handleClose}>
              Main Desktop
            </NavButton>
            <NavButton path="/big" handleClose={handleClose}>
              Minimal Big Display
            </NavButton>
            <NavButton path="/big2" handleClose={handleClose}>
              Big Wall Clock
            </NavButton>
            <NavButton path="/qr" handleClose={handleClose}>
              QR Code
            </NavButton>
          </List>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Dismiss</Button>
      </DialogActions>
    </>
  );
};

export default ConfigContent;
