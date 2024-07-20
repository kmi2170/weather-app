import { memo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import { useAppSelector } from "../../../app/hooks";

import { wind_directions } from "../../../constants/wind";
import { formatDigits } from "../../../utils/formatDigits";
import { purple } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
  icon: {
    color: purple[500],
  },
}));

interface WindIconProps {
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  current: boolean;
}

const WindIcon = ({
  wind_speed,
  wind_deg,
  wind_gust,
  current,
}: WindIconProps) => {
  const classes = useStyles();

  const units = useAppSelector((states) => states.weather.units);

  const speedUnit = () => (units === "imperial" ? "mi/h" : "m/s");

  const windDirection = () => {
    const n_direction = Math.floor((wind_deg + 11.25) / 22.5);
    const direction =
      n_direction === 16 ? wind_directions[0] : wind_directions[n_direction];

    return direction.toUpperCase();
  };

  const windIconClass = () => {
    const n_direction = Math.floor((wind_deg + 11.25) / 22.5);
    const direction =
      n_direction === 16 ? wind_directions[0] : wind_directions[n_direction];

    return `wi wi-wind wi-from-${direction} ${classes.icon}`;
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        {current && (
          <Typography variant="h6" align="center">
            {windDirection()}
          </Typography>
        )}
        <Typography variant="subtitle2" align="center">
          {wind_speed ? formatDigits(wind_speed, 1) : "N/A"}
          {speedUnit()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <i
            className={windIconClass()}
            style={{ fontSize: current ? "3rem" : "1.75rem" }}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        {wind_gust && (
          <Typography variant="subtitle2" align="center">
            Gust {formatDigits(wind_gust, 1)}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(WindIcon);
