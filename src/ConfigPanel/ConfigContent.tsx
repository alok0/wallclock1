import {
  Autocomplete,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useConfig } from "../Config";
import { timezones } from "../timezones";

const ConfigContent: React.FC = () => {
  const { display, setDisplay } = useConfig();
  return (
    <>
      <DialogTitle>Configuration</DialogTitle>
      <DialogContent>
        <Autocomplete
          multiple
          freeSolo
          options={timezones}
          value={display}
          onChange={(_, v) => setDisplay([...v])}
          disableCloseOnSelect
          renderInput={(params) => <TextField {...params} />}
        />
      </DialogContent>
    </>
  );
};

export default ConfigContent;
