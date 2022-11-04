import { FC } from "react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

import { useFancyMode } from "../hooks";

export const FancyModeSwitch: FC = () => {
  const { isFancyMode, handleChange } = useFancyMode();
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={isFancyMode} onChange={handleChange} />}
        label={isFancyMode ? "3D" : "Flat"}
      />
    </FormGroup>
  );
};
