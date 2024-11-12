import { memo } from "react";
import { styled, useTheme } from "@mui/material/styles";

const WeatherIconComponent = styled("i")<{ size: string; color: string }>(
  ({ size, color }) => ({ fontSize: size, color, m: "0.5rem 0" })
);

interface WeatherIconProps {
  sunset?: number;
  sunrise?: number;
  time?: number;
  weatherId: number;
  current: boolean;
  size: string;
  iconColor?: string;
}

const WeatherIcon = ({
  sunset,
  sunrise,
  time,
  weatherId,
  current,
  size = "2rem",
  iconColor,
}: WeatherIconProps) => {
  const theme = useTheme();
  const weatherIconClass = () => {
    if (current) {
      const t = time || Math.floor(new Date().getTime() / 1000);
      const period =
        sunrise && sunset
          ? sunrise <= t && t <= sunset
            ? "day"
            : "night"
          : "day";

      return `wi wi-owm-${period}-${weatherId} `;
    }

    return `wi wi-owm-day-${weatherId} `;
  };

  return (
    <WeatherIconComponent
      size={size}
      color={iconColor || theme.palette.primary.main}
      className={weatherIconClass()}
    />
  );
};

export default memo(WeatherIcon);
