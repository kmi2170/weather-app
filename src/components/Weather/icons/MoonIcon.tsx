import { memo } from "react";

import Typography from "@mui/material/Typography";
import { moon_phases, moon_phases_label } from "../../../constants/moon";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const MoonIconComponent = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

const Icon = styled("i")({
  fontSize: "1.75rem",
  color: purple[500],
});

const step = 1.0 / 28;
const hstep = step / 2;

const moonIconClass = (moon_phase: number) => {
  const n_phase = Math.floor((moon_phase + hstep) / step);
  const phase = n_phase === 1 ? moon_phases[0] : moon_phases[n_phase];
  return `wi ${phase}`;
};

const moonIconLabel = (moon_phase: number) => {
  const n_phase = Math.floor((moon_phase + hstep) / step);
  return n_phase === 1 ? moon_phases_label[0] : moon_phases_label[n_phase];
};

interface MoonIconProps {
  moon_phase: number;
}

const MoonIcon = ({ moon_phase }: MoonIconProps) => {
  return (
    <MoonIconComponent>
      <Icon className={moonIconClass(moon_phase)} />
      <Typography
        variant="subtitle2"
        sx={{ textTransform: "capitalize", ml: "1rem" }}
      >
        {moonIconLabel(moon_phase)}
      </Typography>
    </MoonIconComponent>
  );
};

export default memo(MoonIcon);
