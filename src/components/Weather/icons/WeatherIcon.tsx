import { memo } from "react";
import theme from "../../../theme/theme";

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
  iconColor = theme.palette.primary.main,
}: WeatherIconProps) => {
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
    <i
      className={weatherIconClass()}
      style={{ fontSize: size, color: iconColor, margin: "0.5rem 0" }}
    />
  );
};

export default memo(WeatherIcon);
