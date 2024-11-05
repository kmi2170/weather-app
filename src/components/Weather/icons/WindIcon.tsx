import { memo } from "react";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../../store/hooks";

import { wind_directions } from "../../../constants/wind";
import { formatDigits } from "../../../utils/formatDigits";
import theme from "../../../theme/theme";

interface WindIconProps {
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  current: boolean;
  fontColor?: string;
  iconColor?: string;
}

const WindIcon = ({
  wind_speed,
  wind_deg,
  wind_gust,
  current,
  fontColor = "black",
  iconColor = theme.palette.primary.main,
}: WindIconProps) => {
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

    return `wi wi-wind wi-from-${direction}`;
  };

  return (
    <>
      {current && (
        <Typography variant="h6" align="center" sx={{ color: fontColor }}>
          {windDirection()}
        </Typography>
      )}
      <Typography variant="subtitle2" align="center" sx={{ color: fontColor }}>
        {formatDigits(wind_speed || 0, 1)}
        {speedUnit()}
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <i
          className={windIconClass()}
          style={{
            fontSize: current ? "3rem" : "1.75rem",
            color: iconColor,
          }}
        />
      </div>
      <Typography variant="subtitle2" align="center" sx={{ color: fontColor }}>
        Gust {formatDigits(wind_gust || 0, 1)}
      </Typography>
    </>
  );
};

export default memo(WindIcon);
