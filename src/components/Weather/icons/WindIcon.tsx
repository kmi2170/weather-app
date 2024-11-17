import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../../store/hooks";

import { wind_directions } from "../../../constants/wind";
import { styled, useTheme } from "@mui/material/styles";

const IconWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const Icon = styled("i")<{ color: string; size: string }>(
  ({ size, color }) => ({
    fontSize: size,
    color,
  })
);

const windDirection = (wind_deg: number) => {
  const n_direction = Math.floor((wind_deg + 11.25) / 22.5);

  const direction =
    n_direction === 16 ? wind_directions[0] : wind_directions[n_direction];

  return direction.toUpperCase();
};

const windIconClass = (wind_deg: number) => {
  const n_direction = Math.floor((wind_deg + 11.25) / 22.5);
  const direction =
    n_direction === 16 ? wind_directions[0] : wind_directions[n_direction];
  return `wi wi-wind wi-from-${direction}`;
};

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
  iconColor,
}: WindIconProps) => {
  const theme = useTheme();

  const units = useAppSelector((states) => states.weather.units);

  const speedUnit = () => (units === "imperial" ? "mi/h" : "m/s");

  return (
    <>
      {current && (
        <Typography variant="h4" align="center" sx={{ color: fontColor }}>
          {windDirection(wind_deg)}
        </Typography>
      )}
      <Typography
        variant={current ? "h6" : "subtitle1"}
        align="center"
        sx={{ color: fontColor, mt: "0.25rem", mb: "0.25rem" }}
      >
        {(wind_speed || 0).toFixed(1)}
        {speedUnit()}
      </Typography>
      <IconWrapper>
        <Icon
          className={windIconClass(wind_deg)}
          size={current ? "4rem" : "2.5rem"}
          color={iconColor || theme.palette.primary.main}
        />
      </IconWrapper>
      <Typography
        variant={current ? "h6" : "subtitle1"}
        align="center"
        sx={{ color: fontColor, mt: "0.25rem" }}
      >
        Gust {wind_gust?.toFixed(1)}
      </Typography>
    </>
  );
};

export default WindIcon;
